function $(selector) {
    return document.querySelector(selector)
}

function $$(selectors) {
    return document.querySelectorAll(selectors)
}

function $$$(tagName) {
    return document.createElement(tagName);
}