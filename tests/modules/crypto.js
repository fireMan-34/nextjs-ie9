const assert = require('assert');
const crypto = require('crypto-js');

const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual'
});

try {
  const message = 'hello world';
  const key = 'message'
  const encrypted = crypto.AES.encrypt(message, key);
  const decrypted = crypto.AES.decrypt(encrypted, key);
  const decrypted1 = crypto.AES.decrypt(encrypted.toString(), key);

  console.log(decrypted.toString(crypto.enc.Utf8));
  console.log(decrypted1.toString(crypto.enc.Utf8));

} catch (error) {
  
}

try {
  const message = 'Message';
  const encrypted = crypto.enc.Base64url.stringify(crypto.enc.Utf8.parse(message));
  const decrypted = crypto.enc.Base64url.parse(encrypted);
  console.log(decrypted.toString(crypto.enc.Utf8));
} catch (error) {
  console.error(error);
}

try {
  const message = 'data';
  const encrypted = crypto.enc.Base64url.stringify(crypto.enc.Utf8.parse(JSON.stringify(message)));
  const decrypted = crypto.enc.Base64url.parse(encrypted);

  console.log(JSON.parse(decrypted.toString(crypto.enc.Utf8)));
} catch (error) {
  
}