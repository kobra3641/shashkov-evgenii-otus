function getPath(element) {

    var path = '', i, innerText, tag, selector, classes;

    for (i = 0; element && element.nodeType == 1; element = element.parentNode, i++) {

        innerText = element.childNodes.length === 0 ? element.innerHTML : '';
        tag = element.tagName.toLowerCase();
        classes = element.className;

        if (element.id !== '') {
            selector = '#' + element.id;
        } else if (classes.length > 0) {
            selector = tag + '.' + classes.replace(/ /g , ".", "_");
        } else {
            selector = tag + ((innerText.length > 0) ? ":contains('" + innerText + "')" : "");
        }

        path = ' ' + selector + path;
    }

    return path;
}