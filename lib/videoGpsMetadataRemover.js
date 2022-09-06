"use strict";

exports.__esModule = true;
exports.videoGpsMetadataRemoverSkip = void 0;

var _Base = _interopRequireDefault(require("Base64"));

var _gpsRemoverHelpers = require("./gpsRemoverHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-await-in-loop */
const TAG_TO_STRIP = 'com.apple.quicktime.location.ISO6709';
const MOOV_ATOM_TAG = 'moov';
const UDTA_ATOM_TAG = 'udta';
const META_ATOM_TAG = 'meta';
const UUID_TAG = 'uuid';
const XMP_TAG = 'XMP_';
const XYZ_TAG = '©xyz';
const TAGS_TO_ENTER = [MOOV_ATOM_TAG, UDTA_ATOM_TAG];

const wipeData = async (sizeToRemove, offset, write, read, suppliedWipeoutString = '') => {
  //NEXT LINES FOR DEBUG - take out
  const dataToWipe = await (0, _gpsRemoverHelpers.readNextChunkIntoDataView)(sizeToRemove, offset, read);

  if (suppliedWipeoutString === '') {
    const encodedWipeoutString = await (0, _gpsRemoverHelpers.getEncodedWipeoutString)(sizeToRemove);
    await write(encodedWipeoutString, offset, 'base64');
  } else {
    await write(suppliedWipeoutString, offset, 'ascii');
  }
};

const videoGpsMetadataRemoverSkip = async (read, write, skipXMPRemoval) => {
  let gpsTagFound = false;
  let stopSearching = false; // eslint-disable-next-line new-cap

  let offset = 0;

  while (!stopSearching && !gpsTagFound) {
    const dataView = await (0, _gpsRemoverHelpers.readNextChunkIntoDataView)(8, offset, read); // an atom must have a length of at least 8

    if (dataView.byteLength === 0) {
      stopSearching = true;
      break;
    }

    if (dataView.byteLength >= 8) {
      const tagLength = dataView.getUint32(0);
      const tagName = dataView.getString(4, 4);

      if (tagLength === 0) {
        stopSearching = true;
        break;
      }

      if (tagName === META_ATOM_TAG) {
        const metaTagDataView = await (0, _gpsRemoverHelpers.readNextChunkIntoDataView)(tagLength, offset, read);
        const metaBaseOffset = 0;
        const hdlrSize = metaTagDataView.getUint32(metaBaseOffset + 8);
        const keyOffset = metaBaseOffset + hdlrSize + 8;
        const keySectionSize = metaTagDataView.getUint32(keyOffset);
        const keyEntryCount = metaTagDataView.getUint32(keyOffset + 12);
        let currentKeyOffset = keyOffset + 16;
        let currentKey = 0;
        let indexOfTagToStrip = -1;

        while (currentKey < keyEntryCount) {
          const currentKeySize = metaTagDataView.getUint32(currentKeyOffset);
          const currentKeyName = metaTagDataView.getString(currentKeySize - 8, currentKeyOffset + 8);

          if (currentKeyName === TAG_TO_STRIP) {
            gpsTagFound = true;
            indexOfTagToStrip = currentKey;
            break;
          }

          currentKeyOffset += currentKeySize;
          currentKey++;
        }

        if (indexOfTagToStrip >= 0) {
          const itemsOffset = keyOffset + keySectionSize;
          let itemIndex = 0;
          let currentItemOffset = itemsOffset + 8;

          while (itemIndex !== indexOfTagToStrip) {
            const currentItemSize = metaTagDataView.getUint32(currentItemOffset);
            currentItemOffset += currentItemSize;
            itemIndex++;
          }

          const offsetOfSizeToRemove = currentItemOffset + 8;
          const sizeToRemove = metaTagDataView.getUint32(offsetOfSizeToRemove);
          const offsetOfDataToRemove = offsetOfSizeToRemove + 4;
          await wipeData(sizeToRemove, offsetOfDataToRemove + offset, write, read);
        } else {
          // no gps in the metadata
          offset += tagLength;
        }
      } else if (TAGS_TO_ENTER.includes(tagName)) {
        offset += 8;
      } else if ((tagName === UUID_TAG || tagName === XMP_TAG) && !skipXMPRemoval) {
        // XMP is an alternative tag format pushed by adobe that can have gps
        // (can also be id'd by UUID atom)
        // we just want to wipe it
        gpsTagFound = true;
        await wipeData(tagLength - 8, offset + 8, write, read);
        offset += tagLength;
      } else if (tagName === XYZ_TAG) {
        // ©xyz is an alternative gps tag format that some android phones use
        const xyzDataView = await (0, _gpsRemoverHelpers.readNextChunkIntoDataView)(tagLength, offset, read);
        const xyzString = xyzDataView.getString(tagLength, 0);
        const plusIndex = xyzString.indexOf('+');
        const slashIndex = xyzString.indexOf('/');

        if (plusIndex >= 0 && slashIndex >= 0 && plusIndex < slashIndex) {
          const dataString = xyzString.substring(plusIndex, slashIndex);
          const wipeoutString = dataString.replace(/[0-9]/g, "0");
          await wipeData(wipeoutString.length, offset + plusIndex, write, read, wipeoutString); //await wipeData(dashIndex - plusIndex - 1, offset + plusIndex, write, read)
          //await wipeData(slashIndex - dashIndex - 1, offset + dashIndex, write, read)

          gpsTagFound = true;
        } else {
          offset += tagLength;
        } // 10 = 8 byte tag lenght + tag, 2 byte internal length of xyz data
        //await wipeData(tagLength - 12, offset + 12, write, read)

      } else {
        offset += tagLength;
      }
    }
  }

  return gpsTagFound;
};

exports.videoGpsMetadataRemoverSkip = videoGpsMetadataRemoverSkip;