"use strict";

let _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function component() {
    const element = document.createElement('div');
    element.innerHTML = _lodash.default.join(['Hello', 'webpack'], ' ');
    return element;
}

document.body.appendChild(component());