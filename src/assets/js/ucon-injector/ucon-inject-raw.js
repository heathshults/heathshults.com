/*!
 * @summary Part of the Fannie Mae - Bluprint Design System
 * @description Use this file to inject svg icons into the DOM.
 *
 * @author Heath Shults
 * @version v1.4.1
 * @since 1.0.0
 *
 * @link https://bitbucket:8443/scm/flk/cxd-ds-framekit.git
 * @file ucon-inject.js
 *
 * @copyright Copyright (c) 2018 Fannie Mae, Inc.
 * @license MIT
 */

var UconInjector = function(window, document) {

  var NAME = 'UconInjector.js';
  var VERSION = '1.4.1';

  /* global options */
  var options = {
    iconCSSClassName      :   'ucon',
    iconCSSClassPrefix    :   'bp-',
    iconDOMElement        :   'i',
    injAttr               :   'data-name',
    altSVGPath            :   '/assets/img/ucons/svg',
    fallbackSVGPath       :   '/assets/img/ucons/png',
    UconGallery           :   false,
    UconGalleryElement    :   'div',
    UconGalleryID         :   'list',
    consoleMessages       :   false
  };

  var svgTag            = null,
    iconDOMElement      = options.iconDOMElement,
    iconCSSClassPrefix  = options.iconCSSClassPrefix,
    iconCSSClassName    = options.iconCSSClassName,
    injAttr             = options.injAttr,
    arrObjSVGData       = null,
    svgId               = null,
    svgIndex            = null,
    svgTagStatus        = null,
    docEls              = null,
    theUcons            = null,
    uconsObjArray       = null,
    el                  = null,
    newEl               = null,
    attyVal             = null,
    injectCounter       = [],
    list                = null,
    divi                = null,
    item                = null,
    gallerySVG          = [],
    idRegex             = null,
    svgName             = null,
    totalInjectableEls  = null,
    successfulInjects   = null,
    injectCount         = 0,
    showGallery         = options.UconGallery,
    initGallery         = options.UconGallery,
    svgTagTemplate      = '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">'

  // docEls = [].slice.call(document.querySelectorAll(iconDOMElement+'.'+iconCSSClassPrefix+iconCSSClassName))
  docEls = [].slice.call(document.querySelectorAll(iconDOMElement+'['+injAttr+']'))
  //#region icons 
  theUcons = {
    'icons': [
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'zoom-out',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.414 18.586l-4.527-4.527A7.95 7.95 0 0 0 18 10a7.945 7.945 0 0 0-2.344-5.656C14.146 2.832 12.137 2 10 2s-4.146.832-5.656 2.344C2.833 5.854 2 7.863 2 10s.833 4.146 2.344 5.656A7.945 7.945 0 0 0 10 18a7.95 7.95 0 0 0 4.059-1.113l4.527 4.526c.377.379.88.587 1.414.587s1.037-.208 1.414-.586c.378-.378.586-.879.586-1.414 0-.534-.208-1.036-.586-1.414zM14 11H6V9h8v2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'zoom-in',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.414 18.585l-4.527-4.527A7.946 7.946 0 0 0 18 10a7.949 7.949 0 0 0-2.344-5.657C14.146 2.831 12.137 2 10 2s-4.146.831-5.656 2.343C2.833 5.854 2 7.863 2 10s.833 4.145 2.344 5.655A7.937 7.937 0 0 0 10 18a7.95 7.95 0 0 0 4.059-1.114l4.527 4.526c.377.379.88.588 1.414.588s1.037-.209 1.414-.586c.378-.379.586-.879.586-1.414s-.208-1.037-.586-1.415zM14 11h-3v3H9v-3H6V9h3V6h2v3h3v2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'zoom-area-out',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6.163 13.608A7.503 7.503 0 0 1 17.836 7.37V3.603a1.67 1.67 0 0 0-1.668-1.668H3.661a1.67 1.67 0 0 0-1.668 1.668V16.11a1.67 1.67 0 0 0 1.668 1.668h3.767a7.465 7.465 0 0 1-1.266-4.169z"></path><path d="M11.166 12.775h5.003v1.668h-5.003v-1.668z"></path><path d="M22.036 20.237l-3.468-3.468c.59-.911.936-1.995.936-3.16 0-3.219-2.618-5.837-5.837-5.837S7.83 10.39 7.83 13.609s2.618 5.837 5.837 5.837c1.149 0 2.22-.339 3.123-.916l3.475 3.476 1.769-1.769zM9.499 13.608c0-2.299 1.87-4.169 4.169-4.169s4.169 1.87 4.169 4.169c0 2.298-1.87 4.169-4.169 4.169s-4.169-1.87-4.169-4.169z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'zoom-area-in',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6.133 13.668A7.503 7.503 0 0 1 17.806 7.43V3.663a1.67 1.67 0 0 0-1.668-1.668H3.631a1.67 1.67 0 0 0-1.668 1.668V16.17a1.67 1.67 0 0 0 1.668 1.668h3.767a7.468 7.468 0 0 1-1.266-4.169z"></path><path d="M14.471 11.166h-1.668v1.668h-1.668v1.668h1.668v1.668h1.668v-1.668h1.668v-1.668h-1.668z"></path><path d="M22.006 20.296l-3.468-3.468c.59-.911.937-1.996.937-3.16 0-3.219-2.618-5.837-5.837-5.837s-5.837 2.618-5.837 5.837 2.618 5.837 5.837 5.837c1.149 0 2.22-.339 3.123-.916l3.475 3.475 1.769-1.768zM9.469 13.668c0-2.299 1.87-4.169 4.169-4.169s4.169 1.87 4.169 4.169c0 2.298-1.87 4.169-4.169 4.169s-4.169-1.871-4.169-4.169z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'arrow-left',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'arrow-left',
        'content': '<svg class="fk-svg" viewBox="0 0 24 24" id="arrow-left" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M3 11.98l9.01 9.01 1.42-1.41L6.85 13H21v-2H6.8l6.59-6.59-.71-.7-.71-.71L3 11.98z"></path></svg>',
        'set_id': 1
      },
      {
        'style': 'arrow-right',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'arrow-right',
        'content': '<svg class="fk-svg" viewBox="0 0 24 24" id="arrow-right" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M21 12.02l-9.01-9.01-1.42 1.41L17.15 11H3v2h14.2l-6.59 6.59.71.7.71.71L21 12.02z"></path></svg>',
        'set_id': 1
      },
      {
        'style': 'arrow-down',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'arrow-down',
        'content': '<svg class="fk-svg" viewBox="0 0 24 24" id="arrow-down" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11.98 21l9.01-9.01-1.41-1.42L13 17.15V3h-2v14.2l-6.59-6.59-.7.71-.71.71L11.98 21z"></path></svg>',
        'set_id': 1
      },
      {
        'style': 'arrow-up',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'arrow-up',
        'content': '<svg class="fk-svg" viewBox="0 0 24 24" id="arrow-down" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11.98 21l9.01-9.01-1.41-1.42L13 17.15V3h-2v14.2l-6.59-6.59-.7.71-.71.71L11.98 21z"></path></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'views-cards',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2.547 5h5v6h-5V5z"></path><path d="M2.547 12.969h5v6h-5v-6z"></path><path d="M9.5 12.969h5v6h-5v-6z"></path><path d="M16.469 12.969h5v6h-5v-6z"></path><path d="M9.5 5h5v6h-5V5z"></path><path d="M16.469 5h5v6h-5V5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'arrow-left',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'arrow-left',
        'content': '<svg class="fk-svg" viewBox="0 0 24 24" id="arrow-left" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M3 11.98l9.01 9.01 1.42-1.41L6.85 13H21v-2H6.8l6.59-6.59-.71-.7-.71-.71L3 11.98z"></path></svg>',
        'set_id': 1
      },
      {
        'style': 'arrow-right',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'arrow-right',
        'content': '<svg class="fk-svg" viewBox="0 0 24 24" id="arrow-right" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M21 12.02l-9.01-9.01-1.42 1.41L17.15 11H3v2h14.2l-6.59 6.59.71.7.71.71L21 12.02z"></path></svg>',
        'set_id': 1
      },
      {
        'style': 'arrow-down',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'arrow-down',
        'content': '<svg class="fk-svg" viewBox="0 0 24 24" id="arrow-down" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11.98 21l9.01-9.01-1.41-1.42L13 17.15V3h-2v14.2l-6.59-6.59-.7.71-.71.71L11.98 21z"></path></svg>',
        'set_id': 1
      },
      {
        'style': 'arrow-up',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'arrow-up',
        'content': '<svg class="fk-svg" viewBox="0 0 24 24" id="arrow-down" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11.98 21l9.01-9.01-1.41-1.42L13 17.15V3h-2v14.2l-6.59-6.59-.7.71-.71.71L11.98 21z"></path></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'view-thumbnails',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M10.031 4.016h4V8h-4V4.016z"></path><path d="M10.031 15.969h4v3.984h-4v-3.984z"></path><path d="M10.031 9.984h4v4.031h-4V9.984z"></path><path d="M16.031 4.047h4v3.984h-4V4.047z"></path><path d="M16.031 16h4v3.984h-4V16z"></path><path d="M16.031 10.016h4v4.031h-4v-4.031z"></path><path d="M4.016 4.016h4.031V8H4.016V4.016z"></path><path d="M4.016 15.969h4.031v3.984H4.016v-3.984z"></path><path d="M4.016 9.984h4.031v4.031H4.016V9.984z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'view-list',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9 4.016h12V8H9V4.016z"></path><path d="M9 15.969h12v3.984H9v-3.984z"></path><path d="M9 9.984h12v4.031H9V9.984z"></path><path d="M2.984 4.016h4.031V8H2.984V4.016z"></path><path d="M2.984 15.969h4.031v3.984H2.984v-3.984z"></path><path d="M2.984 9.984h4.031v4.031H2.984V9.984z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'view-list-alt',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2.969 4.016H21V8H2.969V4.016z"></path><path d="M2.937 15.969H21v3.984H2.937v-3.984z"></path><path d="M2.937 9.984H21v4.031H2.937V9.984z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'view-columns',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M1.969 4.969H7v14H1.969v-14z"></path><path d="M9.453 4.969h5.031v14H9.453v-14z"></path><path d="M16.938 4.969h5.031v14h-5.031v-14z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'vertical-align-top',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3.984 3h16.031v2.016H3.984V3zm4.032 8.016L12 6.985l3.984 4.031h-3V21h-1.969v-9.984h-3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'vertical-align-center',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M4.712 11.105h14.576v1.79H4.712v-1.79zM15.623 5.65L12 9.273 8.377 5.65h2.728V1.985h1.79V5.65h2.728zm-7.246 12.7L12 14.727l3.623 3.623h-2.728v3.665h-1.79V18.35H8.377z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'vertical-align-bottom',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3.984 18.984h16.031V21H3.984v-2.016zm12-6L12 17.015l-3.984-4.031h3V3h1.969v9.984h3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'users',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.922 13.094c1.681 0 3.047-1.366 3.047-3.047S17.603 7 15.922 7s-3.047 1.366-3.047 3.047 1.366 3.047 3.047 3.047z"></path><path d="M8.984 11.078c1.681 0 3.047-1.366 3.047-3.047s-1.366-3.047-3.047-3.047S5.937 6.35 5.937 8.031s1.366 3.047 3.047 3.047z"></path><path d="M15.922 13.606c-3.588 0-6.094 1.878-6.094 4.569v.762h12.188v-.762c0-2.691-2.506-4.569-6.094-4.569z"></path><path d="M7.891 18.175c0-.978.225-1.903.669-2.75a6.243 6.243 0 0 1 1.806-2.094c.166-.125.338-.241.519-.353a10.572 10.572 0 0 0-1.9-.166c-4.122 0-7 2.159-7 5.25v.875h5.906v-.762z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z"></path><path d="M12 13c-4.71 0-8 2.467-8 6v1h16v-1c0-3.533-3.29-6-8-6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user-timeout',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M8.666 15.334C10.505 15.334 12 13.839 12 12s-1.495-3.334-3.334-3.334S5.332 10.161 5.332 12s1.495 3.334 3.334 3.334z"></path><path d="M8.666 16.167c-3.925 0-6.668 2.056-6.668 5.001v.833h13.335v-.833c0-2.945-2.742-5.001-6.668-5.001z"></path><path d="M17.001 1.985C14.243 1.985 12 4.229 12 6.986s2.243 5.001 5.001 5.001 5.001-2.244 5.001-5.001-2.243-5.001-5.001-5.001zm2.5 5.834h-3.334V3.652h1.667v2.5h1.667v1.667z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user-subtract',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.647 12.471c2.076 0 3.765-1.688 3.765-3.765s-1.688-3.765-3.765-3.765-3.765 1.688-3.765 3.765a3.769 3.769 0 0 0 3.765 3.765z"></path><path d="M9.647 13.412c-4.433 0-7.529 2.322-7.529 5.647V20h15.059v-.941c0-3.325-3.096-5.647-7.529-5.647z"></path><path d="M16.235 4h5.647v1.882h-5.647V4z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user-square',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6 17.016V18h12v-.984c0-2.016-3.984-3.094-6-3.094S6 15 6 17.016zM15 9c0-1.641-1.359-3-3-3S9 7.359 9 9s1.359 3 3 3 3-1.359 3-3zM3 5.016C3 3.938 3.891 3 5.016 3h13.969c1.078 0 2.016.938 2.016 2.016v13.969c0 1.078-.938 2.016-2.016 2.016H5.016C3.891 21.001 3 20.063 3 18.985V5.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user-search',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.512 11.167l-2.706-2.706a4.133 4.133 0 0 0 .694-2.294C19.5 3.869 17.631 2 15.333 2s-4.167 1.869-4.167 4.167 1.869 4.167 4.167 4.167c.848 0 1.636-.258 2.294-.694l2.706 2.706 1.178-1.178zm-8.679-5c0-1.378 1.122-2.5 2.5-2.5s2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5-2.5-1.122-2.5-2.5z"></path><path d="M8.667 15.333C10.505 15.333 12 13.838 12 12s-1.495-3.333-3.333-3.333S5.334 10.163 5.334 12a3.337 3.337 0 0 0 3.333 3.333z"></path><path d="M8.667 16.167c-3.925 0-6.667 2.057-6.667 5V22h13.333v-.833c0-2.943-2.742-5-6.667-5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user-refresh',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M8.666 16.167c-3.925 0-6.667 2.056-6.667 5V22h13.333v-.833c0-2.944-2.742-5-6.667-5z"></path><path d="M8.837 8.684c-.058-.003-.113-.018-.171-.018-1.838 0-3.333 1.495-3.333 3.333s1.495 3.333 3.333 3.333a3.328 3.328 0 0 0 3.009-1.924 8.317 8.317 0 0 1-2.838-4.725z"></path><path d="M17 10.333c-.897 0-1.72-.367-2.343-.991l1.509-1.509h-4.167V12l1.47-1.47a5.024 5.024 0 0 0 3.53 1.47c2.757 0 5-2.242 5-5h-1.667a3.337 3.337 0 0 1-3.333 3.333z"></path><path d="M20.532 3.468A4.945 4.945 0 0 0 17 2.001c-2.757 0-5 2.242-5 5h1.667A3.337 3.337 0 0 1 17 3.668c.898 0 1.721.367 2.343.99l-1.51 1.51H22V2.001l-1.467 1.467z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user-lock',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.167 5.333C21.167 3.495 19.672 2 17.834 2s-3.333 1.495-3.333 3.333a.832.832 0 0 0-.833.833v5.833c0 .461.372.833.833.833h6.667a.832.832 0 0 0 .833-.833V6.166a.832.832 0 0 0-.833-.833zm-3.334-1.666A1.67 1.67 0 0 1 19.5 5.334h-3.333a1.67 1.67 0 0 1 1.667-1.667zm2.5 7.5h-5V7h5v4.167z"></path><path d="M18.667 8.667a.833.833 0 1 1-1.666 0 .833.833 0 0 1 1.666 0z"></path><path d="M8.667 15.333C10.505 15.333 12 13.838 12 12s-1.495-3.333-3.333-3.333S5.334 10.163 5.334 12a3.337 3.337 0 0 0 3.333 3.333z"></path><path d="M8.667 16.167c-3.925 0-6.667 2.057-6.667 5V22h13.333v-.833c0-2.943-2.742-5-6.667-5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user-close',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M10.06 14.013c1.886 0 3.42-1.534 3.42-3.42s-1.534-3.42-3.42-3.42-3.42 1.534-3.42 3.42a3.424 3.424 0 0 0 3.42 3.42z"></path><path d="M10.06 14.868c-4.028 0-6.841 2.11-6.841 5.131v.855h13.682v-.855c0-3.021-2.813-5.131-6.841-5.131z"></path><path d="M21.781 4.356l-1.209-1.209-1.961 1.961-1.961-1.961-1.209 1.209 1.961 1.961-1.961 1.961 1.209 1.209 1.961-1.961 1.961 1.961 1.209-1.209-1.961-1.961z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user-circle',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 19.219c2.484 0 4.688-1.313 6-3.234-.047-1.969-4.031-3.094-6-3.094-2.016 0-5.953 1.125-6 3.094 1.313 1.922 3.516 3.234 6 3.234zm0-14.203c-1.641 0-3 1.359-3 3s1.359 3 3 3 3-1.359 3-3-1.359-3-3-3zm0-3c5.531 0 9.984 4.453 9.984 9.984S17.531 21.984 12 21.984 2.016 17.531 2.016 12 6.469 2.016 12 2.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user-check',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.005 13.209c1.97 0 3.572-1.602 3.572-3.572s-1.602-3.572-3.572-3.572-3.572 1.603-3.572 3.572a3.576 3.576 0 0 0 3.572 3.572z"></path><path d="M9.005 14.102c-4.206 0-7.145 2.204-7.145 5.359v.893h14.289v-.893c0-3.154-2.938-5.359-7.145-5.359z"></path><path d="M17.043 10.006l-3.311-3.311 1.263-1.263 2.048 2.048 3.834-3.834 1.263 1.263z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user-block',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17 2c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.242 5-5c0-2.757-2.242-5-5-5zm0 1.667c.616 0 1.188.18 1.683.472l-4.545 4.545a3.309 3.309 0 0 1-.472-1.683 3.337 3.337 0 0 1 3.333-3.333zm0 6.666a3.296 3.296 0 0 1-1.683-.472l4.543-4.543A3.29 3.29 0 0 1 20.332 7a3.337 3.337 0 0 1-3.333 3.333z"></path><path d="M8.667 15.333C10.505 15.333 12 13.838 12 12s-1.495-3.333-3.333-3.333S5.334 10.162 5.334 12a3.337 3.337 0 0 0 3.333 3.333z"></path><path d="M8.667 16.167c-3.925 0-6.667 2.056-6.667 5V22h13.333v-.833c0-2.944-2.742-5-6.667-5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'user-add',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.3 13.8c1.985 0 3.6-1.615 3.6-3.6s-1.615-3.6-3.6-3.6-3.6 1.615-3.6 3.6 1.615 3.6 3.6 3.6z"></path><path d="M9.3 14.7c-4.239 0-7.2 2.22-7.2 5.4v.9h14.4v-.9c0-3.18-2.961-5.4-7.2-5.4z"></path><path d="M21.9 5.7h-2.7V3h-1.8v2.7h-2.7v1.8h2.7v2.7h1.8V7.5h2.7z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'update',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.531 7.96v4.291l3.527 2.145-.715 1.239-4.338-2.622V7.96h1.525zm8.628 2.145h-6.912l2.812-2.86C14.294 4.48 9.766 4.385 7 7.149S4.235 14.3 7 17.064s7.293 2.765 10.059 0c1.383-1.383 2.05-2.956 2.05-4.958h2.05c0 2.002-.858 4.624-2.67 6.388-3.575 3.527-9.391 3.527-12.966 0s-3.575-9.248 0-12.775 9.296-3.527 12.871 0l2.765-2.86v7.245z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'unlock',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17 11H9V7a3 3 0 1 1 6 0v1.95h2V7A5 5 0 0 0 7 7v4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'unfold-more',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 18.188L15.188 15l1.406 1.406L12 21l-4.594-4.594L8.812 15zm0-12.375L8.812 9.001 7.406 7.595 12 3.001l4.594 4.594-1.406 1.406z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'unfold-less',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.594 5.391L12 9.985 7.406 5.391l1.406-1.406L12 7.173l3.188-3.188zM7.406 18.609L12 14.015l4.594 4.594-1.406 1.406L12 16.827l-3.188 3.188z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'undo2',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M5.65 5.644A8.953 8.953 0 0 1 12.006 3c4.972 0 8.989 4.027 8.989 9s-4.016 9-8.989 9c-4.196 0-7.695-2.869-8.696-6.75h2.34a6.74 6.74 0 0 0 6.356 4.5c3.724 0 6.75-3.026 6.75-6.75s-3.026-6.75-6.75-6.75c-1.867 0-3.533.776-4.748 2.002l3.622 3.622H3.005V2.999l2.644 2.644z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'undo',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.202 22c2.221-4.024 2.595-10.162-6.13-9.957V17l-7.5-7.5 7.5-7.5v4.851C21.52 6.578 22.685 16.074 17.202 22z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'trash',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15 5V3H9v2H3v2h18V5z"></path><path d="M5 8v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8H5zm6 10H9v-6h2v6zm4 0h-2v-6h2v6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 26,
        'height': 24,
        'tags': '',
        'name': 'trademark',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24"><g class="fk-icon-wrapper"><path d="M11.91 7.179v1.175a.321.321 0 0 1-.321.311H8.596v8.156a.315.315 0 0 1-.311.321H6.929a.317.317 0 0 1-.321-.321V8.665H3.625a.315.315 0 0 1-.321-.311V7.179c0-.181.141-.321.321-.321h7.965c.171 0 .321.141.321.321zm10.427-.031l.773 9.653a.31.31 0 0 1-.08.241c-.06.06-.141.1-.231.1h-1.346a.316.316 0 0 1-.311-.291l-.462-5.906-1.898 4.269a.306.306 0 0 1-.291.191h-1.205a.325.325 0 0 1-.291-.191l-1.888-4.289-.452 5.926a.316.316 0 0 1-.311.291h-1.356a.328.328 0 0 1-.231-.1.36.36 0 0 1-.09-.241l.784-9.653a.316.316 0 0 1 .311-.291h1.426a.32.32 0 0 1 .291.191l2.21 5.223c.07.161.141.342.201.512.07-.171.131-.352.201-.512l2.22-5.223a.323.323 0 0 1 .291-.191h1.416c.171 0 .311.131.321.291z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'toc',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.984 12.984v-1.969H21v1.969h-2.016zm0-6H21V9h-2.016V6.984zm0 10.032V15H21v2.016h-2.016zM3 17.016V15h14.016v2.016H3zm0-4.032v-1.969h14.016v1.969H3zM3 9V6.984h14.016V9H3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'title',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M5.016 3.984h13.969v3h-5.484v12h-3v-12H5.017v-3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'timer',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 20.016c3.891 0 6.984-3.141 6.984-7.031S15.89 6.001 12 6.001s-6.984 3.094-6.984 6.984S8.11 20.016 12 20.016zm7.031-12.61C20.25 8.953 21 10.875 21 12.984c0 4.969-4.031 9-9 9s-9-4.031-9-9 4.031-9 9-9c2.109 0 4.078.797 5.625 2.016l1.406-1.453c.516.422.984.891 1.406 1.406zm-8.015 6.61v-6h1.969v6h-1.969zM15 .984V3H9V.984h6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'timer-off',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 20.016c1.266 0 2.484-.375 3.516-.984L5.953 9.469a6.922 6.922 0 0 0-.938 3.516c0 3.891 3.094 7.031 6.984 7.031zM3 3.984L20.766 21.75 19.5 23.016l-2.531-2.531c-1.453.938-3.141 1.5-4.969 1.5-4.969 0-9-4.031-9-9 0-1.828.563-3.563 1.5-4.969L1.734 5.25zm8.016 5.438V8.016h1.969v3.422zM15 .984V3H9V.984h6zm4.031 3.563l1.406 1.406-1.406 1.453C20.25 8.953 21 10.875 21 12.984a9.001 9.001 0 0 1-1.5 4.969L18.047 16.5a6.922 6.922 0 0 0 .938-3.516A6.942 6.942 0 0 0 12.001 6a6.741 6.741 0 0 0-3.469.938l-1.5-1.453a8.993 8.993 0 0 1 4.969-1.5c2.109 0 4.078.75 5.625 1.969z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Thumb-up',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2.886 19.786H6.2V9.843H2.886v9.943zm18.228-9.115c0-.911-.746-1.657-1.657-1.657h-5.228l.787-3.787.025-.265c0-.34-.141-.655-.365-.878l-.878-.87-5.452 5.46a1.619 1.619 0 0 0-.489 1.168v8.286c0 .911.746 1.657 1.657 1.657h7.457c.688 0 1.276-.414 1.525-1.011l2.502-5.841c.075-.191.116-.389.116-.605v-1.657z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Thumb-down',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M14.169 5.072H6.763c-.684 0-1.266.412-1.512 1.003l-2.484 5.803a1.614 1.614 0 0 0-.116.6v1.647c0 .906.741 1.647 1.647 1.647h5.191l-.781 3.759-.025.262c0 .337.141.65.363.872l.872.862 5.422-5.422a1.63 1.63 0 0 0 .478-1.159V6.718a1.656 1.656 0 0 0-1.647-1.647zm3.29 0v9.872h3.291V5.072h-3.291z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'texting',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.881 3.031h-13.8c-1.172 0-2.122.95-2.122 2.122v15.831L6.943 17H18.88c1.172 0 2.122-.95 2.122-2.122V5.153c0-1.172-.95-2.122-2.122-2.122zm-9.909 7.988H6.988V9.003h1.984v2.016zm4.015 0h-1.984V9.003h1.984v2.016zm4.016 0h-1.984V9.003h1.984v2.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'text-wrap',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.016 11.016C19.219 11.016 21 12.797 21 15s-1.781 3.984-3.984 3.984H15V21l-3-3 3-3v2.016h2.25c1.078 0 2.016-.938 2.016-2.016s-.938-2.016-2.016-2.016H3.984v-1.969h13.031zm3-6v1.969H3.985V5.016h16.031zM3.984 18.984v-1.969h6v1.969h-6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 26,
        'height': 24,
        'tags': '',
        'name': 'tags',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24"><g class="fk-icon-wrapper"><path d="M7.132 7.007c0-.81-.651-1.461-1.461-1.461S4.21 6.197 4.21 7.007s.651 1.461 1.461 1.461 1.461-.651 1.461-1.461zm12.177 6.574c0 .388-.16.765-.422 1.027l-5.604 5.615c-.274.262-.651.422-1.039.422s-.765-.16-1.027-.422l-8.16-8.172c-.582-.57-1.039-1.678-1.039-2.488V4.815c0-.799.662-1.461 1.461-1.461h4.748c.81 0 1.917.456 2.499 1.039l8.16 8.148c.262.274.422.651.422 1.039zm4.383 0c0 .388-.16.765-.422 1.027l-5.604 5.615a1.521 1.521 0 0 1-1.039.422c-.593 0-.89-.274-1.278-.673l5.364-5.364c.262-.262.422-.639.422-1.027s-.16-.765-.422-1.039l-8.16-8.148c-.582-.582-1.689-1.039-2.499-1.039h2.556c.81 0 1.917.456 2.499 1.039l8.16 8.148c.262.274.422.651.422 1.039z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 21,
        'height': 24,
        'tags': '',
        'name': 'Tag',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24"><g class="fk-icon-wrapper"><path d="M6.961 7.296c0-.763-.613-1.376-1.376-1.376s-1.376.613-1.376 1.376.613 1.376 1.376 1.376 1.376-.613 1.376-1.376zm11.473 6.193c0 .365-.151.721-.398.968l-5.28 5.291a1.385 1.385 0 0 1-1.947 0l-7.688-7.699c-.548-.537-.979-1.581-.979-2.344V5.232c0-.753.623-1.376 1.376-1.376h4.473c.763 0 1.806.43 2.355.979l7.688 7.677c.247.258.398.613.398.979z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'tag-large',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'tablet',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.833 2H6.166c-1.15 0-2.083.933-2.083 2.083v15.833c0 1.15.933 2.083 2.083 2.083h11.667c1.15 0 2.083-.933 2.083-2.083V4.083c0-1.15-.933-2.083-2.083-2.083zM12 21.167c-.692 0-1.25-.558-1.25-1.25s.558-1.25 1.25-1.25 1.25.558 1.25 1.25-.558 1.25-1.25 1.25zm6.25-3.334H5.75V4.5h12.5v13.333z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'swap-vertical',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9 3l3.984 3.984h-3v7.031H8.015V6.984h-3zm6.984 14.016h3L15 21l-3.984-3.984h3V9.985h1.969v7.031z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'swap-horizontal',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21 9l-3.984 3.984v-3H9.985V8.015h7.031v-3zM6.984 11.016v3h7.031v1.969H6.984v3L3 15.001z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'street-signs',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.912 5.753a.359.359 0 0 1 0 .513l-2.044 1.419c-.2.2-.481.312-.759.312H4.734a.722.722 0 0 1-.716-.716V4.737c0-.391.325-.716.716-.716h5.834V2.715c0-.391.325-.716.716-.716h1.428c.391 0 .716.325.716.716v1.309h5.591c.278 0 .559.113.759.312l2.134 1.416z"></path><path d="M10.572 15.978h2.856v5.309a.722.722 0 0 1-.716.716h-1.428a.722.722 0 0 1-.716-.716l.003-5.309z"></path><path d="M20.294 11.041c.391 0 .716.325.716.716v2.544a.722.722 0 0 1-.716.716H6.044c-.278 0-.559-.112-.759-.312l-2.2-1.419a.359.359 0 0 1 0-.513l2.2-1.419c.2-.2.481-.312.759-.312h4.528V9.023h2.856v2.019h6.866z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'store',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.706 10.761l-2.667-6.222A.89.89 0 0 0 18.222 4H5.778a.888.888 0 0 0-.817.539l-2.667 6.222A.89.89 0 0 0 3.111 12H4v7.111c0 .492.398.889.889.889h8.889v-6.222h3.556V20h1.778a.888.888 0 0 0 .889-.889V12h.889a.886.886 0 0 0 .817-1.239zm-10.595 6.572H6.667v-3.556h4.444v3.556zm8.429-7.111h-2.426l-1.269-4.444h1.791l1.904 4.444zm-10.806 0l1.269-4.444h1.108v4.444H8.734zm4.155-4.444h1.108l1.269 4.444h-2.377V5.778zm-6.525 0h1.791l-1.269 4.444H4.46l1.904-4.444z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'step-next',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'star',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.001 17.696l-6.137 3.719 1.627-6.974-5.393-4.695 7.113-.605L12 2.586l2.789 6.555 7.113.605-5.393 4.695 1.627 6.974z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'star-o',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 15.914l3.75 2.25-.984-4.266 3.328-2.906-4.406-.375L12 6.586l-1.688 4.031-4.406.375 3.328 2.906-.984 4.266zm9.984-6.187l-5.438 4.734 1.641 7.031-6.188-3.75-6.188 3.75 1.641-7.031-5.438-4.734 7.172-.609 2.813-6.609 2.813 6.609z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'star-half',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 15.914l3.75 2.25-.984-4.266 3.328-2.906-4.406-.375L12 6.586v9.328zm9.984-6.187l-5.438 4.734 1.641 7.031-6.188-3.75-6.188 3.75 1.641-7.031-5.438-4.734 7.172-.609 2.813-6.609 2.813 6.609z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'spellcheck',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.609 11.578l1.406 1.406-9.516 9.516-5.063-5.109 1.406-1.406 3.656 3.703zm-15.187-.562h4.125L8.484 5.485zm6.047 4.968l-1.172-3H5.672l-1.125 3H2.438L7.547 3h1.875l5.109 12.984h-2.063z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'sort',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.006 14.025a.683.683 0 0 1-.2.475l-4.728 4.728a.665.665 0 0 1-.95 0L6.403 14.5a.665.665 0 0 1-.2-.475.68.68 0 0 1 .675-.675h9.456a.68.68 0 0 1 .672.675zm0-4.05a.68.68 0 0 1-.675.675H6.878a.68.68 0 0 1-.675-.675c0-.178.075-.347.2-.475l4.728-4.728a.665.665 0 0 1 .95 0L16.806 9.5a.66.66 0 0 1 .2.475z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'sms-failed',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.881 3.031h-13.8c-1.172 0-2.122.95-2.122 2.122v15.831L6.943 17H18.88c1.172 0 2.122-.95 2.122-2.122V5.153c0-1.172-.95-2.122-2.122-2.122zm-7.868 1.913h1.938v5.978h-1.938V4.944zm1.984 10.025h-2.031v-2h2.031v2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'skip-previous',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.516 12L18 6v12zM6 6h2.016v12H6V6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'skip-next',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.984 6H18v12h-2.016V6zM6 18V6l8.484 6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'sitemap',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.666 16.047v3.891c0 .572-.462 1.034-1.034 1.034h-3.453a1.033 1.033 0 0 1-1.034-1.034v-3.891c0-.572.462-1.034 1.034-1.034h1.034v-2.322h-5.522v2.322h1.034c.572 0 1.034.462 1.034 1.034v3.891c0 .572-.462 1.034-1.034 1.034h-3.45a1.033 1.033 0 0 1-1.034-1.034v-3.891c0-.572.462-1.034 1.034-1.034h1.034v-2.322H5.784v2.322h1.034c.572 0 1.034.462 1.034 1.034v3.891c0 .572-.462 1.034-1.034 1.034h-3.45a1.033 1.033 0 0 1-1.034-1.034v-3.891c0-.572.462-1.034 1.034-1.034h1.034v-2.322a1.39 1.39 0 0 1 1.381-1.381h5.525V8.988h-1.034A1.033 1.033 0 0 1 9.24 7.954V4.063c0-.572.462-1.034 1.034-1.034h3.453c.572 0 1.034.462 1.034 1.034v3.891c0 .572-.462 1.034-1.034 1.034h-1.034v2.322h5.525a1.39 1.39 0 0 1 1.381 1.381v2.322h1.034c.569 0 1.031.462 1.031 1.034z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'shrink1',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M10.688 13.312v8.531l-3.281-3.281L3.469 22.5 1.5 20.531l3.938-3.938-3.281-3.281zM22.5 3.469l-3.938 3.938 3.281 3.281h-8.531V2.157l3.281 3.281L20.531 1.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'shrink',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M13.312 10.688h8.531l-3.281-3.281L22.5 3.469 20.531 1.5l-3.938 3.938-3.281-3.281z"></path><path d="M13.312 13.312v8.531l3.281-3.281 3.938 3.938 1.969-1.969-3.938-3.938 3.281-3.281z"></path><path d="M10.688 13.312H2.157l3.281 3.281L1.5 20.531 3.469 22.5l3.938-3.938 3.281 3.281z"></path><path d="M10.688 10.688V2.157L7.407 5.438 3.469 1.5 1.5 3.469l3.938 3.938-3.281 3.281z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'shield',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19.383 2.051a1 1 0 0 0-1.09.217c-.985.985-1.956 1.484-2.885 1.484-1.532 0-2.602-1.368-2.608-1.377a1.003 1.003 0 0 0-.796-.398c-.275-.021-.609.145-.801.393-.01.014-1.079 1.382-2.61 1.382-.93 0-1.9-.499-2.886-1.484A.999.999 0 0 0 4 2.975v11c0 3.808 6.763 7.479 7.534 7.885a.998.998 0 0 0 .932 0c.771-.407 7.534-4.078 7.534-7.885v-11a1 1 0 0 0-.617-.924zM16 12.975h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Share',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M7 14.5s1.149-3.75 7.5-3.75v3.75l7.5-5-7.5-5v3.75c-5 0-7.5 3.119-7.5 6.25zm8.75 2.5H4.5V9.5h2.459c.197-.233.408-.456.635-.668A8.653 8.653 0 0 1 10.643 7H2.001v12.5h16.25v-5.247l-2.5 1.667V17z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'settings',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 15.521c1.925 0 3.521-1.596 3.521-3.521S13.925 8.479 12 8.479 8.479 10.075 8.479 12s1.596 3.521 3.521 3.521zm7.465-2.535l2.113 1.644c.188.141.235.423.094.657l-2.019 3.475c-.141.235-.375.282-.61.188l-2.488-.986c-.516.375-1.08.751-1.69.986l-.375 2.629c-.047.235-.235.423-.469.423H9.984c-.235 0-.423-.188-.469-.423L9.14 18.95a6.148 6.148 0 0 1-1.69-.986l-2.488.986c-.235.094-.469.047-.61-.188l-2.019-3.475c-.141-.235-.094-.516.094-.657l2.113-1.644c-.047-.328-.047-.657-.047-.986s0-.657.047-.986L2.427 9.37c-.188-.141-.235-.423-.094-.657l2.019-3.475c.141-.235.375-.282.61-.188l2.488.986c.516-.375 1.08-.751 1.69-.986l.375-2.629c.047-.235.235-.423.469-.423h4.037c.235 0 .423.188.469.423l.375 2.629c.61.235 1.174.564 1.69.986l2.488-.986c.235-.094.469-.047.61.188l2.019 3.475c.141.235.094.516-.094.657l-2.113 1.644c.047.328.047.657.047.986s0 .657-.047.986z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Settings-vertical',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.75 10.875h.281c.464 0 .843-.38.843-.843V7.22a.846.846 0 0 0-.843-.843h-.281V3.002H16.5v3.375h-.281a.846.846 0 0 0-.843.843v2.812c0 .464.38.843.843.843h.281V21h2.25V10.875zM16.5 7.5h2.25v2.25H16.5V7.5zm-3.093 10.125c.464 0 .843-.38.843-.843V13.97a.846.846 0 0 0-.843-.843h-.281V3.002h-2.25v10.125h-.281a.846.846 0 0 0-.843.843v2.812c0 .464.38.843.843.843h.281V21h2.25v-3.375h.281zm-2.532-3.375h2.25v2.25h-2.25v-2.25zm-3.094-3.375c.464 0 .843-.38.843-.843V7.22a.846.846 0 0 0-.843-.843H7.5V3.002H5.25v3.375h-.281a.846.846 0 0 0-.843.843v2.812c0 .464.38.843.843.843h.281V21H7.5V10.875h.281zM5.25 7.5H7.5v2.25H5.25V7.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'server',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3.984 11.016v1.969H6v-1.969H3.984zm-1.968 3V9.985h19.969v4.031H2.016zM6 6.984V5.015H3.984v1.969H6zm-3.984-3h19.969v4.031H2.016V3.984zm1.968 13.032v1.969H6v-1.969H3.984zm-1.968 3v-4.031h19.969v4.031H2.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'send',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M22.657 1.135a.793.793 0 0 1 .331.786l-3.143 18.857a.787.787 0 0 1-.774.65.87.87 0 0 1-.295-.061l-5.561-2.271-2.971 3.622a.762.762 0 0 1-.602.282.784.784 0 0 1-.786-.786v-4.285L19.463 4.928 6.339 16.284 1.49 14.295a.78.78 0 0 1-.491-.675.792.792 0 0 1 .393-.724L21.821 1.11a.76.76 0 0 1 .393-.111c.16 0 .319.049.442.135z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'search',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.503 14.964h-.795l-1.186-1.186a7.117 7.117 0 1 0-.83.821l-.011.009 1.186 1.186v.795l5.457 5.386 1.673-1.684zm-7.331-.972a4.744 4.744 0 1 1 0-9.49 4.744 4.744 0 1 1 0 9.49z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'restore',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.487 8.237h1.417v3.984l3.32 1.992-.708 1.151-4.029-2.435V8.236zm.93-4.737c4.693 0 8.5 3.807 8.5 8.5s-3.807 8.5-8.5 8.5a8.364 8.364 0 0 1-5.977-2.479l1.328-1.372c1.195 1.195 2.833 1.948 4.648 1.948 3.674 0 6.641-2.922 6.641-6.596s-2.966-6.596-6.641-6.596S6.82 8.327 6.82 12.001h2.833l-3.807 3.807-.089-.133-3.674-3.674h2.833c0-4.693 3.807-8.5 8.5-8.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'reply',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M10.253 8.953c6.053.853 8.694 5.2 9.547 9.547-2.153-3.047-5.2-4.428-9.547-4.428v3.534L4.2 11.553 10.253 5.5v3.453z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'reply-all',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.853 8.953c6.053.853 8.694 5.2 9.547 9.547-2.153-3.047-5.2-4.428-9.547-4.428v3.534L6.8 11.553 12.853 5.5v3.453zm-5.2-.853L4.2 11.553l3.453 3.453v2.6L1.6 11.553 7.653 5.5v2.6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Replay-30',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 5.7V2.1L7.5 6.6l4.5 4.5V7.5c2.97 0 5.4 2.43 5.4 5.4s-2.43 5.4-5.4 5.4-5.4-2.43-5.4-5.4H4.8c0 3.96 3.24 7.2 7.2 7.2s7.2-3.24 7.2-7.2-3.24-7.2-7.2-7.2zm-2.16 7.65h.36c.18 0 .36-.09.45-.18s.18-.18.18-.36v-.18s-.09-.09-.09-.18-.09-.09-.18-.09h-.45s-.09.09-.18.09-.09.09-.09.18v.18h-.9c0-.18 0-.27.09-.45s.18-.27.27-.36.27-.18.36-.18.36-.09.45-.09c.18 0 .36 0 .54.09s.27.09.45.18.18.18.27.36.09.27.09.45v.27s-.09.18-.09.27-.09.18-.18.18-.18.09-.27.18c.18.09.36.18.45.36s.18.36.18.54c0 .18 0 .36-.09.45s-.18.27-.27.36-.27.18-.45.18-.36.09-.54.09c-.18 0-.36 0-.45-.09s-.27-.09-.45-.18-.18-.18-.27-.36-.09-.36-.09-.54h.72v.18s.09.09.09.18.09.09.18.09h.45s.09-.09.18-.09.09-.09.09-.18v-.45s-.09-.09-.09-.18-.09-.09-.18-.09h-.54v-.63zm5.13.63c0 .27 0 .54-.09.72l-.27.54s-.27.27-.45.27-.36.09-.54.09-.36 0-.54-.09-.27-.18-.45-.27-.18-.27-.27-.54-.09-.45-.09-.72v-.63c0-.27 0-.54.09-.72l.27-.54s.27-.27.45-.27.36-.09.54-.09.36 0 .54.09.27.18.45.27.18.27.27.54.09.45.09.72v.63zm-.72-.72v-.45c0-.09-.09-.18-.09-.27s-.09-.09-.18-.18-.18-.09-.27-.09-.18 0-.27.09l-.18.18s-.09.18-.09.27v1.8s.09.18.09.27.09.09.18.18.18.09.27.09.18 0 .27-.09l.18-.18s.09-.18.09-.27v-1.35z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Replay-10',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 5.7V2.1L7.5 6.6l4.5 4.5V7.5c2.97 0 5.4 2.43 5.4 5.4s-2.43 5.4-5.4 5.4-5.4-2.43-5.4-5.4H4.8c0 3.96 3.24 7.2 7.2 7.2s7.2-3.24 7.2-7.2-3.24-7.2-7.2-7.2zm-.99 9.9h-.81v-2.97l-.9.27v-.63l1.62-.54h.09v3.87zm3.87-1.62c0 .27 0 .54-.09.72l-.27.54s-.27.27-.45.27-.36.09-.54.09-.36 0-.54-.09-.27-.18-.45-.27-.18-.27-.27-.54-.09-.45-.09-.72v-.63c0-.27 0-.54.09-.72l.27-.54s.27-.27.45-.27.36-.09.54-.09.36 0 .54.09c.18.09.27.18.45.27s.18.27.27.54.09.45.09.72v.63zm-.81-.72v-.45s-.09-.18-.09-.27-.09-.09-.18-.18-.18-.09-.27-.09-.18 0-.27.09l-.18.18s-.09.18-.09.27v1.8s.09.18.09.27.09.09.18.18.18.09.27.09.18 0 .27-.09l.18-.18s.09-.18.09-.27v-1.35z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Replay-5',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 5.7V2.1L7.5 6.6l4.5 4.5V7.5c2.97 0 5.4 2.43 5.4 5.4s-2.43 5.4-5.4 5.4-5.4-2.43-5.4-5.4H4.8c0 3.96 3.24 7.2 7.2 7.2s7.2-3.24 7.2-7.2-3.24-7.2-7.2-7.2zm-1.17 8.01l.18-1.98h2.16v.63h-1.53l-.09.81s.09 0 .09-.09.09 0 .09-.09.09 0 .18 0h.18c.18 0 .36 0 .45.09s.27.18.36.27.18.27.27.45.09.36.09.54c0 .18 0 .36-.09.45s-.09.27-.27.45-.27.18-.36.27-.36.09-.54.09c-.18 0-.36 0-.45-.09s-.27-.09-.45-.18-.18-.18-.27-.36-.09-.27-.09-.45h.72c0 .18.09.27.18.36s.18.09.36.09c.09 0 .18 0 .27-.09l.18-.18s.09-.18.09-.27v-.54l-.09-.18-.18-.18s-.18-.09-.27-.09h-.18s-.09 0-.18.09-.09 0-.09.09-.09.09-.09.09h-.63z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'remove',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 14H4v-4h16v4z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'redo',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.928 6.851V2l7.5 7.5-7.5 7.5v-4.957c-8.725-.205-8.351 5.934-6.13 9.957-5.483-5.926-4.318-15.421 6.13-15.149z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'receipt',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'radio-button-unchecked',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 17.607c3.082 0 5.607-2.525 5.607-5.607S15.082 6.393 12 6.393 6.393 8.918 6.393 12 8.918 17.607 12 17.607zm0-12.591c3.869 0 6.984 3.115 6.984 6.984S15.869 18.984 12 18.984 5.016 15.869 5.016 12 8.131 5.016 12 5.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'radio-button-checked',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 17.607c3.082 0 5.607-2.525 5.607-5.607S15.082 6.393 12 6.393 6.393 8.918 6.393 12 8.918 17.607 12 17.607zm0-12.591c3.869 0 6.984 3.115 6.984 6.984S15.869 18.984 12 18.984 5.016 15.869 5.016 12 8.131 5.016 12 5.016zm0 3.475c1.935 0 3.509 1.574 3.509 3.509S13.935 15.509 12 15.509 8.491 13.935 8.491 12 10.065 8.491 12 8.491z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Queue-add',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 6h2v14c0 1.1-.9 2-2 2H6v-2h14V6zM4 2h12c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm1 9h4v4h2v-4h4V9h-4V5H9v4H5v2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'priority_high',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.984 3h4.031v12H9.984V3zm0 15.984c0-1.125.891-1.969 2.016-1.969s2.016.844 2.016 1.969S13.125 21 12 21s-2.016-.891-2.016-2.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'printer',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M7.028 2.531h9.981v2.497H7.028V2.531z"></path><path d="M20.753 7.025H3.284c-.687 0-1.247.563-1.247 1.247v6.456c0 .687.563 1.247 1.247 1.247h3.744v4.994h9.981v-4.991h3.744c.687 0 1.247-.563 1.247-1.247V8.272c0-.684-.563-1.247-1.247-1.247zM4.531 10.769a1.248 1.248 0 1 1 1.247-1.247c0 .687-.559 1.247-1.247 1.247zm11.231 8.953H8.274v-6.241h7.488v6.241z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'poll',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.016 17.016v-4.031H15v4.031h2.016zm-4.032 0V6.985h-1.969v10.031h1.969zm-3.984 0V9.985H6.984v7.031H9zM18.984 3C20.062 3 21 3.938 21 5.016v13.969c0 1.078-.938 2.016-2.016 2.016H5.015c-1.078 0-2.016-.938-2.016-2.016V5.016C2.999 3.938 3.937 3 5.015 3h13.969z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'pointer',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21 3l-7.547 18h-.984l-2.625-6.844L3 11.531v-.984z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Podcast',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M13 15h-2c-2.757 0-5 2.243-5 5v2h12v-2c0-2.757-2.243-5-5-5z"></path><path d="M8.344 13.528c-1.25-1.758-1.1-4.211.475-5.783a4.501 4.501 0 0 1 6.363 0c1.574 1.572 1.725 4.025.476 5.783a6.936 6.936 0 0 1 1.733 1.028c1.701-2.526 1.438-5.992-.794-8.227-2.534-2.535-6.658-2.533-9.193 0-2.231 2.234-2.495 5.7-.794 8.227a6.99 6.99 0 0 1 1.734-1.028z"></path><path d="M5.512 15.668A7.936 7.936 0 0 1 4 11c0-2.137.833-4.146 2.344-5.657 3.119-3.119 8.193-3.119 11.313 0 2.809 2.81 3.079 7.2.83 10.324a7.03 7.03 0 0 1 1.06 1.878c3.406-3.923 3.254-9.886-.476-13.617C15.173.03 8.828.03 4.93 3.928A9.939 9.939 0 0 0 2 11c0 2.434.872 4.729 2.453 6.546a6.957 6.957 0 0 1 1.059-1.878z"></path><path d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'plus',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19.5 10H14V4.5a.5.5 0 0 0-.5-.5h-3.001a.5.5 0 0 0-.5.5V10h-5.5a.5.5 0 0 0-.5.5v3.001a.5.5 0 0 0 .5.5h5.5v5.5a.5.5 0 0 0 .5.5H13.5a.5.5 0 0 0 .5-.5v-5.5h5.5a.5.5 0 0 0 .5-.5V10.5a.5.5 0 0 0-.5-.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Playlist-play',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2.357 8.143h15.429v2.571H2.357zm0-5.143h15.429v2.571H2.357zm0 10.286h10.286v2.571H2.357zm12.857 0V21l6.429-3.857z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Playlist-check',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M13.5 9h-12v2h12V9zm0-4h-12v2h12V5zm-12 10h8v-2h-8v2zM21 10.5l1.5 1.5-6.99 7L11 14.5l1.5-1.5 3.01 3L21 10.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Playlist-add',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'play-arrow',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6.516 5.016L17.485 12 6.516 18.984V5.015z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'piggy-bank',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.048 6.286h-3.809c-.241 0-.484.015-.734.047L7.918 4.177a.763.763 0 0 0-1.25.585v3.592a6.127 6.127 0 0 0-1.077 1.742H3.62a.762.762 0 0 0-.762.762v3.809c0 .421.341.762.762.762h2.347a6.13 6.13 0 0 0 2.987 2.592V20h1.524v-1.574c.251.031.505.05.762.05h3.809c.259 0 .512-.022.762-.053v1.576h1.524v-1.973a6.1 6.1 0 0 0 3.809-5.646 6.102 6.102 0 0 0-6.095-6.095zM8.19 10.857a.762.762 0 1 1 0-1.524.762.762 0 0 1 0 1.524zm7.619-1.524h-4.571V7.809h4.571v1.524z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'pictures',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6.906 19.969H20c1.103 0 2-.897 2-2V8.981a1.95 1.95 0 0 0-1.95-1.95H20v10.938H4.906c0 1.103.897 2 2 2z"></path><path d="M16.709 6.15c.075 0 .134.059.134.134v8.484a.133.133 0 0 1-.134.134H4.218a.133.133 0 0 1-.134-.134V6.284c0-.075.059-.134.134-.134h12.491zm0-2.125H4.218a2.258 2.258 0 0 0-2.259 2.259v8.484a2.258 2.258 0 0 0 2.259 2.259h12.487a2.259 2.259 0 0 0 2.259-2.259V6.284a2.255 2.255 0 0 0-2.256-2.259z"></path><path d="M11.581 11.55L9.972 9.834l-1.609 2.753-1.209-1.266-1.309 2.766h10.269l-2.347-6.372-2.184 3.834z"></path><path d="M7.159 9.297c.594 0 1.078-.484 1.078-1.078s-.484-1.078-1.078-1.078-1.078.484-1.078 1.078.484 1.078 1.078 1.078z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'picture-in-picture',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 18.25V5.75H4v12.5h16zm1.792-.042c0 .958-.833 1.792-1.792 1.792H4c-.958 0-1.792-.833-1.792-1.792V5.75C2.208 4.792 3.041 4 4 4h16c.958 0 1.792.792 1.792 1.75v12.458zm-3.584-7.083v5.333h-7.083v-5.333h7.083z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'percent',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.333 7.556a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0z"></path><path d="M20 18.222a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0z"></path><path d="M4.26 19.372L18.482 5.15l1.257 1.257L5.517 20.629 4.26 19.372z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'pause',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Palette',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'package',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M13 8V2h4a1 1 0 0 1 .832.446L21.535 8H13z"></path><path d="M2.465 8l3.703-5.554A1 1 0 0 1 7 2h4v6H2.465z"></path><path d="M22 21a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10h20v11zm-11-5H5v3h6v-3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'package-upload',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.315 2.373a.833.833 0 0 0-.693-.372h-3.333v5h7.112l-3.086-4.628z"></path><path d="M17.955 11.999c.283 0 .561.029.833.068V8.668H2.122v9.166c0 .46.373.833.833.833h9.233a5.87 5.87 0 0 1-.067-.836 5.834 5.834 0 0 1 5.833-5.833z"></path><path d="M9.622 2.002H6.289a.83.83 0 0 0-.693.372L2.51 7.002h7.112v-5z"></path><path d="M17.955 14.154l-3.922 3.922 1.178 1.178 1.911-1.91v4.655h1.667v-4.655l1.911 1.91 1.178-1.178z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'package-download',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.315 2.373a.833.833 0 0 0-.693-.372h-3.333v5h7.112l-3.086-4.628z"></path><path d="M17.955 11.999c.283 0 .561.029.833.068V8.668H2.122v9.166c0 .46.373.833.833.833h9.233a5.87 5.87 0 0 1-.067-.836 5.834 5.834 0 0 1 5.833-5.833z"></path><path d="M9.622 2.002H6.289a.83.83 0 0 0-.693.372L2.51 7.002h7.112v-5z"></path><path d="M18.045 21.846l3.922-3.922-1.178-1.178-1.911 1.91v-4.655h-1.667v4.655l-1.911-1.91-1.178 1.178z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'open-in-new',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M14.016 3H21v6.984h-2.016V6.421l-9.797 9.797-1.406-1.406 9.797-9.797h-3.563V2.999zm4.968 15.984V12H21v6.984C21 20.062 20.062 21 18.984 21H5.015c-1.125 0-2.016-.938-2.016-2.016V5.015c0-1.078.891-2.016 2.016-2.016h6.984v2.016H5.015v13.969h13.969z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'notifications-off',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.008 14.438L9.055 5.016c.234-.094.469-.234.703-.328h.047l.281-.141c.141-.047.281-.047.422-.094V3.75c0-.844.656-1.5 1.5-1.5s1.5.656 1.5 1.5v.703c2.859.703 4.5 3.234 4.5 6.328v3.656zm-6 7.312c-1.125 0-2.016-.844-2.016-1.969h4.031c0 1.125-.891 1.969-2.016 1.969zM7.836 5.906c4.388 4.534 8.797 9.047 13.172 13.594l-1.266 1.266-2.016-2.016H3.992v-.984l2.016-2.016v-5.016c0-1.266.281-2.438.797-3.422L3.992 4.546l1.266-1.313z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'notifications-idle',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M14.484 9.563V7.782H9.515v1.781h2.766l-2.766 3.422v1.781h4.969v-1.781h-2.766zM18 15.75l2.016 2.016v.984H3.985v-.984l2.016-2.016v-4.969c0-3.047 1.641-5.625 4.5-6.328V3.75c0-.844.656-1.5 1.5-1.5s1.5.656 1.5 1.5v.703c2.859.703 4.5 3.281 4.5 6.328v4.969zm-6 6c-1.125 0-2.016-.891-2.016-1.969h4.031c0 1.078-.938 1.969-2.016 1.969z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'notifications-add',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.605 12.467v-1.824h-2.714V7.929H11.11v2.714H8.396v1.824h2.714v2.714h1.781v-2.714h2.714zm2.629 3.435l1.908 1.908v.975H3.856v-.975l1.908-1.908v-5.259c0-2.926 2.036-5.429 4.792-6.065v-.636c0-.806.636-1.442 1.442-1.442s1.442.636 1.442 1.442v.636c2.757.636 4.792 3.138 4.792 6.065v5.259zm-8.015 3.774h3.563c0 .975-.806 1.824-1.781 1.824s-1.781-.848-1.781-1.824z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'notification',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18 15.75l2.016 2.016v.984H3.985v-.984l2.016-2.016v-4.969c0-3.094 1.641-5.625 4.5-6.328V3.75c0-.844.656-1.5 1.5-1.5s1.5.656 1.5 1.5v.703c2.859.703 4.5 3.281 4.5 6.328v4.969zm-6 6c-1.125 0-2.016-.891-2.016-1.969h4.031c0 1.078-.938 1.969-2.016 1.969z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'notification-active',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 21.75c-1.125 0-2.016-.891-2.016-1.969h3.984c0 1.164-.872 1.969-1.969 1.969zm6-10.969v4.969l2.016 2.016v.984H3.985v-.984l2.016-2.016v-4.969c0-3.094 1.641-5.625 4.5-6.328V3.75c0-.844.656-1.5 1.5-1.5s1.5.656 1.5 1.5v.703c2.859.703 4.5 3.281 4.5 6.328zm1.969-.515c-.141-2.672-1.5-4.969-3.516-6.422l1.406-1.406c2.391 1.828 3.984 4.641 4.125 7.828h-2.016zM7.594 3.844c-2.063 1.453-3.422 3.75-3.563 6.422H2.015c.141-3.188 1.734-6 4.125-7.828z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'mouse',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M13.905 5.762h.952a2.86 2.86 0 0 0 2.857-2.857v-.952h-1.905v.952a.954.954 0 0 1-.952.952h-.952a2.86 2.86 0 0 0-2.857 2.857v.952H8.191a1.906 1.906 0 0 0-1.905 1.905v6.667c0 3.151 2.563 5.714 5.714 5.714s5.714-2.563 5.714-5.714V9.571c0-1.05-.854-1.905-1.905-1.905h-2.857v-.952c0-.525.428-.952.952-.952zm-2.857 3.809v2.857H8.191V9.571h2.857zM12 20.048c-2.1 0-3.81-1.71-3.81-3.81v-1.905h7.619v1.905c0 2.1-1.71 3.81-3.81 3.81zm3.81-10.477v2.857h-2.857V9.571h2.857z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'more-vertical',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 7.999c1.1 0 2.001-.9 2.001-2.001s-.9-2.001-2.001-2.001c-1.1 0-2.001.9-2.001 2.001s.9 2.001 2.001 2.001zm0 2c-1.1 0-2.001.9-2.001 2.001s.9 2.001 2.001 2.001c1.1 0 2.001-.9 2.001-2.001s-.9-2.001-2.001-2.001zm0 6.002c-1.1 0-2.001.9-2.001 2.001s.9 2.001 2.001 2.001c1.1 0 2.001-.9 2.001-2.001s-.9-2.001-2.001-2.001z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'more-horizontal',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'mood-sad',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 14.016c2.344 0 4.313 1.406 5.109 3.469h-1.641c-.703-1.172-1.969-1.969-3.469-1.969s-2.766.797-3.469 1.969H6.889c.797-2.063 2.766-3.469 5.109-3.469zm0 6c4.406 0 8.016-3.609 8.016-8.016S16.407 3.984 12 3.984 3.984 7.593 3.984 12 7.593 20.016 12 20.016zm0-18c5.531 0 9.984 4.453 9.984 9.984S17.531 21.984 12 21.984 2.016 17.531 2.016 12 6.469 2.016 12 2.016zm-5.016 7.5c0-.844.656-1.5 1.5-1.5s1.5.656 1.5 1.5-.656 1.5-1.5 1.5-1.5-.656-1.5-1.5zm7.032 0c0-.844.656-1.5 1.5-1.5s1.5.656 1.5 1.5-.656 1.5-1.5 1.5-1.5-.656-1.5-1.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'mood-neutral',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 20.016c4.406 0 8.016-3.609 8.016-8.016S16.407 3.984 12 3.984 3.984 7.593 3.984 12 7.593 20.016 12 20.016zm0-18c5.531 0 9.984 4.453 9.984 9.984S17.531 21.984 12 21.984 2.016 17.531 2.016 12 6.469 2.016 12 2.016zm-5.016 7.5c0-.844.656-1.5 1.5-1.5s1.5.656 1.5 1.5-.656 1.5-1.5 1.5-1.5-.656-1.5-1.5zm7.032 0c0-.844.656-1.5 1.5-1.5s1.5.656 1.5 1.5-.656 1.5-1.5 1.5-1.5-.656-1.5-1.5zM9 14.016h6v1.5H9v-1.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'mood-happy',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 15.984c1.5 0 2.766-.797 3.469-1.969h1.641c-.797 2.063-2.766 3.469-5.109 3.469s-4.313-1.406-5.109-3.469h1.641a4.018 4.018 0 0 0 3.469 1.969zm0 4.032c4.406 0 8.016-3.609 8.016-8.016S16.407 3.984 12 3.984 3.984 7.593 3.984 12 7.593 20.016 12 20.016zm0-18c5.531 0 9.984 4.453 9.984 9.984S17.531 21.984 12 21.984 2.016 17.531 2.016 12 6.469 2.016 12 2.016zm-5.016 7.5c0-.844.656-1.5 1.5-1.5s1.5.656 1.5 1.5-.656 1.5-1.5 1.5-1.5-.656-1.5-1.5zm7.032 0c0-.844.656-1.5 1.5-1.5s1.5.656 1.5 1.5-.656 1.5-1.5 1.5-1.5-.656-1.5-1.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'mood-excited',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 17.484c-2.344 0-4.313-1.406-5.109-3.469H17.11c-.797 2.063-2.766 3.469-5.109 3.469zm-3.516-6.468c-.844 0-1.5-.656-1.5-1.5s.656-1.5 1.5-1.5 1.5.656 1.5 1.5-.656 1.5-1.5 1.5zm7.032 0c-.844 0-1.5-.656-1.5-1.5s.656-1.5 1.5-1.5 1.5.656 1.5 1.5-.656 1.5-1.5 1.5zm-3.516 9c4.406 0 8.016-3.609 8.016-8.016S16.407 3.984 12 3.984 3.984 7.593 3.984 12 7.593 20.016 12 20.016zm0-18c5.531 0 9.984 4.453 9.984 9.984S17.531 21.984 12 21.984 2.016 17.531 2.016 12 6.469 2.016 12 2.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'mood-bad',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 14.016c2.344 0 4.313 1.406 5.109 3.469H6.89c.797-2.063 2.766-3.469 5.109-3.469zm-3.516-3c-.844 0-1.5-.656-1.5-1.5s.656-1.5 1.5-1.5 1.5.656 1.5 1.5-.656 1.5-1.5 1.5zm7.032 0c-.844 0-1.5-.656-1.5-1.5s.656-1.5 1.5-1.5 1.5.656 1.5 1.5-.656 1.5-1.5 1.5zm-3.516 9c4.406 0 8.016-3.609 8.016-8.016S16.407 3.984 12 3.984 3.984 7.593 3.984 12 7.593 20.016 12 20.016zm0-18c5.531 0 9.984 4.453 9.984 9.984S17.531 21.984 12 21.984 2.016 17.531 2.016 12 6.469 2.016 12 2.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'money-note',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19.987 7.025v10.972H3.031c0 1.103.894 1.994 1.994 1.994h14.934a2.023 2.023 0 0 0 2.022-2.022v-8.95a1.994 1.994 0 0 0-1.994-1.994z"></path><path d="M17.112 5.031H2.84a.819.819 0 0 0-.825.806v9.331c0 .444.372.806.825.806h14.275a.819.819 0 0 0 .825-.806V5.837a.819.819 0 0 0-.828-.806zm-2.365 8.019c-.303.444-.397.95-.297 1.369H5.537c.103-.419.006-.925-.297-1.369-.409-.603-1.081-.903-1.634-.781V8.513c.428.103.95.009 1.403-.288.631-.413.938-1.087.791-1.634h8.388c-.147.547.159 1.222.791 1.634.444.291.947.384 1.366.297v3.741c-.544-.1-1.194.197-1.597.787z"></path><path d="M12.472 10.641c0 1.716-1.147 3.109-2.559 3.109s-2.559-1.391-2.559-3.109 1.147-3.109 2.559-3.109 2.559 1.394 2.559 3.109z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'mobile',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.636 2H8.363A2.273 2.273 0 0 0 6.09 4.273v15.455a2.273 2.273 0 0 0 2.273 2.273h7.273a2.273 2.273 0 0 0 2.273-2.273V4.273A2.273 2.273 0 0 0 15.636 2zM12 21.091c-.755 0-1.364-.609-1.364-1.364s.609-1.364 1.364-1.364 1.364.609 1.364 1.364-.609 1.364-1.364 1.364zm4.091-3.636H7.909V4.728h8.182v12.727z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'mms',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.881 3.031h-13.8c-1.172 0-2.122.95-2.122 2.122v15.831L6.943 17H18.88c1.172 0 2.122-.95 2.122-2.122V5.153c0-1.172-.95-2.122-2.122-2.122zM5.55 12.969c0-.034 3.466-4.091 3.466-4.091l1.928 2.553 3.181-3.806 4.719 5.344H5.55z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'mic-on',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.576 11.482h1.776c0 3.602-2.862 6.563-6.316 7.056v3.454h-2.072v-3.454c-3.454-.493-6.316-3.454-6.316-7.056h1.776c0 3.158 2.665 5.329 5.576 5.329s5.576-2.171 5.576-5.329zM12 14.64c-1.727 0-3.158-1.431-3.158-3.158V5.166c0-1.727 1.431-3.158 3.158-3.158s3.158 1.431 3.158 3.158v6.316c0 1.727-1.431 3.158-3.158 3.158z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'mic-off',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3.858 3.044L21.474 20.66l-1.332 1.332L15.75 17.6c-.79.493-1.776.79-2.714.938v3.454h-2.072v-3.454c-3.454-.493-6.316-3.454-6.316-7.056h1.776c0 3.158 2.665 5.329 5.576 5.329.839 0 1.678-.197 2.418-.543l-1.727-1.727a2.926 2.926 0 0 1-.691.099c-1.727 0-3.158-1.431-3.158-3.158v-.79L2.526 4.376zm11.3 8.586L8.842 5.363v-.197c0-1.727 1.431-3.158 3.158-3.158s3.158 1.431 3.158 3.158v6.464zm4.194-.148a6.958 6.958 0 0 1-.938 3.454l-1.283-1.332c.296-.641.444-1.332.444-2.122h1.776z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'message',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.922 3.031h-13.8C3.95 3.031 3 3.981 3 5.153v15.831L6.984 17h11.937c1.172 0 2.122-.95 2.122-2.122V5.153c0-1.172-.95-2.122-2.122-2.122zm-4.766 11.438H5.993v-1.5h8.163v1.5zm3.888-3.594H5.994V9.5h12.05v1.375zm0-3.375H5.994V6.063h12.05V7.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'message-bubble-blank',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.922 3.031h-13.8C3.95 3.031 3 3.981 3 5.153v15.831L6.984 17h11.937c1.172 0 2.122-.95 2.122-2.122V5.153c0-1.172-.95-2.122-2.122-2.122z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'menu',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3 6h18v2.016H3V6z"></path><path d="M3 11.016h14.031v1.969H3v-1.969z"></path><path d="M3 15.984h16V18H3v-2.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'map-pin',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 11.484c1.359 0 2.484-1.125 2.484-2.484S13.359 6.516 12 6.516 9.516 7.641 9.516 9s1.125 2.484 2.484 2.484zm0-9.468A6.942 6.942 0 0 1 18.984 9c0 5.25-6.984 12.984-6.984 12.984S5.016 14.25 5.016 9A6.942 6.942 0 0 1 12 2.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'lock',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17 11V7A5 5 0 0 0 7 7v4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-5-7a3 3 0 0 1 3 3v4H9V7a3 3 0 0 1 3-3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'local-shipping',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.251 17.703c.738 0 1.313-.574 1.313-1.313s-.574-1.313-1.313-1.313-1.313.574-1.313 1.313.574 1.313 1.313 1.313zm1.313-7.877H16.39V12h3.898zM6.749 17.703c.738 0 1.313-.574 1.313-1.313s-.574-1.313-1.313-1.313-1.313.574-1.313 1.313.574 1.313 1.313 1.313zm12.267-9.19L21.642 12v4.39h-1.764c0 1.436-1.19 2.626-2.626 2.626s-2.626-1.19-2.626-2.626H9.375c0 1.436-1.19 2.626-2.626 2.626s-2.626-1.19-2.626-2.626H2.359V6.749c0-.944.821-1.764 1.764-1.764H16.39v3.528h2.626z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'loading',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.35 5.644A8.953 8.953 0 0 0 11.994 3c-4.972 0-8.989 4.027-8.989 9s4.016 9 8.989 9c4.196 0 7.695-2.869 8.696-6.75h-2.34a6.74 6.74 0 0 1-6.356 4.5c-3.724 0-6.75-3.026-6.75-6.75s3.026-6.75 6.75-6.75c1.867 0 3.533.776 4.748 2.002l-3.622 3.622h7.875V2.999l-2.644 2.644z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'live-help',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.881 3.031h-13.8c-1.172 0-2.122.95-2.122 2.122v15.831L6.943 17H18.88c1.172 0 2.122-.95 2.122-2.122V5.153c0-1.172-.95-2.122-2.122-2.122zm-6.04 11.613a1.215 1.215 0 0 1-.912.381c-.363 0-.666-.128-.903-.381a1.308 1.308 0 0 1-.359-.941c0-.381.119-.7.359-.953s.541-.381.903-.381c.363 0 .669.128.912.381s.366.572.366.953c0 .375-.122.687-.366.941zm1.843-6.331a3.178 3.178 0 0 1-.394.653c-.159.2-.325.394-.503.581s-.341.381-.487.581c-.15.2-.266.416-.353.637a1.651 1.651 0 0 0-.087.769h-1.853a2.282 2.282 0 0 1 .034-.891c.072-.269.175-.516.309-.747s.284-.441.453-.631c.169-.191.328-.375.481-.553s.281-.35.381-.516c.1-.169.15-.341.15-.525 0-.297-.087-.522-.266-.675s-.409-.231-.697-.231c-.269 0-.506.063-.709.188a3.165 3.165 0 0 0-.597.475L9.383 6.366a3.852 3.852 0 0 1 1.2-.947 3.301 3.301 0 0 1 1.544-.359c.381 0 .741.047 1.069.144.331.097.619.244.862.444s.434.456.575.769c.138.312.209.678.209 1.097-.003.3-.053.566-.159.8z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'list',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6.984 6.984H21V9H6.984V6.984zm0 10.032V15H21v2.016H6.984zm0-4.032v-1.969H21v1.969H6.984zM3 9V6.984h2.016V9H3zm0 8.016V15h2.016v2.016H3zm0-4.032v-1.969h2.016v1.969H3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'list-add',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2.016 15.984v-1.969h7.969v1.969H2.016zM18 14.016h3.984v1.969H18v4.031h-2.016v-4.031H12v-1.969h3.984V9.985H18v4.031zM14.016 6v2.016h-12V6h12zm0 3.984V12h-12V9.984h12z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'line-weight',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3 3.984h18v4.031H3V3.984zm0 9v-3h18v3H3zm0 7.032v-1.031h18v1.031H3zm0-3V15h18v2.016H3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'line-style',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3 3.984h18v4.031H3V3.984zM12.984 12V9.984H21V12h-8.016zM3 12V9.984h8.016V12H3zm15.984 8.016V18H21v2.016h-2.016zm-3.984 0V18h2.016v2.016H15zm-3.984 0V18h1.969v2.016h-1.969zm-4.032 0V18H9v2.016H6.984zm-3.984 0V18h2.016v2.016H3zm12.984-4.032v-1.969H21v1.969h-5.016zm-6.468 0v-1.969h4.969v1.969H9.516zm-6.516 0v-1.969h5.016v1.969H3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'library-books',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M5.016 6.984V5.015H15v1.969H5.016zM9 15v-2.016h6V15H9zm-3.984-3.984V9H15v2.016H5.016zm-1.032-9a1.981 1.981 0 0 0-1.969 1.969v12c0 1.078.891 2.016 1.969 2.016h12c1.078 0 2.016-.938 2.016-2.016v-12c0-1.078-.938-1.969-2.016-1.969h-12zM20.016 6v14.016H6v1.969h14.016a1.981 1.981 0 0 0 1.969-1.969V6h-1.969z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'layers',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 15.984C8.999 13.656 6.009 11.319 3 9l9-6.984L21 9c-3.009 2.319-5.999 4.657-9 6.984zm0 2.579l7.359-5.766L21 14.063l-9 6.984-9-6.984 1.641-1.266z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'layers-off',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3.281.984l18.703 18.75L20.718 21l-3.75-3.797-4.969 3.844-9-6.984 1.641-1.266 7.359 5.766 3.516-2.766-1.406-1.406L12 15.985c-3.001-2.328-5.991-4.665-9-6.984L6.234 6.47 2.015 2.251zM21 9c-1.354 1.037-2.692 2.089-4.031 3.141L9.094 4.266 12 2.016zm-1.172 6l-1.453-1.453 1.172-.891L21 14.062z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'last-page',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21 2.994h-2.966V21H21V2.994z"></path><path d="M2.934 18.891L5.043 21l9-9-9-9-2.109 2.109L9.825 12z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'laptop',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.588 17.353c.906 0 1.639-.741 1.639-1.647l.008-9.059c0-.906-.741-1.647-1.647-1.647H5.412c-.906 0-1.647.741-1.647 1.647v9.059c0 .906.741 1.647 1.647 1.647H2.118c0 .906.741 1.647 1.647 1.647h16.471c.906 0 1.647-.741 1.647-1.647h-3.294zM5.412 6.647h13.176v9.059H5.412V6.647zM12 18.176c-.453 0-.824-.371-.824-.824s.371-.824.824-.824.824.371.824.824-.371.824-.824.824z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'label',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'keyhole',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm1.1 8.52l.5 3.48h-3.2l.5-3.48a2.404 2.404 0 0 1-1.3-2.133 2.4 2.4 0 1 1 3.513 2.127l-.013.006z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'image',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20.016 2.016H3.985a1.981 1.981 0 0 0-1.969 1.969v16.031c0 1.078.891 1.969 1.969 1.969h16.031a1.981 1.981 0 0 0 1.969-1.969V3.985a1.981 1.981 0 0 0-1.969-1.969zm0 11.015v6.984H3.985V3.984h16.031v9.047z"></path><path d="M17.016 8.484a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z"></path><path d="M12.984 16.688l-3-3.703L6 18.001h12l-3-3.984z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'id-card',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M5.937 19.969h14.062c1.103 0 2-.897 2-2V7.95A1.95 1.95 0 0 0 20.049 6h-.05v11.969H3.937c0 1.103.897 2 2 2z"></path><path d="M16.109 3.969H3.859A1.861 1.861 0 0 0 2 5.828V14.2c0 1.025.834 1.859 1.859 1.859h12.247a1.861 1.861 0 0 0 1.859-1.859V5.828a1.857 1.857 0 0 0-1.856-1.859zm-11.818 9.3c0-1.713 1.078-2.791 2.791-2.791a1.86 1.86 0 1 1 0-3.719 1.86 1.86 0 0 1 0 3.719c1.713 0 2.791 1.078 2.791 2.791H4.292zm11.668 0h-4.034V11.41h4.034v1.859zm0-3.719h-4.034V7.691h4.034V9.55z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'id-badge',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9 8a2 2 0 1 1-.001 4.001A2 2 0 0 1 9 8zm-3 8c0-1.841 1.159-3 3-3s3 1.159 3 3H6zm12 0h-4v-2h4v2zm0-3h-4v-2h4v2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'hourglass',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'hourglass-o',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 22,
        'height': 24,
        'tags': '',
        'name': 'home2',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24"><g class="fk-icon-wrapper"><path d="M17.513 13.079v5.306a.713.713 0 0 1-.708.708H12.56v-4.245H9.73v4.245H5.485a.713.713 0 0 1-.708-.708v-5.306c0-.022.011-.045.011-.067l6.356-5.24 6.356 5.24a.144.144 0 0 1 .011.067zm2.465-.763l-.686.818a.37.37 0 0 1-.232.122h-.033a.348.348 0 0 1-.232-.077L11.145 6.8l-7.65 6.379a.378.378 0 0 1-.265.077.365.365 0 0 1-.232-.122l-.686-.818a.36.36 0 0 1 .045-.497l7.948-6.622c.464-.387 1.216-.387 1.68 0l2.698 2.255V5.296a.35.35 0 0 1 .354-.354h2.123a.35.35 0 0 1 .354.354v4.51l2.421 2.012a.362.362 0 0 1 .045.497z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'hearing',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M11.484 9c0-1.359 1.172-2.484 2.531-2.484S16.499 7.641 16.499 9s-1.125 2.484-2.484 2.484S11.484 10.359 11.484 9zM7.641 2.625A8.96 8.96 0 0 0 5.016 9a8.96 8.96 0 0 0 2.625 6.375l-1.406 1.406C4.266 14.812 3.001 12.047 3.001 9s1.266-5.813 3.234-7.781zm9.375 17.391c1.078 0 1.969-.938 1.969-2.016h2.016a3.98 3.98 0 0 1-3.984 3.984c-.563 0-1.125-.094-1.641-.328-1.359-.703-2.156-1.734-2.766-3.563-.328-.984-.891-1.453-1.688-2.063-.891-.656-1.969-1.5-2.859-3.141-.703-1.266-1.078-2.625-1.078-3.891 0-3.938 3.094-6.984 7.031-6.984S21 5.061 21 8.998h-2.016c0-2.813-2.156-5.016-4.969-5.016S8.999 6.185 8.999 8.998c0 .938.281 2.016.797 2.953.703 1.313 1.547 1.922 2.344 2.531.938.703 1.875 1.453 2.391 3 .516 1.5.984 1.969 1.688 2.344.188.094.516.188.797.188z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'globe',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.359 14.016h3.375c.141-.656.281-1.313.281-2.016s-.141-1.359-.281-2.016h-3.375c.094.656.141 1.313.141 2.016s-.047 1.359-.141 2.016zm-1.781 5.531a8.007 8.007 0 0 0 4.359-3.563h-2.953a15.676 15.676 0 0 1-1.406 3.563zm-.234-5.531c.094-.656.141-1.313.141-2.016s-.047-1.359-.141-2.016H9.656c-.094.656-.141 1.313-.141 2.016s.047 1.359.141 2.016h4.688zM12 19.969c.844-1.219 1.5-2.531 1.922-3.984h-3.844c.422 1.453 1.078 2.766 1.922 3.984zM8.016 8.016a15.676 15.676 0 0 1 1.406-3.563 8.007 8.007 0 0 0-4.359 3.563h2.953zm-2.953 7.968a8.015 8.015 0 0 0 4.359 3.563 15.676 15.676 0 0 1-1.406-3.563H5.063zm-.797-1.968h3.375C7.547 13.36 7.5 12.703 7.5 12s.047-1.359.141-2.016H4.266c-.141.656-.281 1.313-.281 2.016s.141 1.359.281 2.016zM12 4.031c-.844 1.219-1.5 2.531-1.922 3.984h3.844C13.5 6.562 12.844 5.249 12 4.031zm6.938 3.985a8.015 8.015 0 0 0-4.359-3.563 15.676 15.676 0 0 1 1.406 3.563h2.953zm-6.938-6c5.531 0 9.984 4.453 9.984 9.984S17.531 21.984 12 21.984 2.016 17.531 2.016 12 6.469 2.016 12 2.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'fullscreen',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M14.016 5.016h4.969v4.969h-1.969v-3h-3V5.016zm3 12v-3h1.969v4.969h-4.969v-1.969h3zm-12-7.032V5.015h4.969v1.969h-3v3H5.016zm1.968 4.032v3h3v1.969H5.015v-4.969h1.969z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'fullscreen-exit',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.984 8.016h3v1.969h-4.969V5.016h1.969v3zm-1.968 10.968v-4.969h4.969v1.969h-3v3h-1.969zm-6-10.968v-3h1.969v4.969H5.016V8.016h3zm-3 7.968v-1.969h4.969v4.969H8.016v-3h-3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-strikethrough',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3 14.531v-2.016h18v2.016H3zM5.016 4.5h13.969v3h-4.969v3H9.985v-3H5.016v-3zm4.968 15v-3h4.031v3H9.984z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-size',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3 12V9h9v3H9v6.984H6V12H3zm6-8.016h12.984v3h-4.969v12h-3v-12H8.999v-3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-shapes',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M10.807 12.682h2.387l-1.193-3.495zm2.77 1.151h-3.196l-.639 1.79H8.25l3.111-8.183h1.279l3.068 8.183h-1.449zM18.35 5.65h1.833V3.817H18.35V5.65zm1.833 14.533V18.35H18.35v1.833h1.833zM16.56 18.35v-1.79h1.79V7.44h-1.79V5.65H7.44v1.79H5.65v9.12h1.79v1.79h9.12zM5.65 20.183V18.35H3.817v1.833H5.65zM3.817 3.817V5.65H5.65V3.817H3.817zM22.015 7.44h-1.833v9.12h1.833v5.455H16.56v-1.833H7.44v1.833H1.985V16.56h1.833V7.44H1.985V1.985H7.44v1.833h9.12V1.985h5.455V7.44z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-quote',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M14.016 17.016l1.969-4.031h-3v-6h6v6l-1.969 4.031h-3zm-8.016 0l2.016-4.031h-3v-6h6v6L9 17.016H6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-paint',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18 3.984h3V12h-8.016v9a.96.96 0 0 1-.984.984H9.984A.96.96 0 0 1 9 21V9.984h9.984V6H18v.984c0 .563-.422 1.031-.984 1.031h-12a1.04 1.04 0 0 1-1.031-1.031V3c0-.563.469-.984 1.031-.984h12A.96.96 0 0 1 18 3v.984z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-list-numbered',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6.984 12.984v-1.969H21v1.969H6.984zm0 6v-1.969H21v1.969H6.984zm0-13.968H21v1.969H6.984V5.016zm-4.968 6V9.985h3v.938l-1.828 2.063h1.828v1.031h-3v-.938l1.781-2.063H2.016zm.984-3v-3h-.984V3.985h1.969v4.031h-.984zm-.984 9v-1.031h3v4.031h-3v-1.031h1.969v-.469h-.984v-1.031h.984v-.469H2.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-list-bulleted',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6.984 5.016H21v1.969H6.984V5.016zm0 7.968v-1.969H21v1.969H6.984zm0 6v-1.969H21v1.969H6.984zm-3-2.484c.844 0 1.5.703 1.5 1.5s-.703 1.5-1.5 1.5-1.5-.703-1.5-1.5.656-1.5 1.5-1.5zm0-12c.844 0 1.5.656 1.5 1.5s-.656 1.5-1.5 1.5-1.5-.656-1.5-1.5.656-1.5 1.5-1.5zm0 6c.844 0 1.5.656 1.5 1.5s-.656 1.5-1.5 1.5-1.5-.656-1.5-1.5.656-1.5 1.5-1.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-line-spacing',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.984 12.984v-1.969h12v1.969h-12zm0 6v-1.969h12v1.969h-12zm0-13.968h12v1.969h-12V5.016zM6 6.984v10.031h2.484l-3.469 3.469-3.516-3.469h2.484V6.984H1.499l3.516-3.469 3.469 3.469H6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-italic',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.984 3.984H18v3h-2.813L11.812 15h2.203v3H5.999v-3h2.813l3.375-8.016H9.984v-3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-indent-increase',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M11.016 12.984v-1.969H21v1.969h-9.984zm0-3.984V6.984H21V9h-9.984zM3 3h18v2.016H3V3zm8.016 14.016V15H21v2.016h-9.984zM3 8.016L6.984 12 3 15.984V8.015zM3 21v-2.016h18V21H3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-indent-decrease',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M11.016 12.984v-1.969H21v1.969h-9.984zm0-3.984V6.984H21V9h-9.984zM3 3h18v2.016H3V3zm0 18v-2.016h18V21H3zm0-9l3.984-3.984v7.969zm8.016 5.016V15H21v2.016h-9.984z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-font',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.516 9v3h-3v6.984h-3V12h-3V9h9zM2.484 3.984h13.031v3h-5.016v12h-3v-12H2.483v-3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-color-text',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.609 12h4.781l-2.391-6.328zm1.407-9h1.969l5.484 14.016h-2.25l-1.078-3H8.86l-1.125 3h-2.25zM0 20.016h24V24H0v-3.984z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-color-reset',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M5.25 5.25l14.625 14.625-1.266 1.266-2.672-2.625c-1.078.938-2.438 1.5-3.938 1.5-3.328 0-6-2.672-6-6 0-1.219.563-2.672 1.313-4.125L3.984 6.563zM18 14.016c0 .469-.047.891-.141 1.313L9.281 6.704C10.687 4.688 12 3.188 12 3.188s6 6.844 6 10.828z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-color-fill',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M0 20.016h24V24H0v-3.984zm18.984-8.532S21 13.687 21 15c0 1.078-.938 2.016-2.016 2.016s-1.969-.938-1.969-2.016c0-1.313 1.969-3.516 1.969-3.516zm-13.781-1.5h9.609L9.984 5.203zm11.344-1.031c.609.609.609 1.547 0 2.109l-5.484 5.484c-.281.281-.703.469-1.078.469s-.75-.188-1.031-.469l-5.531-5.484c-.609-.563-.609-1.5 0-2.109l5.156-5.156-2.391-2.391L7.641 0z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-clear',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6 5.016h14.016v3h-5.813l-1.594 3.75L10.5 9.703l.703-1.688H8.812L5.999 5.202v-.188zm-2.719 0l.281.234L18 19.734 16.734 21l-5.672-5.672-1.547 3.656h-3l2.438-5.766L2.015 6.28z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-bold',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M13.5 15.516c.844 0 1.5-.656 1.5-1.5s-.656-1.5-1.5-1.5H9.984v3H13.5zm-3.516-9v3h3c.844 0 1.5-.656 1.5-1.5s-.656-1.5-1.5-1.5h-3zm5.625 4.265c1.313.609 2.156 1.922 2.156 3.422 0 2.109-1.594 3.797-3.703 3.797H6.984V3.984h6.281c2.25 0 3.984 1.781 3.984 4.031 0 1.031-.656 2.109-1.641 2.766z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-align-right',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3 3h18v2.016H3V3zm6 6V6.984h12V9H9zm-6 3.984v-1.969h18v1.969H3zm6 4.032V15h12v2.016H9zM3 21v-2.016h18V21H3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-align-left',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3 3h18v2.016H3V3zm0 18v-2.016h18V21H3zm0-8.016v-1.969h18v1.969H3zm12-6V9H3V6.984h12zM15 15v2.016H3V15h12z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-align-justify',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3 3h18v2.016H3V3zm0 6V6.984h18V9H3zm0 3.984v-1.969h18v1.969H3zm0 4.032V15h18v2.016H3zM3 21v-2.016h18V21H3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'format-align-center',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3 3h18v2.016H3V3zm3.984 3.984h10.031V9H6.984V6.984zm-3.984 6v-1.969h18v1.969H3zM3 21v-2.016h18V21H3zm3.984-6h10.031v2.016H6.984V15z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folders',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M8.406 4.016l1.959 1.991h5.587c1.609-.006 2.081.963 2.081 2.275v5.759c-.034 1.147-.941 1.897-2.081 1.928H3.999c-1.25 0-1.984-.594-1.984-1.616v-8.75c0-.866.716-1.584 1.578-1.584h4.812z"></path><path d="M5.937 19.969h14.062c1.103 0 2-.897 2-2V9.981a1.95 1.95 0 0 0-1.95-1.95h-.05v9.938H3.937c0 1.103.897 2 2 2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.984 3.984L12 6h8.016c1.078 0 1.969.938 1.969 2.016V18c0 1.078-.891 2.016-1.969 2.016H3.985c-1.078 0-1.969-.938-1.969-2.016V6c0-1.078.891-2.016 1.969-2.016h6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-zip',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-1 6h-2v2h2v2h-2v2h-2v-2h2v-2h-2v-2h2v-2h-2v-2h2v2h2v2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-view',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M14 13a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-3.227 11.772c-.332.331-.771.513-1.238.513s-.906-.182-1.237-.512l-1.108-1.109a4.45 4.45 0 0 1-1.69.336A4.505 4.505 0 0 1 7 13c0-2.481 2.019-4.5 4.5-4.5S16 10.519 16 13c0 .598-.123 1.167-.335 1.689l1.108 1.109a1.752 1.752 0 0 1 0 2.474z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-video',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-10 11v-8l6 4-6 4z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-upload',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-7 6v5h-2v-5H8l4-4 4 4h-3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-special',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.953 17.016l-.797-3.328 2.578-2.25-3.375-.281L15 8.016l-1.359 3.141-3.375.281 2.578 2.25-.797 3.328L15 15.282zM20.016 6c1.078 0 1.969.938 1.969 2.016V18c0 1.078-.891 2.016-1.969 2.016H3.985c-1.078 0-1.969-.938-1.969-2.016V6c0-1.078.891-2.016 1.969-2.016h6L12.001 6h8.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-shared',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.984 17.016v-1.031c0-1.313-2.672-1.969-3.984-1.969s-3.984.656-3.984 1.969v1.031h7.969zM15 9c-1.078 0-2.016.938-2.016 2.016s.938 1.969 2.016 1.969 2.016-.891 2.016-1.969S16.078 9 15 9zm5.016-3c1.078 0 1.969.938 1.969 2.016V18c0 1.078-.891 2.016-1.969 2.016H3.985c-1.078 0-1.969-.938-1.969-2.016V6c0-1.078.891-2.016 1.969-2.016h6L12.001 6h8.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-settings',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M14 13.5a2 2 0 1 1-3.999.001A2 2 0 0 1 14 13.5z"></path><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-3 7.909h-1.492a3.608 3.608 0 0 1-.358.877l.941.941-1.363 1.363-.942-.94a3.582 3.582 0 0 1-.876.357V18.5h-1.818v-1.492a3.582 3.582 0 0 1-.876-.357l-.942.94-1.363-1.363.941-.941a3.608 3.608 0 0 1-.358-.877H7v-1.818h1.492c.081-.312.203-.604.358-.876l-.941-.942 1.363-1.363.942.941c.272-.156.564-.277.876-.358V8.5h1.818v1.492c.312.081.604.202.876.358l.942-.941 1.363 1.363-.941.942c.155.272.277.564.358.876H17v1.819z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-refresh',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-8 12a4.966 4.966 0 0 1-3.355-1.316L7 18.5v-4h5l-1.767 1.414A2.954 2.954 0 0 0 12 16.5a2.996 2.996 0 0 0 2.816-2h2.083a5.009 5.009 0 0 1-4.899 4zm5-6h-5l1.767-1.414A2.954 2.954 0 0 0 12 10.5a2.996 2.996 0 0 0-2.816 2H7.101A5.009 5.009 0 0 1 12 8.5c1.295 0 2.466.506 3.355 1.316L17 8.5v4z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-network',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 2H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h7v3H8v2h8v-2h-3v-3h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"></path><path d="M20 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path><path d="M6 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-lock',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 10.869c-.551 0-1 .449-1 1V13.5h2v-1.631c0-.551-.449-1-1-1z"></path><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-4 12H8v-5h1v-1.631c0-1.654 1.346-3 3-3s3 1.346 3 3V13.5h1v5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-image',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-14 11l2.479-3.977 1.527 2.451 3.522-5.647L18 17.5H6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-home',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-5 6v5h-2v-3h-2v3H9v-5H7l5-4 5 4h-2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-favorite-star',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-4.5 12L12 16.002 8.5 18.5l1.5-4.003L7 12.5h3.5l1.507-4 1.493 4H17l-3 1.997 1.5 4.003z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-check',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-9 10.414l-3.707-3.707 1.414-1.414L11 14.086l4.293-4.293 1.414 1.414L11 16.914z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-bookmark',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-12 8l-2-2-2 2v-9h4v9z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-block',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M10.302 16.258A3.213 3.213 0 0 0 12 16.75a3.254 3.254 0 0 0 3.25-3.25c0-.624-.186-1.201-.492-1.697l-4.456 4.455z"></path><path d="M12 10.25a3.254 3.254 0 0 0-3.25 3.25c0 .624.186 1.202.492 1.697l4.456-4.455A3.222 3.222 0 0 0 12 10.25z"></path><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zm-8 11.75c-2.619 0-4.75-2.131-4.75-4.75S9.381 8.75 12 8.75s4.75 2.131 4.75 4.75-2.131 4.75-4.75 4.75z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'folder-audio',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 6.5h-8l-1.447-1.895A2.002 2.002 0 0 0 8.764 3.5H3a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-10a2 2 0 0 0-2-2zM15 15a1.5 1.5 0 1 1-1.5-1.5v-2.771l-3.5 1.14V16a1.5 1.5 0 1 1-1.5-1.5v-3.175a.75.75 0 0 1 .518-.713l5-1.63c.227-.075.479-.035.673.105s.309.368.309.608V15z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'flag',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M13.985 5.126h5.956v10.571h-7.444l-.397-2.084H6.144v7.395H4.06V2.992h9.529z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'first-page',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3 2.994h2.966V21H3V2.994z"></path><path d="M21.066 18.891L18.957 21l-9-9 9-9 2.109 2.109L14.175 12z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Fingerprint',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2a.506.506 0 0 1 .2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67a.49.49 0 0 1-.44.28zM3.5 9.72a.499.499 0 0 1-.41-.79c.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7s-.54.11-.7-.12a9.388 9.388 0 0 0-3.39-2.94c-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07a.47.47 0 0 1-.35-.15c-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39s-4.66 1.97-4.66 4.39c0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1a7.297 7.297 0 0 1-2.17-5.22c0-1.62 1.38-2.94 3.08-2.94s3.08 1.32 3.08 2.94c0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29a11.14 11.14 0 0 1-.73-3.96c0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 19,
        'height': 24,
        'tags': '',
        'name': 'filter',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24"><g class="fk-icon-wrapper"><path d="M16.88 4.984a.665.665 0 0 1-.148.739l-5.202 5.202v7.829a.681.681 0 0 1-.412.622.774.774 0 0 1-.264.052.626.626 0 0 1-.475-.201l-2.702-2.702a.673.673 0 0 1-.201-.475v-5.129L2.274 5.719a.664.664 0 0 1-.148-.739.685.685 0 0 1 .622-.412h13.507c.275 0 .517.169.622.412z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'files',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.8 2.031H6.062A1.821 1.821 0 0 0 4.243 3.85v12.322c0 1.003.816 1.819 1.819 1.819h9.091a1.821 1.821 0 0 0 1.819-1.819V6.203L12.8 2.031zm-1.284 5.453V2.94l4.547 4.544h-4.547z"></path><path d="M19.031 20.025H6.059c0 1.003.813 1.944 1.819 1.944h11.278a1.82 1.82 0 0 0 1.819-1.819V8.813c0-.959-.778-1.741-1.741-1.741h-.203v12.953z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'files-library',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M11.51 2H5.333c-.919 0-1.667.747-1.667 1.667v11.667c0 .919.747 1.667 1.667 1.667h8.333c.919 0 1.667-.747 1.667-1.667v-9.51L11.51 2.001zm-1.177 5V2.833L14.5 7h-4.167z"></path><path d="M16.167 17.833h-10V19.5h10c.919 0 1.667-.747 1.667-1.667V4.5h-1.667v13.333z"></path><path d="M18.667 20.333h-10V22h10c.919 0 1.667-.747 1.667-1.667V7h-1.667v13.333z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'files-landscape',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.033 4H4a1.78 1.78 0 0 0-1.778 1.778v8.889A1.78 1.78 0 0 0 4 16.445h12.444a1.78 1.78 0 0 0 1.778-1.778V7.189L15.033 4zm-1.255 4.444V4.888l3.556 3.556h-3.556z"></path><path d="M20 18.222H6.667V20H20a1.78 1.78 0 0 0 1.778-1.778V6.666H20v11.556z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'files-compare',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19.012 4.5h-6.178v15h7.5a1.67 1.67 0 0 0 1.667-1.667V7.488L19.013 4.5zM17 9.5V5.333L21.167 9.5H17z"></path><path d="M11.167 4.5H4.989L2.001 7.488v10.345A1.67 1.67 0 0 0 3.668 19.5h7.5v-15zM7 9.5H2.833L7 5.333V9.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'files-coding',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.013 2H5.637a1.819 1.819 0 0 0-1.818 1.818v16.364c0 1.004.815 1.818 1.818 1.818h12.727a1.819 1.819 0 0 0 1.818-1.818V6.169L16.013 2zm-5.188 14.815L9.54 18.1l-3.37-3.37 3.37-3.37 1.285 1.285L8.74 14.73l2.085 2.085zm3.636 1.285l-1.285-1.285 2.085-2.085-2.085-2.085 1.285-1.285 3.37 3.37-3.37 3.37zm.266-10.645V2.91l4.545 4.545h-4.545z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'files-2',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.5 2h-5a1.67 1.67 0 0 0-1.667 1.667V9.5c0 .919.747 1.667 1.667 1.667h5c.919 0 1.667-.747 1.667-1.667V3.667A1.67 1.67 0 0 0 9.5 2zm-5 3.333h3.333v.833H4.5v-.833zm5 3.334h-5v-.833h5v.833z"></path><path d="M19.5 2h-5a1.67 1.67 0 0 0-1.667 1.667V9.5c0 .919.747 1.667 1.667 1.667h5c.919 0 1.667-.747 1.667-1.667V3.667A1.67 1.67 0 0 0 19.5 2zm-5 3.333h3.333v.833H14.5v-.833zm5 3.334h-5v-.833h5v.833z"></path><path d="M9.5 12.833h-5A1.67 1.67 0 0 0 2.833 14.5v5.833C2.833 21.252 3.58 22 4.5 22h5c.919 0 1.667-.747 1.667-1.667V14.5A1.67 1.67 0 0 0 9.5 12.833zm-5 3.334h3.333V17H4.5v-.833zm5 3.333h-5v-.833h5v.833z"></path><path d="M19.5 12.833h-5a1.67 1.67 0 0 0-1.667 1.667v5.833c0 .919.747 1.667 1.667 1.667h5c.919 0 1.667-.747 1.667-1.667V14.5a1.67 1.67 0 0 0-1.667-1.667zm-5 3.334h3.333V17H14.5v-.833zm5 3.333h-5v-.833h5v.833z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M14.853 3H6.975c-.994 0-2.019.966-2.019 1.956v14.056c0 .994.994 1.987 1.987 1.987h10.238a1.8 1.8 0 0 0 1.8-1.8V7.127l-4.128-4.128zm-1.272 5.4V3.9l4.5 4.5h-4.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-view',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M13.818 13.364a2.273 2.273 0 1 1-4.547 0 2.273 2.273 0 0 1 4.547 0z"></path><path d="M16.013 2H5.637a1.82 1.82 0 0 0-1.818 1.818v16.364A1.82 1.82 0 0 0 5.637 22h12.727a1.82 1.82 0 0 0 1.818-1.818V6.169L16.013 2zm.326 16.156c-.302.301-.701.466-1.125.466s-.824-.165-1.125-.465l-1.007-1.008a4.035 4.035 0 0 1-1.536.305c-2.255 0-4.091-1.835-4.091-4.091s1.835-4.091 4.091-4.091 4.091 1.835 4.091 4.091a4.06 4.06 0 0 1-.305 1.535l1.007 1.008c.62.619.62 1.629 0 2.249zM14.727 7.455V2.91l4.545 4.545h-4.545z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-video',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.013 2H5.637a1.82 1.82 0 0 0-1.818 1.818v16.364c0 1.004.815 1.818 1.818 1.818h12.727a1.82 1.82 0 0 0 1.818-1.818V6.169L16.013 2zM8.364 17.455v-7.273l7.273 3.639-7.273 3.634zm6.363-10V2.91l4.545 4.545h-4.545z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-upload2',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M4.605 18.874h14.79v2.134H4.605v-2.134zm4.219-2.134v-6.353H4.605L12 2.992l7.395 7.395h-4.219v6.353H8.823z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-upload',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.013 2H5.637a1.82 1.82 0 0 0-1.818 1.818v16.364A1.82 1.82 0 0 0 5.637 22h12.727a1.82 1.82 0 0 0 1.818-1.818V6.169L16.013 2zm-3.104 11.818v4.545h-1.818v-4.545H8.364L12 10.182l3.636 3.636h-2.727zm1.818-6.363V2.91l4.545 4.545h-4.545z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-tasks-checklist',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-7 17.414l-3.707-3.707 1.414-1.414L11 16.586l4.293-4.293 1.414 1.414L11 19.414zm0-8L7.293 7.707l1.414-1.414L11 8.586l4.293-4.293 1.414 1.414L11 11.414z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-note',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.414 2H6c-1.103 0-2 .898-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V6.586L15.414 2zM7 12h8v2H7v-2zm10 6H7v-2h10v2zM14 8V3l5 5h-5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-lock',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.909 12a.91.91 0 0 0-1.818 0v1.818h1.818V12z"></path><path d="M16.013 2H5.637a1.82 1.82 0 0 0-1.818 1.818v16.364A1.82 1.82 0 0 0 5.637 22h12.727a1.82 1.82 0 0 0 1.818-1.818V6.169L16.013 2zm-.377 16.364H8.363v-4.545h.909v-1.818c0-1.504 1.224-2.727 2.727-2.727s2.727 1.224 2.727 2.727v1.818h.909v4.545zm-.909-10.909V2.91l4.545 4.545h-4.545z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-landscape',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.414 4H4c-1.103 0-2 .898-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8.586L17.414 4zM16 10V5l5 5h-5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-landscape-new',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.414 4H4c-1.103 0-2 .898-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8.586L17.414 4zM5 10h9v2H5v-2zm13 6H5v-2h13v2zm-2-6V5l5 5h-5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-landscape-image',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.414 4H4c-1.103 0-2 .898-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8.586L17.414 4zM5 17l2.479-3.977 1.527 2.451 3.522-5.647L17 17H5zm11-7V5l5 5h-5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-graph',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.013 2H5.637a1.82 1.82 0 0 0-1.818 1.818v16.365c0 1.004.815 1.818 1.818 1.818h12.727a1.82 1.82 0 0 0 1.818-1.818V6.169L16.013 2zm1.442 17.273H6.546v-10h1.818v5.078l2.085-2.085a.908.908 0 0 1 1.285 0l2.085 2.085 2.085-2.085 1.285 1.285-2.727 2.727a.908.908 0 0 1-1.285 0l-2.085-2.085-2.727 2.727v.533h9.091v1.818zM14.727 7.455V2.91l4.545 4.545h-4.545z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-graph-2',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.013 2H5.637a1.819 1.819 0 0 0-1.818 1.818v16.365a1.82 1.82 0 0 0 1.818 1.818h12.727a1.819 1.819 0 0 0 1.818-1.818V6.169L16.013 2zm1.442 16.363l-10.909.003v-1.818l1.818-.001V8.363h1.818v8.184h.909v-3.638h1.818v3.637h.909v-5.455h1.818v5.455h1.818v1.818zM14.727 7.454V2.909l4.545 4.545h-4.545z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-favorite',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 16l1.629-7.329A4.97 4.97 0 0 1 12 5c0-1.131.39-2.162 1.022-3H6c-1.104 0-2 .898-2 2v16c0 1.103.896 2 2 2h12c1.103 0 2-.897 2-2v-4.8L17 14l-5 2z"></path><path d="M20 5a3 3 0 1 0-6 0c0 1.225.736 2.274 1.788 2.74L14 14l3-2 3 2-1.788-6.26A2.996 2.996 0 0 0 20 5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-favorite-star',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.013 2H5.637a1.82 1.82 0 0 0-1.818 1.818v16.364A1.82 1.82 0 0 0 5.637 22h12.727a1.82 1.82 0 0 0 1.818-1.818V6.169L16.013 2zm-.831 16.364L12 16.093l-3.182 2.271 1.364-3.638-2.727-1.816h3.182l1.37-3.636 1.357 3.636h3.182l-2.727 1.816 1.364 3.638zm-.455-10.909V2.91l4.545 4.545h-4.545z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-download2',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M4.605 18.874h14.79v2.134H4.605v-2.134zm14.79-9.529L12 16.74 4.605 9.345h4.219V2.992h6.353v6.353h4.219z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-download',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.013 2H5.637a1.82 1.82 0 0 0-1.818 1.818v16.364A1.82 1.82 0 0 0 5.637 22h12.727a1.82 1.82 0 0 0 1.818-1.818V6.169L16.013 2zM12 18.364l-3.636-3.636h2.727v-4.545h1.818v4.545h2.727L12 18.364zm2.727-10.909V2.91l4.545 4.545h-4.545z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-bookmark',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.414 2H6c-1.103 0-2 .898-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V6.586L15.414 2zM10 13l-2-2-2 2V4h4v9zm4-5V3l5 5h-5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'file-audio',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.013 2H5.637a1.82 1.82 0 0 0-1.818 1.818v16.364A1.82 1.82 0 0 0 5.637 22h12.727a1.82 1.82 0 0 0 1.818-1.818V6.169L16.013 2zm-.711 10.239l-2.393-.798v5.556a2.273 2.273 0 1 1-1.818-2.227V8.916l4.786 1.595-.575 1.726zm-.575-4.784V2.91l4.545 4.545h-4.545z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'feedback-warning',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M13.009 13.987V8.934h-1.956v5.053h1.956zm0 4.016v-1.962h-1.956v1.962h1.956zM2.988 20.962L12.016 3l9.025 17.962H2.988z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'feedback-stop',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3s.58-1.3 1.3-1.3c.72 0 1.3.58 1.3 1.3s-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'feedback-remove',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'feedback-error',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31A7.902 7.902 0 0 1 12 20zm6.31-3.1L7.1 5.69A7.902 7.902 0 0 1 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'feedback-attention',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.984 13.922V6.984h-1.969v6.938h1.969zm0 4.031v-2.016h-1.969v2.016h1.969zM12 2.016c5.531 0 9.984 4.453 9.984 9.984S17.531 21.984 12 21.984 2.016 17.531 2.016 12 6.469 2.016 12 2.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'favorite',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 20.164l-1.295-1.169c-4.594-4.176-7.6-6.89-7.6-10.273 0-2.756 2.13-4.886 4.886-4.886 1.545 0 3.048.752 4.009 1.879.96-1.128 2.464-1.879 4.009-1.879 2.756 0 4.886 2.13 4.886 4.886 0 3.383-3.007 6.139-7.6 10.315z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'favorite-o',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.084 17.7c4.26-3.842 7.057-6.389 7.057-8.978 0-1.796-1.336-3.09-3.132-3.09-1.378 0-2.714.877-3.174 2.088h-1.67c-.459-1.211-1.796-2.088-3.174-2.088-1.796 0-3.132 1.295-3.132 3.09 0 2.589 2.798 5.136 7.057 8.978l.084.084zm3.925-13.864c2.756 0 4.886 2.13 4.886 4.886 0 3.383-3.007 6.097-7.6 10.273L12 20.164l-1.295-1.128c-4.594-4.176-7.6-6.932-7.6-10.315 0-2.756 2.13-4.886 4.886-4.886 1.545 0 3.048.752 4.009 1.879.96-1.128 2.464-1.879 4.009-1.879z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'fast-rewind',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.234 12l8.531-6v12zm-.468 6l-8.531-6 8.531-6v12z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'fast-forward',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.234 6l8.531 6-8.531 6V6zm-9 12V6l8.531 6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'eye',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3.428 12c1.059-1.641 2.512-3.047 4.253-3.941A4.952 4.952 0 0 0 7 10.571c0 2.756 2.244 5 5 5s5-2.244 5-5a4.96 4.96 0 0 0-.681-2.512c1.741.894 3.191 2.3 4.253 3.941-1.909 2.947-4.991 5-8.572 5s-6.663-2.053-8.572-5zm8.038-4.284c0-.291.247-.534.534-.534a3.407 3.407 0 0 1 3.394 3.394.542.542 0 0 1-.534.534.542.542 0 0 1-.534-.534 2.335 2.335 0 0 0-2.322-2.322.547.547 0 0 1-.537-.537zM2 12c0 .278.091.534.225.769C4.278 16.15 8.038 18.428 12 18.428s7.725-2.288 9.775-5.659c.134-.234.225-.491.225-.769s-.091-.534-.225-.769C19.722 7.859 15.962 5.572 12 5.572S4.275 7.86 2.225 11.231A1.544 1.544 0 0 0 2 12z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'eye-slash',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.805 16.184l-.871-1.574a4.996 4.996 0 0 0 2.065-4.04c0-.881-.234-1.752-.681-2.511 1.741.893 3.192 2.299 4.252 3.94-1.161 1.797-2.801 3.304-4.766 4.185zm-4.341-8.47c0-.29.246-.536.536-.536a3.406 3.406 0 0 1 3.393 3.393c0 .29-.246.536-.536.536s-.536-.246-.536-.536A2.326 2.326 0 0 0 12 8.25a.544.544 0 0 1-.536-.536zM7.412 5.582c0 .022 0 .078.011.101 2.355 4.208 4.688 8.438 7.042 12.645l.547.994c.067.111.19.179.313.179.201 0 1.261-.647 1.496-.781a.359.359 0 0 0 .179-.313c0-.179-.379-.781-.491-.971 2.165-.982 3.984-2.656 5.268-4.665a1.432 1.432 0 0 0 0-1.54c-2.21-3.393-5.659-5.659-9.776-5.659-.67 0-1.351.067-2.009.19l-.603-1.083a.359.359 0 0 0-.313-.179c-.201 0-1.25.647-1.484.781a.354.354 0 0 0-.179.301zM7 10.571a4.993 4.993 0 0 0 3.214 4.665L7.089 9.633a5.318 5.318 0 0 0-.089.938zm-5 1.428c0 .29.078.524.224.77.346.569.781 1.116 1.216 1.619 2.188 2.511 5.201 4.04 8.56 4.04l-.826-1.474c-3.248-.279-6.004-2.254-7.746-4.955a11.585 11.585 0 0 1 3.147-3.281l-.703-1.25c-1.384.926-2.779 2.321-3.649 3.761-.145.246-.224.48-.224.77z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'eye-show',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4z"></path><path d="M21.31 10.73C19.37 9.16 16.12 6.88 12 6.8c-4.09.08-7.34 2.36-9.27 3.93-.384.275-.652.69-.729 1.17L2 11.91c.01.403.198.761.488.998l.002.002c1.58 1.53 5 4.24 9.52 4.26 4.51 0 7.94-2.73 9.52-4.26.293-.238.482-.596.49-.999v-.001a1.789 1.789 0 0 0-.705-1.177l-.005-.003zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'eye-hide',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 16h-.007a4 4 0 0 1-3.867-5.028L8.12 11l-2.4-2.4a22.152 22.152 0 0 0-3.037 2.11l.037-.03a1.781 1.781 0 0 0-.719 1.221L2 11.91c.01.403.198.761.488.998l.002.002c1.58 1.53 5 4.24 9.52 4.26a11.423 11.423 0 0 0 2.072-.212l-.072.012L13 15.89c-.28.07-.602.111-.934.111l-.07-.001h.003z"></path><path d="M22 11.91a1.784 1.784 0 0 0-.734-1.176l-.006-.004C19.37 9.16 16.12 6.88 12 6.8a11.965 11.965 0 0 0-3.823.727L8.26 7.5l1.33 1.33a4 4 0 0 1 5.593 5.61l.007-.01 1.7 1.7a16.544 16.544 0 0 0 4.674-3.184l-.004.004c.271-.243.441-.594.441-.985L22 11.907v.003z"></path><path d="M10 12a2 2 0 0 0 2 2c.155-.005.302-.026.444-.063l-.014.003-2.4-2.4a1.915 1.915 0 0 0-.03.465V12z"></path><path d="M14 12a2 2 0 0 0-2-2 1.988 1.988 0 0 0-1.009.295L11 10.29 13.75 13a1.98 1.98 0 0 0 .25-.969v-.033V12z"></path><path d="M8.14 11.06L13 15.89a3.91 3.91 0 0 0 .666-.22l-.026.01-5.29-5.27a3.89 3.89 0 0 0-.205.623l-.005.027z"></path><path d="M4.56 6.63l.28-.28-.44-.44-.71.71 2 2 .55-.3z"></path><path d="M14.08 17l3.1 3.1.43-.43-2.83-2.83z"></path><path d="M13.62 15.68a3.67 3.67 0 0 1-.613.204l-.027.006 1.1 1.11.7-.15z"></path><path d="M8.35 10.41L6.29 8.35l-.55.3 2.4 2.4a3.91 3.91 0 0 1 .22-.666l-.01.026z"></path><path d="M6.29 8.35l.37-.19-1.82-1.82-.28.28z"></path><path d="M8.35 10.41l5.27 5.27c.145-.071.262-.138.376-.21l-.016.01L8.55 10c-.064.11-.131.245-.19.384l-.01.026z"></path><path d="M15.23 16.73l-.45.12 2.83 2.83.28-.28z"></path><path d="M6.66 8.16l-.37.19 2.06 2.06c.071-.149.137-.27.21-.387l-.01.017z"></path><path d="M14.78 16.85l.45-.12L14 15.48a3.938 3.938 0 0 1-.337.19l-.023.01z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'exit-to-app',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.984 3C20.062 3 21 3.938 21 5.016v13.969c0 1.078-.938 2.016-2.016 2.016H5.015c-1.125 0-2.016-.938-2.016-2.016v-3.984h2.016v3.984h13.969V5.016H5.015V9H2.999V5.016C2.999 3.938 3.89 3 5.015 3h13.969zm-8.906 12.609l2.578-2.625H3v-1.969h9.656L10.078 8.39l1.406-1.406L16.5 12l-5.016 5.016z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'equalizer',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.984 9h4.031v11.016h-4.031V9zm-12 11.016V12h4.031v8.016H3.984zm6 0V3.985h4.031v16.031H9.984z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'enlarge2',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M22 2v8.125L18.875 7l-3.75 3.75-1.875-1.875L17 5.125 13.875 2zM10.75 15.125L7 18.875 10.125 22H2v-8.125L5.125 17l3.75-3.75z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'enlarge',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2 2v8.125L5.125 7l3.75 3.75 1.875-1.875L7 5.125 10.125 2z"></path><path d="M22 2h-8.125L17 5.125l-3.75 3.75 1.875 1.875L18.875 7 22 10.125z"></path><path d="M22 22v-8.125L18.875 17l-3.75-3.75-1.875 1.875 3.75 3.75L13.875 22z"></path><path d="M2 22h8.125L7 18.875l3.75-3.75-1.875-1.875L5.125 17 2 13.875z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'email-open',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 12.984l8.25-5.156L12 3 3.75 7.828zm9.984-4.968V18c0 1.078-.891 2.016-1.969 2.016H3.984c-1.078 0-1.969-.938-1.969-2.016V8.016c0-.703.375-1.406.938-1.734L12 .985l9.047 5.297c.563.328.938 1.031.938 1.734z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'email-closed',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20.016 8.016V6L12 11.016 3.984 6v2.016L12 12.985zm0-4.032c1.078 0 1.969.938 1.969 2.016v12c0 1.078-.891 2.016-1.969 2.016H3.985c-1.078 0-1.969-.938-1.969-2.016V6c0-1.078.891-2.016 1.969-2.016h16.031z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'email-at',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path opacity=".9" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'eject',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 5.016L18.656 15H5.343zm-6.984 12h13.969v1.969H5.016v-1.969z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Education',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M5.778 13.049v3.556L12 20.001l6.222-3.396v-3.556L12 16.445l-6.222-3.396zM12 4L2.222 9.333 12 14.666l8-4.364v6.142h1.778V9.333L12 4z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'edit',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20.624 7.105l-1.818 1.818-3.73-3.73 1.818-1.818a1.014 1.014 0 0 1 1.399 0l2.331 2.331a1.014 1.014 0 0 1 0 1.399zM3.003 17.268L14.005 6.266l3.73 3.73L6.733 20.998h-3.73v-3.73z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'drag-handle-vertical',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9 3.984h2.016v16.031H9V3.984zm6 16.032h-2.016V3.985H15v16.031z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'drag-handle-horizontal',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3.984 15v-2.016h16.031V15H3.984zm16.032-6v2.016H3.985V9h16.031z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'dollar-circle',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 2C6.486 2 2 6.486 2 12c0 5.515 4.486 10 10 10 5.515 0 10-4.485 10-10 0-5.514-4.485-10-10-10zm3 8h-3.5a.5.5 0 0 0 0 1h1c1.379 0 2.5 1.122 2.5 2.5 0 1.208-.86 2.217-2 2.449V17h-2v-1H9v-2h3.5a.5.5 0 0 0 0-1h-1A2.503 2.503 0 0 1 9 10.5c0-1.207.86-2.217 2-2.449V7h2v1h2v2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'desktop',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 4H4c-.978 0-1.778.8-1.778 1.778v10.667c0 .978.8 1.778 1.778 1.778h4.444v1.778h7.111v-1.778h4.444c.978 0 1.769-.8 1.769-1.778l.009-10.667c0-.978-.8-1.778-1.778-1.778zm0 12.444H4V5.777h16v10.667z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'dashboard',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.984 3H21v6h-8.016V3zm0 18v-9.984H21V21h-8.016zM3 21v-6h8.016v6H3zm0-8.016V3h8.016v9.984H3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'cut',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.984 3h3v.984L15 11.015l-2.016-2.016zM12 12.516c.281 0 .516-.234.516-.516s-.234-.516-.516-.516-.516.234-.516.516.234.516.516.516zm-6 7.5c1.078 0 2.016-.891 2.016-2.016S7.078 15.984 6 15.984 3.984 16.875 3.984 18 4.922 20.016 6 20.016zm0-12c1.078 0 2.016-.891 2.016-2.016S7.078 3.984 6 3.984 3.984 4.875 3.984 6 4.922 8.016 6 8.016zm3.656-.375l12.328 12.375V21h-3L12 14.016 9.656 16.36c.234.516.328 1.031.328 1.641 0 2.203-1.781 3.984-3.984 3.984s-3.984-1.781-3.984-3.984S3.797 14.017 6 14.017c.609 0 1.125.094 1.641.328l2.344-2.344-2.344-2.344c-.516.234-1.031.328-1.641.328-2.203 0-3.984-1.781-3.984-3.984S3.797 2.017 6 2.017s3.984 1.781 3.984 3.984c0 .609-.094 1.125-.328 1.641z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'cursor',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12.431 13.034l3.319 7.716-2.5 1.25-2.904-7.924L5.75 18.25V2l12.5 10-5.819 1.034z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'cursor-target',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M23 11h-3.069A8.01 8.01 0 0 0 13 4.069V1h-2v3.069A8.01 8.01 0 0 0 4.069 11H1v2h3.069A8.007 8.007 0 0 0 11 19.931V23h2v-3.069A8.01 8.01 0 0 0 19.931 13H23v-2zm-10 6.91V14h-2v3.91A6.008 6.008 0 0 1 6.09 13H10v-2H6.09A6.008 6.008 0 0 1 11 6.09V10h2V6.09A6.007 6.007 0 0 1 17.91 11H14v2h3.91A6.008 6.008 0 0 1 13 17.91z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'credit-card',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2 19c0 1.103.896 2 2 2h16c1.103 0 2-.897 2-2v-8H2v8zm13-6h4v2h-4v-2zM5 13h7v2H5v-2zm0 3h5v2H5v-2z"></path><path d="M20 5H4c-1.104 0-2 .898-2 2v2h20V7c0-1.102-.897-2-2-2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'credit-card-lock',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18.668 3.667c0-.92-.747-1.667-1.667-1.667H3.668c-.92 0-1.667.747-1.667 1.667v1.667h16.667V3.667z"></path><path d="M14.841 10.333h-2.007V8.666h3.333v1.078a5.844 5.844 0 0 1 1.667-.245c.283 0 .561.027.833.067V6.999H2v6.667c0 .919.747 1.667 1.667 1.667H12a5.825 5.825 0 0 1 2.84-5zm-6.174 2.5H4.5v-1.667h4.167v1.667zm1.667-2.5H4.501V8.666h5.833v1.667z"></path><path d="M21.167 14.5c0-1.837-1.495-3.333-3.333-3.333s-3.333 1.496-3.333 3.333a.832.832 0 0 0-.833.833v5.833c0 .461.372.833.833.833h6.667a.832.832 0 0 0 .833-.833v-5.833a.832.832 0 0 0-.833-.833zm-3.334-1.667A1.67 1.67 0 0 1 19.5 14.5h-3.333a1.67 1.67 0 0 1 1.667-1.667zm2.5 7.5h-5v-4.167h5v4.167z"></path><path d="M18.668 17.833a.833.833 0 1 1-1.666 0 .833.833 0 0 1 1.666 0z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'copyright',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 20.016c4.406 0 8.016-3.609 8.016-8.016S16.407 3.984 12 3.984 3.984 7.593 3.984 12 7.593 20.016 12 20.016zm0-18c5.531 0 9.984 4.453 9.984 9.984S17.531 21.984 12 21.984 2.016 17.531 2.016 12 6.469 2.016 12 2.016zm-.141 7.125c-1.442 0-1.875 1.276-1.875 2.719v.281c0 1.442.434 2.719 1.875 2.719.88 0 1.641-.537 1.641-1.406h1.781c0 .915-.495 1.603-1.031 2.063-.604.518-1.308.844-2.391.844-2.559 0-3.844-1.691-3.844-4.219v-.281c0-1.212.34-2.318.938-3 .619-.707 1.61-1.266 2.906-1.266 1.038 0 1.904.358 2.438.891.516.516.984 1.312.984 2.297H13.5c0-.234-.047-.422-.141-.609s-.188-.422-.328-.563a1.706 1.706 0 0 0-1.172-.469z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'context-section',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M10.5 15l-2.25-3-1.734 2.25-1.266-1.5L3.516 15H10.5zM12 9v6c0 1.078-.938 2.016-2.016 2.016h-6c-1.078 0-1.969-.938-1.969-2.016V9c0-1.078.891-2.016 1.969-2.016h6C11.062 6.984 12 7.922 12 9zm2.016 8.016V15h7.969v2.016h-7.969zm7.968-10.032V9h-7.969V6.984h7.969zm0 6h-7.969v-1.969h7.969v1.969z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'content-briefcase',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20.063 6.975h-4.062v-3a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v3H3.939c-1.094 0-1.938.712-1.938 2.031v10.031c0 1.181.844 1.938 2 1.938h16.031c1.188 0 1.969-.756 1.969-1.938v-10c0-1.194-.594-2.063-1.938-2.063zM10 5.037h4v1.938h-4V5.037zM21.006 12.5h-7.994v1.531h-2.044V12.5h-8v-1.313h18.038V12.5z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'content-box',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20 3.5H4c-1.104 0-2 .898-2 2v3h20v-3c0-1.103-.897-2-2-2z"></path><path d="M3 9.5v9c0 1.103.896 2 2 2h14c1.103 0 2-.897 2-2v-9H3zm12 4H9v-2h6v2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'content-box-filled',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M4 10h16v2H4v-2z"></path><path d="M4 7h16v2H4V7z"></path><path d="M4 4h16v2H4V4z"></path><path d="M10 13h4v2h-4v-2z"></path><path d="M20 13h-4a1 1 0 0 0-1 1v2H9v-2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4c0 1.103.896 2 2 2h14c1.103 0 2-.897 2-2v-4a1 1 0 0 0-1-1z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'content-box-alt',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M10 4.975h6v2h-6v-2z"></path><path d="M8 7.975h8v2H8v-2z"></path><path d="M8 10.975h8v2H8v-2z"></path><path d="M20 13.975h-1v-11a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v11H4a1 1 0 0 0-1 1v5c0 1.103.896 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0-1-1zm-13-10h10v10h-1a1 1 0 0 0-1 1v1H9v-1a1 1 0 0 0-1-1H7v-10z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'compass',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM3.875 12a8.125 8.125 0 0 1 13.663-5.945L9.5 9.5l-3.445 8.038A8.092 8.092 0 0 1 3.875 12zm9.554 1.429l-5.002 2.144 2.144-5.002 2.858 2.858zM12 20.125a8.096 8.096 0 0 1-5.537-2.18l8.038-3.445 3.445-8.038a8.125 8.125 0 0 1-5.945 13.662z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'coins',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M8.25 14.5h.833c.115 0 .225.016.334.035a8.489 8.489 0 0 1-.739-.868H8.25a.418.418 0 0 0 0 .834z"></path><path d="M11.167 16.583A2.085 2.085 0 0 1 9.5 18.624v.876H7.833v-.833H6.166V17h2.917a.417.417 0 0 0 0-.834H8.25a2.085 2.085 0 0 1-2.083-2.083 2.08 2.08 0 0 1 1.567-2.01 8.291 8.291 0 0 1-.722-3.192C4.133 9.619 2 12.224 2 15.333A6.667 6.667 0 0 0 8.667 22c3.109 0 5.713-2.132 6.451-5.011a8.268 8.268 0 0 1-4.114-1.212c.106.249.163.52.163.806z"></path><path d="M15.333 2a6.667 6.667 0 1 0 0 13.334 6.667 6.667 0 0 0 0-13.334zm2.5 5h-2.917a.418.418 0 0 0 0 .834h.833c1.149 0 2.083.935 2.083 2.083a2.085 2.085 0 0 1-1.667 2.041v.876h-1.667v-.833h-1.667v-1.667h2.917a.417.417 0 0 0 0-.834h-.833a2.085 2.085 0 0 1-2.083-2.083c0-1.006.717-1.848 1.667-2.041V4.5h1.667v.833h1.667V7z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'coin-receive',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M20.364 15.047a.8.8 0 0 0-.915-.42l-6.147 1.536-1.954-.978.82-.82a.806.806 0 0 0 0-1.139l-.805-.805a.804.804 0 0 0-.867-.179l-3.724 1.491v5.702l6.336.792a.88.88 0 0 0 .355-.035l7.241-2.414c.221-.073.4-.241.488-.455s.08-.46-.023-.669l-.805-1.609z"></path><path d="M5.162 12.993H3.553a.806.806 0 0 0-.805.805v5.632c0 .445.36.805.805.805h1.609c.445 0 .805-.36.805-.805v-5.632a.806.806 0 0 0-.805-.805z"></path><path d="M16.275 6.179h2.816V4.57h-1.609v-.805h-1.609v.845a2.014 2.014 0 0 0-1.609 1.971c0 1.109.903 2.011 2.011 2.011h.805c.221 0 .402.181.402.402s-.181.402-.402.402h-2.816v1.609h1.609v.805h1.609v-.845a2.014 2.014 0 0 0 1.609-1.971 2.014 2.014 0 0 0-2.011-2.011h-.805c-.221 0-.402-.181-.402-.402s.181-.402.402-.402z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 30,
        'height': 24,
        'tags': '',
        'name': 'code',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24"><g class="fk-icon-wrapper"><path d="M18.703 16.32l1.851 1.851 6.172-6.172-6.172-6.172-1.851 1.851 4.32 4.32z"></path><path d="M11.297 7.68L9.446 5.829l-6.172 6.172 6.172 6.172 1.851-1.851-4.32-4.32z"></path><path d="M16.182 5.028l1.34.365-3.703 13.578-1.34-.365 3.703-13.578z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'cloud',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M17.982 10.4c2.096.152 3.772 1.905 3.772 4.039a4.082 4.082 0 0 1-4.077 4.077H7.122a4.862 4.862 0 0 1-4.877-4.877A4.872 4.872 0 0 1 6.589 8.8C7.618 6.857 9.637 5.485 12 5.485c2.972 0 5.411 2.096 5.982 4.915z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'cloud-upload',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M13.638 12.8h2.439L12 8.761 7.923 12.8h2.439v3.277h3.277V12.8zm4.344-2.4c2.096.152 3.772 1.905 3.772 4.039a4.082 4.082 0 0 1-4.077 4.077H7.122a4.862 4.862 0 0 1-4.877-4.877A4.872 4.872 0 0 1 6.589 8.8C7.618 6.857 9.637 5.485 12 5.485c2.972 0 5.411 2.096 5.982 4.915z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'cloud-download',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.077 12.8h-2.439V9.561h-3.277V12.8H7.922l4.077 4.077zm1.905-2.4c2.096.152 3.772 1.905 3.772 4.039a4.082 4.082 0 0 1-4.077 4.077H7.122a4.862 4.862 0 0 1-4.877-4.877A4.872 4.872 0 0 1 6.589 8.8C7.618 6.857 9.637 5.485 12 5.485c2.972 0 5.411 2.096 5.982 4.915z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'cloud-done',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M10.362 16.077l5.373-5.373-1.143-1.143-4.229 4.191-1.677-1.677-1.143 1.143zm7.62-5.677c2.096.152 3.772 1.905 3.772 4.039a4.082 4.082 0 0 1-4.077 4.077H7.122a4.862 4.862 0 0 1-4.877-4.877A4.872 4.872 0 0 1 6.589 8.8C7.618 6.857 9.637 5.485 12 5.485c2.972 0 5.411 2.096 5.982 4.915z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'Closed-caption',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'close',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M3.207 5.435L5.37 3.272 19.788 17.69l-2.163 2.163L3.207 5.435z"></path><path d="M3.219 17.697L17.634 3.292l2.141 2.142L5.36 19.839l-2.141-2.142z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'clock',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'circle-filled',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19.323 12c0 4.022-3.263 7.284-7.284 7.284S4.755 16.021 4.755 12s3.263-7.284 7.284-7.284S19.323 7.979 19.323 12z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'chevron-up',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2 15.92l2 2 8-8 8 8 2-2-10-10-10 10z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'chevron-right',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M8.08 2l-2 2 8 8-8 8 2 2 10-10-10-10z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'chevron-left',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15.92 22l2-2-8-8 8-8-2-2-10 10 10 10z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'chevron-down',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M22 8.08l-2-2-8 8-8-8-2 2 10 10 10-10z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 21,
        'height': 24,
        'tags': '',
        'name': 'chevron-circle-up',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24"><g class="fk-icon-wrapper"><path d="M14.784 14.621l1.1-1.1a.683.683 0 0 0 0-.971l-4.898-4.898a.683.683 0 0 0-.971 0L5.117 12.55a.683.683 0 0 0 0 .971l1.1 1.1c.27.27.702.27.971 0l3.312-3.312 3.312 3.312c.27.27.702.27.971 0zM18.786 12c0 4.575-3.711 8.286-8.286 8.286S2.214 16.575 2.214 12 5.925 3.714 10.5 3.714 18.786 7.425 18.786 12z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 21,
        'height': 24,
        'tags': '',
        'name': 'chevron-circle-right',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24"><g class="fk-icon-wrapper"><path d="M9.951 17.384l4.898-4.898a.683.683 0 0 0 0-.971L9.951 6.617a.683.683 0 0 0-.971 0l-1.1 1.1a.683.683 0 0 0 0 .971L11.192 12 7.88 15.312a.683.683 0 0 0 0 .971l1.1 1.1c.27.27.702.27.971 0zM18.786 12c0 4.575-3.711 8.286-8.286 8.286S2.214 16.575 2.214 12 5.925 3.714 10.5 3.714 18.786 7.425 18.786 12z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 21,
        'height': 24,
        'tags': '',
        'name': 'chevron-circle-left',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24"><g class="fk-icon-wrapper"><path d="M12.022 17.384l1.1-1.1a.683.683 0 0 0 0-.971L9.81 12.001l3.312-3.312a.683.683 0 0 0 0-.971l-1.1-1.1a.683.683 0 0 0-.971 0l-4.898 4.898a.683.683 0 0 0 0 .971l4.898 4.898c.27.27.702.27.971 0zM18.786 12c0 4.575-3.711 8.286-8.286 8.286S2.214 16.575 2.214 12 5.925 3.714 10.5 3.714 18.786 7.425 18.786 12z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 21,
        'height': 24,
        'tags': '',
        'name': 'chevron-circle-down',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24"><g class="fk-icon-wrapper"><path d="M10.986 16.348l4.898-4.898a.683.683 0 0 0 0-.971l-1.1-1.1a.683.683 0 0 0-.971 0l-3.312 3.312-3.312-3.312a.683.683 0 0 0-.971 0l-1.1 1.1a.683.683 0 0 0 0 .971l4.898 4.898c.27.27.702.27.971 0zm7.8-4.348c0 4.575-3.711 8.286-8.286 8.286S2.214 16.575 2.214 12 5.925 3.714 10.5 3.714 18.786 7.425 18.786 12z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'checkmark',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M21.748 6.398l-1.601-1.601a.754.754 0 0 0-1.067 0l-9.596 9.596-4.565-4.597a.754.754 0 0 0-1.067 0l-1.6 1.601a.754.754 0 0 0 0 1.067l6.693 6.738a.754.754 0 0 0 1.067 0L21.748 7.465a.754.754 0 0 0 0-1.067z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'checkmark-0',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9.738 20.008l-7.854-7.731 3.897-3.835 3.957 3.896 8.481-8.347 3.897 3.835L9.739 20.008zm-5.715-7.729l5.715 5.625L19.977 7.827l-1.758-1.73-8.481 8.347-3.957-3.896-1.757 1.73z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'chat',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19 3H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1.7v6l6-6H19a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'chat-conversation',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M10.74 13.18a4 4 0 0 1-4-4v-.45H5a2 2 0 0 0-2 2v4.17a2 2 0 0 0 2 2h.51V21l4.09-4.09h3.65a2 2 0 0 0 2-2l-1.71-1.71z"></path><path d="M15.27 10.74v1.31l3.21 3.21v-4.08H19a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-8.26a2 2 0 0 0-2 2v3.73H13.27a2 2 0 0 1 2 2v.011-.001z"></path><path d="M10.74 11.18h3.65l.88.88v-1.32a2 2 0 0 0-2-2H8.73v.44a2 2 0 0 0 2 2h.011-.001z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'cast',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2.208 10.208C7.583 10.208 12 14.583 12 20h-1.792c0-4.417-3.583-8-8-8v-1.792zm0 3.584c3.458 0 6.25 2.75 6.25 6.208H6.666c0-2.458-2-4.458-4.458-4.458v-1.75zm0 3.541A2.686 2.686 0 0 1 4.875 20H2.208v-2.667zM20 4c.958 0 1.792.833 1.792 1.792v12.417c0 .958-.833 1.792-1.792 1.792h-6.208v-1.792H20V5.792H4v2.667H2.208V5.792C2.208 4.834 3.041 4 4 4h16z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'caret-up',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M18 15H6l6-6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'caret-right',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M9 18V6l6 6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'caret-left',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15 6v12l-6-6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'caret-down',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M6 9h12l-6 6z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'calendar',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19 5h-1V3.05h-3V5H9V3.05H5.95V5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-2.94-1h1v2.86h-1zM7 4h1v2.86H7zm12 15H5V9h14z"></path><path d="M6.95 10.94h2.06V13H6.95v-2.06z"></path><path d="M11 10.94h2.06V13H11v-2.06z"></path><path d="M14.97 10.94h2.06V13h-2.06v-2.06z"></path><path d="M6.95 14.97h2.06v2.06H6.95v-2.06z"></path><path d="M11 14.97h2.06v2.06H11v-2.06z"></path><path d="M14.97 14.97h2.06v2.06h-2.06v-2.06z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'calendar-remove',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19 5h-1V3.05h-3V5H9V3.05H5.95V5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-2.94-1h1v2.86h-1zM7 4h1v2.86H7zm12 15H5V9h14z"></path><path d="M8.85 13H15v1.89H8.85V13z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'calendar-note',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19 5h-1V3.05h-3V5H9V3.05H5.95V5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-2.94-1h1v2.86h-1zM7 4h1v2.86H7zm12 15H5V9h14z"></path><path d="M7.03 11.03h9.98v2H7.03v-2z"></path><path d="M7.03 15.09H12v2H7.03v-2z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'calendar-delete',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19 5h-1V3.05h-3V5H9V3.05H5.95V5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-2.94-1h1v2.86h-1zM7 4h1v2.86H7zm12 15H5V9h14z"></path><path d="M10.26 16.94l1.66-1.66 1.67 1.67 1.45-1.45-1.67-1.67 1.58-1.58-1.33-1.33-1.58 1.57-1.59-1.59L9 12.35l1.59 1.6-1.66 1.66 1.33 1.33z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'calendar-check',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M16.559 11.716l-6 5.95-3.15-3.178 1.081-1.081 2.109 2.109 4.869-4.859z"></path><path d="M19 5h-1V3.05h-3V5H9V3.05H5.95V5H5c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-2.941-1h1v2.859h-1V4zM7 4h1v2.859H7V4zm12 15H5V9h14v10z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'calendar-blank',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19 5h-1V3.05h-3V5H9V3.05H5.95V5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-2.94-1h1v2.86h-1zM7 4h1v2.86H7zm12 15H5V9h14z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'calendar-add',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M19 5h-1V3.05h-3V5H9V3.05H5.95V5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-2.94-1h1v2.86h-1zM7 4h1v2.86H7zm12 15H5V9h14z"></path><path d="M10.87 16.93h2.06v-2.04H15V13h-2.07v-2.06h-2.06V13H8.85v1.89h2.02v2.04z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'calculator',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M14 5h2v2h-2V5z"></path><path d="M17 2H7c-1.103 0-2 .898-2 2v16c0 1.103.897 2 2 2h10c1.104 0 2-.897 2-2V4c0-1.102-.896-2-2-2zM8 19a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm.999-5H7V4h10l-.001 4z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'business-graph-pie',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M22.002 11c0-4.961-4.037-9-9-9h-1v10h10v-1z"></path><path d="M10 13.001V4.062l-.124.016A9.006 9.006 0 0 0 2 13c0 4.963 4.037 9 9 9a8.99 8.99 0 0 0 5.775-2.101l.066-.057L10 13.001z"></path><path d="M13.587 14.001l7.069 7.071.708-.708A8.942 8.942 0 0 0 24 14.001H13.587z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'business-graph-bar',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2 20h20v2H2v-2z"></path><path d="M10 13h4v6h-4v-6z"></path><path d="M16 7h4v12h-4V7z"></path><path d="M4 11h4v8H4v-8z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'business-graph-bar-status',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M5 7c.365 0 .704-.105.999-.277l4.002 2.288A2 2 0 0 0 14 9c0-.178-.031-.346-.074-.511l4.563-4.563c.163.044.333.074.511.074a2 2 0 1 0-2-2c0 .178.031.348.074.513l-4.563 4.562A1.996 1.996 0 0 0 12 7c-.365 0-.704.105-.999.278L6.999 4.992A2 2 0 1 0 5 7z"></path><path d="M2 22h20v2H2v-2z"></path><path d="M10 15h4v6h-4v-6z"></path><path d="M16 9h4v12h-4V9z"></path><path d="M4 13h4v8H4v-8z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'business-graph-bar-increase',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2 22h20v2H2v-2z"></path><path d="M10 13h4v8h-4v-8z"></path><path d="M16 9h4v12h-4V9z"></path><path d="M4 17h4v4H4v-4z"></path><path d="M3.707 14.708L15 3.415V6h2V0h-6v2h2.586L2.293 13.293z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'business-graph-bar-decrease',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M2 22h20v2H2v-2z"></path><path d="M10 13h4v8h-4v-8z"></path><path d="M4 9h4v12H4V9z"></path><path d="M16 17h4v4h-4v-4z"></path><path d="M20 9v2.587L8.707.294 7.293 1.708 18.586 13H16v2h6V9z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'border-vertical',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15 12.984v-1.969h2.016v1.969H15zM15 21v-2.016h2.016V21H15zm0-15.984V3h2.016v2.016H15zM18.984 9V6.984H21V9h-2.016zm0-6H21v2.016h-2.016V3zm0 9.984v-1.969H21v1.969h-2.016zm0 8.016v-2.016H21V21h-2.016zm-7.968 0V3h1.969v18h-1.969zm7.968-3.984V15H21v2.016h-2.016zm-12-12V3H9v2.016H6.984zM3 17.016V15h2.016v2.016H3zM3 21v-2.016h2.016V21H3zm0-8.016v-1.969h2.016v1.969H3zm3.984 0v-1.969H9v1.969H6.984zm0 8.016v-2.016H9V21H6.984zM3 5.016V3h2.016v2.016H3zM3 9V6.984h2.016V9H3z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'border-top',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M15 12.984v-1.969h2.016v1.969H15zM18.984 21v-2.016H21V21h-2.016zM11.016 9V6.984h1.969V9h-1.969zM15 21v-2.016h2.016V21H15zm3.984-3.984V15H21v2.016h-2.016zM3 3h18v2.016H3V3zm15.984 9.984v-1.969H21v1.969h-2.016zm0-3.984V6.984H21V9h-2.016zm-7.968 8.016V15h1.969v2.016h-1.969zM3 9V6.984h2.016V9H3zm0 3.984v-1.969h2.016v1.969H3zM3 21v-2.016h2.016V21H3zm0-3.984V15h2.016v2.016H3zM11.016 21v-2.016h1.969V21h-1.969zm0-8.016v-1.969h1.969v1.969h-1.969zm-4.032 0v-1.969H9v1.969H6.984zm0 8.016v-2.016H9V21H6.984z"></path></g></svg>',
        'set_id': 1
      },
      {
        'style': 'colored',
        'width': 24,
        'height': 24,
        'tags': '',
        'name': 'border-right',
        'content': '<svg version="1.1" class="c-ucon-inject" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="fk-icon-wrapper"><path d="M11.016 9V6.984h1.969V9h-1.969zm0-3.984V3h1.969v2.016h-1.969zm0 7.968v-1.969h1.969v1.969h-1.969zM15 5.016V3h2.016v2.016H15zM15 21v-2.016h2.016V21H15zm3.984-18H21v18h-2.016V3zM15 12.984v-1.969h2.016v1.969H15zm-3.984 4.032V15h1.969v2.016h-1.969zM3 9V6.984h2.016V9H3zm0 8.016V15h2.016v2.016H3zm0-4.032v-1.969h2.016v1.969H3zM11.016 21v-2.016h1.969V21h-1.969zM3 21v-2.016h2.016V21H3zm3.984-8.016v-1.969H9v1.969H6.984zm0-7.968V3H9v2.016H6.984zM3 5.016V3h2.016v2.016H3zM6.984 21v-2.016H9V21H6.984z"></path></g></svg>',
        'set_id': 1
      }
    ],
    'sets': [],
    'groups': []
  }
