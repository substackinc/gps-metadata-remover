"use strict";

exports.__esModule = true;
exports.removeLocation = exports.base64StringToArrayBuffer = exports.arrayBufferToBase64 = void 0;

var _imageGpsExifRemover = require("./imageGpsExifRemover");

var _videoGpsMetadataRemover = require("./videoGpsMetadataRemover");

var _Base = _interopRequireDefault(require("Base64"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isVideo = uri => /(mp4|m4v|webm|mov)/i.test(uri);

function removeFileSlashPrefix(path) {
  return path.replace(/^(file:\/\/)/, '');
}

const removeLocation = async (photoUri, read, write, options = {}) => {
  const optionsWithDefaults = {
    skipXMPRemoval: false,
    ...options
  };
  const {
    skipXMPRemoval
  } = optionsWithDefaults;
  const preparedUri = removeFileSlashPrefix(photoUri);
  return isVideo(preparedUri) ? await (0, _videoGpsMetadataRemover.videoGpsMetadataRemoverSkip)(read, write, skipXMPRemoval) : await (0, _imageGpsExifRemover.imageGpsExifRemoverSkip)(read, write, skipXMPRemoval);
};

exports.removeLocation = removeLocation;

const arrayBufferToBase64 = buffer => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return _Base.default.btoa(binary);
};

exports.arrayBufferToBase64 = arrayBufferToBase64;

const base64StringToArrayBuffer = async base64String => {
  const binaryString = await _Base.default.atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
};

exports.base64StringToArrayBuffer = base64StringToArrayBuffer;