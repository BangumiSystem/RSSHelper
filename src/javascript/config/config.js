const lang = 'en_US';

console.debug('[RSSHelper]', require(`./${lang}`));

module.exports = {
    language: require(`./${lang}`)
};
