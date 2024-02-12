const Cache = require('./cache');

/**
 * @param {String}  namespace
 * @param {String}  key
 * @param {Object}  [data]
 */
module.exports = function (namespace, key, data) {
    let locale = Cache.locale;
    if (locale == "zh-CN") locale = "zh-Hans" 
    if (locale == "zh-TW") locale = "zh-Hant"
    let messages = {};

    // Load English translations
    const enMessages = require('../i18n/messages.json');
    messages = { ...messages, ...enMessages };

    let localizedMessages = {};

    // Load localized translations if available, otherwise fallback to English
    try {
        localizedMessages = require(`../i18n/${locale}/messages.json`);
        messages = Object.assign(messages, localizedMessages);
        console.log(messages);
    } catch (error) {
        console.error(`Failed to load ${locale} messages, falling back to English.`);
    }

    // Check that the locale exists
    if (typeof messages[locale] === 'undefined') {
        locale = 'en';
    }

    if (typeof messages[namespace] !== 'undefined' && typeof messages[namespace][key] !== 'undefined') {
        return messages[namespace][key](data);
    } else {
        return '(MISSING: ' + namespace + '/' + key + ')';
    }
};
