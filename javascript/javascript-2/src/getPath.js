function getPath(element) {
    let path = '', i, tag, selector, classes, innerText;
    for (i = 0; element && element.nodeType == 1; element = element.parentNode, i++) {
        tag = element.tagName.toLowerCase();
        classes = element.className;
        innerText = element.childNodes.length === 0 ? element.innerHTML : '';
        if (element.id !== '') {
            selector = tag + '.' + '#' + element.id;
        } else if (classes.length > 0) {
            selector = tag + '.' + classes.replace(/ /g , ".", "_");
        }
        else {
            selector = tag + ((innerText.length > 0) ? ":contains('" + innerText + "')" : "");
        }
        path = ' ' + selector + path;
    }
    return path;
}

module.exports = getPath;


