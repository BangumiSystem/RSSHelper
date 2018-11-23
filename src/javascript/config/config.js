const logger = require('../include/logger');
const lang = 'en_US';

// TODO add gui to edit config
logger.debug(require(`./${lang}`));

module.exports = {
    language: require(`./${lang}`),
    rsshub: 'https://rsshub.app'
};
