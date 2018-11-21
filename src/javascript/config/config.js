const lang = 'en_US';

// TODO add gui to edit config
console.debug('[RSSHelper]', require(`./${lang}`));

module.exports = {
    language: require(`./${lang}`),
    rsshub: 'https://rsshub.app'
};
