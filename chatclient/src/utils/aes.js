var aes256 = require('aes256');
var secretKey = 'myckethemlignyckel13374321';

export const toEncrypt = (text) => {
  var encrypted = aes256.encrypt(secretKey, text);
  return encrypted;
};

export const toDecrypt = (cipher) => {
  var decrypted = aes256.decrypt(secretKey, cipher);
  return decrypted;
};
