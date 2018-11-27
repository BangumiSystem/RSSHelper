$.fn.feedInit = function() {
    this.attr('target', '_blank');
    this.attr('id', 'rss-helper');
    return this;
};

$.fn.href = function(href) {
    this.attr('href', href);
    this.attr('data-clipboard-text', href);
};