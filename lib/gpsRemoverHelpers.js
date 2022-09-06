"use strict";

exports.__esModule = true;
exports.readNextChunkIntoDataView = exports.getWipeoutString = exports.getEncodedWipeoutString = void 0;

var _jdataview = _interopRequireDefault(require("jdataview"));

var _Base = _interopRequireDefault(require("Base64"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readNextChunkIntoDataView = async (size, offset, read) => {
  const dataBuffer = await read(size, offset);
  // eslint-disable-next-line no-await-in-loop
  // const decodedData = await base64.atob(currentTagInfoChunk)
  // const dataBuffer = binaryStringToArrayBuffer(decodedData)
  // eslint-disable-next-line new-cap
  return new _jdataview.default(dataBuffer, 0, dataBuffer.byteLength);
};

exports.readNextChunkIntoDataView = readNextChunkIntoDataView;

const getEncodedWipeoutString = async sizeToRemove => {
  const wipeoutString = getWipeoutString(sizeToRemove);
  return _Base.default.btoa(wipeoutString);
};

exports.getEncodedWipeoutString = getEncodedWipeoutString;

const getWipeoutString = sizeToRemove => {
  return Array(sizeToRemove + 1).join(String.fromCharCode(0));
};

exports.getWipeoutString = getWipeoutString;