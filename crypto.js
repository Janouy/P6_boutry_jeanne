const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);


exports.encrypt = (text) =>{
	crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return encrypted.toString('hex');
} ;


exports.decrypt = (text) => {
	let iv = Buffer.from(text, 'hex');
	let encryptedText = Buffer.from(text.encryptedData, 'hex');
	let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
	let decrypted = decipher.update(encryptedText);
 	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

exports.encrypted = (text) =>{
	const encrypted = CryptoJS.AES.encrypt(text, "test"); 
	return encrypted;
};

exports.decrypted = (text) => {
	const decrypted = CryptoJS.AES.decrypt(encrypted, "test").toString(CryptoJS.enc.Utf8);
	return decrypted;
};