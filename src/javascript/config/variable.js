const config = require('./config');
const { rsshub, language } = config;

module.exports = {
    language: require(`../../resource/lang/${language}`),
    rsshub
};
