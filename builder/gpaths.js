"use strict";
exports.__esModule = true;
var path = require("path");

var slash_path = function(thePath) {
    // if path contains backslashes bend them forward
    thePath.replace(/(\\)/gm, '/')
}
//need to just put a plain path for now
let src = path.resolve(__dirname, '../../src')
let www = path.resolve(__dirname, '../../www')
var p = {
    src: src,
    src_js: path.resolve(`${src}`, '../../src/js'),
    src_scss: path.resolve(`${src}`, '../../scss'),
    src_html: path.resolve(`${src}`),
    src_img: path.resolve(`${src}`, '../../src/img'),
    www: www,
    www_js: path.resolve(`${www}`, 'js'),
    www_css: path.resolve(`${www}`, 'css'),
    www_html: `${www}`,
    www_img: path.resolve(`${www}`, 'img')
};
let pth = slash_path(JSON.stringify(p))

exports.default = p;
console.log(pth);
