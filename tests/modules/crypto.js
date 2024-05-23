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