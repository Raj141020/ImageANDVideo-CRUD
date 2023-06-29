const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'docsez5xg',
    api_key: '465422871391328',
    api_secret:'yqh2ePprjpazXV4B7HD0jQADPGk',
}
);

module.exports = cloudinary;