//#endregion
  // console.log('Testing: '+theUcons.icons[1].name)
  uconsObjArray = theUcons.icons
  if (options.consoleMessages === true) console.info('Using: '+iconDOMElement+'['+injAttr+']'+ ' to find injectable elements...')

  // look at the icon src attribute for the svg icon name and concat
  // with surrounding text in the arrObjSVGDatas
  docEls.forEach(function (node) {
    arrObjSVGData = node;
    attyVal = arrObjSVGData.getAttribute([injAttr])
    svgId = attyVal

    // search the array for the id
    function searchIDInSVGs (svgId, uconsObjArray) {
      for (var j = 0; j < uconsObjArray.length; j++) {
        if (uconsObjArray[j].name === svgId) {
          console.log(`${uconsObjArray[j].name} = ${svgId}`)
          return j
        }
      }
      return -1
    }

    // call the function above passing the array and id needed
    svgIndex = searchIDInSVGs(svgId, uconsObjArray)
    if (svgIndex === -1) { // handle empty/incorrect value
      svgTag = '<!-- Could not find '+svgId+'} -->'
      svgTagStatus = 'failed'
    } else {
      svgTag = uconsObjArray[svgIndex].content
      svgTagStatus = 'success'
    }

    // assign values to these variables in preparation to build the svg icon
    el = document.querySelector(iconDOMElement+'['+injAttr+']');
    newEl = document.createElement('svg');
    newEl.innerHTML = svgTag;
    el.parentNode.replaceChild(newEl, el);
    newEl.setAttribute('class', arrObjSVGData.getAttribute('class'));

    // create quick report on successful injections
    injectCounter.push(svgId, svgTagStatus);
    if (options.consoleMessages == true) console.info(svgId, svgTagStatus);
  });
  // finish report globally

  for(var i = 0; i < injectCounter.length; ++i) {
    if(injectCounter[i] == 'success')
      injectCount++;
  }

  totalInjectableEls = docEls.length
  successfulInjects = injectCount
  if (options.consoleMessages == true) console.info('Successfully injected ' +successfulInjects+ ' out of '+totalInjectableEls+' requested. See injectCounter array below.');
  if (options.consoleMessages == true) console.info(JSON.stringify(injectCounter));

  // optional create a list of icons
  // check to see if gallery enabled
  window.onload = function() {
    if (initGallery == true) {
      UconGallery(theUcons);
    }
    else {
      return false;
    }
  }

  function UconGallery(uconsObjArray) {
    // Create the list element:
    list = document.getElementById(options.UconGalleryID)
    for (var i = 0; i < uconsObjArray.length; i++) {
      // Create the list item:
      divi = document.createElement('div')
      item = document.createElement('div')
      divi.className = 'bp-icon-box bp-bp'
      item.className = 'bp-icon-box__container bp-bp'
      gallerySVG = uconsObjArray[i].content
      // original line below was: new RegExp(/(id="(.*?)(\"))/g.exec(gallerySVG)[2])
      //  change due to eslint unnecessary escape character \ */
      // idRegex = new RegExp(/(id="(.*?)("))/g.exec(gallerySVG)[2])
      // svgName = gallerySVG.match(idRegex)
      svgName = uconsObjArray[i].name
      // console.log(svgName)
      // Set divi contents:
      divi.innerHTML = '<div class="bp-icon-sizer">' + gallerySVG + '</div><div class="bp-icon-box__title text-center"><span class="h4">' + svgName + '</span></div>'

      // Add it to the list:
      list.appendChild(item)
      item.appendChild(divi)
      // return list
    }

    if (options.consoleMessages === true) console.info('the ucon gallery option says' + showGallery)
  }


  if (options.consoleMessages === true) console.info(
    'Thank you for using the Ucon Icon Family. Powered by:',
    'The Fannie Mae ' + NAME,
    'Version: ' + VERSION)

  return 
  // return UconInjector

}(window, document)
module.exports = UconInjector
window.onload = UconInjector