# jQuery to JS


## Events

```javascript
// jQuery
$(document).ready(function() {
  // code
})

// Vanilla
document.addEventListener('DOMContentLoaded', function() {
  // code
})
```

```javascript
// jQuery
$('a').click(function() {
  // code…
})

// Vanilla
[].forEach.call(document.querySelectorAll('a'), function(el) {
  el.addEventListener('click', function() {
    // code…
  })
})
```

## Selectors

```javascript
// jQuery
var divs = $('div')

// Vanilla
var divs = document.querySelectorAll('div')
```

```javascript
// jQuery
var newDiv = $('<div/>')

// Vanilla
var newDiv = document.createElement('div')
```

## Attributes

```javascript
// jQuery
$('img').filter(':first').attr('alt', 'My image')

// Vanilla
document.querySelector('img').setAttribute('alt', 'My image')
```

### Classes

```javascript
// jQuery
newDiv.addClass('foo')

// Vanilla
newDiv.classList.add('foo')
```

```javascript
// jQuery
newDiv.toggleClass('foo')

// Vanilla
newDiv.classList.toggle('foo')
```

## Manipulation

```javascript
// jQuery
$('body').append($('<p/>'))

// Vanilla
document.body.appendChild(document.createElement('p'))
```

```javascript
// jQuery
var clonedElement = $('#about').clone()

// Vanilla
var clonedElement = document.getElementById('about').cloneNode(true)
```

```javascript
// jQuery
$('#wrap').empty()

// Vanilla
var wrap = document.getElementById('wrap')
while(wrap.firstChild) wrap.removeChild(wrap.firstChild)
```

## Transversing

```javascript
// jQuery
var parent = $('#about').parent()

// Vanilla
var parent = document.getElementById('about').parentNode
```

```javascript
// jQuery
if($('#wrap').is(':empty'))

// Vanilla
if(!document.getElementById('wrap').hasChildNodes())
```

```javascript
// jQuery
var nextElement = $('#wrap').next()

// Vanilla
var nextElement = document.getElementById('wrap').nextSibling
```

## AJAX

### GET
```javascript
// jQuery
$.get('//example.com', function (data) {
  // code
})

// Vanilla
var httpRequest = new XMLHttpRequest()
httpRequest.onreadystatechange = function (data) {
  // code
}
httpRequest.open('GET', url)
httpRequest.send()
```

### POST
```javascript
// jQuery
$.post('//example.com', { username: username }, function (data) {
  // code
})

// Vanilla
var httpRequest = new XMLHttpRequest()
httpRequest.onreadystatechange = function (data) {
  // code
}
httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
httpRequest.open('POST', url)
httpRequest.send('username=' + encodeURIComponent(username))
```

### JSONP
```javascript
// jQuery
$.getJSON('//openexchangerates.org/latest.json?callback=?', function (data) {
  // code
})

// Vanilla
function success(data) {
  // code
}
var scr = document.createElement('script')
scr.src = '//openexchangerates.org/latest.json?callback=formatCurrency'
document.body.appendChild(scr)
```


## More

Here are a few additional references demonstrating vanilla javascript equivalents of jquery methods:

* [From jQuery to JS: A Reference](http://net.tutsplus.com/tutorials/javascript-ajax/from-jquery-to-javascript-a-reference/)

Also, see the two part series showing equivalents for ...

* [DOM & Forms](http://www.sitepoint.com/jquery-vs-raw-javascript-1-dom-forms/)

* [Events, Ajax and Utilities](http://www.sitepoint.com/jquery-vs-raw-          javascript-3-events-ajax/)

### click event listenter for all a tags on page

#### jQuery
```javascript
$('a').on('click', fn);
```

#### JavaScript

 ```javascript
 [].forEach.call( document.querySelectorAll('a'), function(el) {
   el.addEventListener('click', function() {
     // anchor was clicked
  }, false);
});
```
##### Legacy JS
```javascript
var anchors = document.getElementsbyTagName('a');
addEvent(anchors, 'click', fn);
```

### Event Delegation
#### jQuery

```javascript
$('ul').on('click', 'a', fn);
```

This jQuery snippet is using event delegation. The click listener is being applied to all unordered lists, however, the callback function will only fire if the target (what the user specifically clicked on) is an anchor tag.

#### Modern JavaScript

```javascript
document.addEventListener('click', function(e) {
   if ( e.target.matchesSelector('ul a') ) {
      // proceed
   }
}, false);
```

# finish this soon ------------------

#### jQuery 
```javascript
$('#list').next();
```

jQuery's next method will return the element that immediately follows the current element in the wrapped set.

#### Modern JavaScript

```javascript
var next = document.querySelector('#list').nextElementSibling; // IE9
```

nextElementSibling will refer specifically to the next element node, rather than any node (text, comment, element). Unfortunately, Internet Explorer 8 and below do not support it.

#### Legacy

```javascript
var list = document.getElementById('list'),
	next = list.nextSibling;
```

// we want the next element node...not text.
while ( next.nodeType > 1 ) next = next.nextSibling;
There's a couple ways to write this. In this example, we're detecting the nodeType of the node that follows the specified element. It could be text, element, or even a comment. As we specifically need the next element, we desire a nodeType of 1. If next.nodeType returns a number greater than 1, we should skip it and keep going, as it's probably a text node.

7 - $('<div id=box></div>').appendTo('body');
In addition to querying the DOM, jQuery also offers the ability to create and inject elements.

Modern JavaScript
var div = document.createElement('div');
div.id = 'box';
document.body.appendChild(div);
There's nothing modern about this example; it's how we've accomplished the process of creating and injecting elements into the DOM for a long, long time.

You'll likely need to add content to the element, in which case you can either use innerHTML, or createTextNode.

div.appendChild( document.createTextNode('wacka wacka') );

// or

div.innerHTML = 'wacka wacka';
8 - $(document).ready(fn)
jQuery's document.ready method is incredibly convenient. It allows us to begin executing code as soon as possible after the DOM has been loaded.

Modern JavaScript
document.addEventListener('DOMContentLoaded', function() {
   // have fun
});
Standardized as part of HTML5, the DOMContentLoaded event will fire as soon as the document has been completed parsed.

Legacy
// http://dustindiaz.com/smallest-domready-ever
function ready(cb) {
	/in/.test(document.readyState) // in = loadINg
		? setTimeout('ready('+cb+')', 9)
		: cb();
}

ready(function() {
   // grab something from the DOM
});
The fallback solution, every nine milliseconds, will detect the value of document.readyState. If "loading" is returned, the document hasn't yet been fully parsed (/in/.test(). Once it has, though, document.readyState will equal "complete," at which point the user's callback function is executed.

9 - $('.box').css('color', 'red');
If possible, always add a class to an element, when you need to provide special styling. However, sometimes, the styling will be determined dynamically, in which case it needs to be inserted as an attribute.

Modern JavaScript
[].forEach.call( document.querySelectorAll('.box'), function(el) {
  el.style.color = 'red'; // or add a class
});
Once again, we're using the [].forEach.call() technique to filter through all of the elements with a class of box, and make them red, via the style object.

Legacy
var box = document.getElementsByClassName('box'), // refer to example #10 below for a cross-browser solution
   i = box.length;
 
while ( i-- > 0 && (box[i].style.color = 'red') );
This time, we're getting a bit tricky with the while loop. Yes, it's a bit snarky, isn't it? Essentially, we're mimicking:

var i = 0, len;

for ( len = box.length; i < len; i++ ) {
   box[i].style.color = 'red';
}
However, as we only need to perform a single action, we can save a couple lines. Note that readability is far more important than saving two lines - hence my "snarky" reference. Nonetheless, it's always fun to see how condensed you can make your loops. We're developers; we do this sort of stuff for fun! Anyhow, feel free to stick with the for statement version.

10 - $()
Clearly, our intention is not to replicate the entire jQuery API. Typically, for non-jQuery projects, the $ or $$ function is used as shorthand for retrieving one or more elements from the DOM.

Modern JavaScript
var $ = function(el) {
	return document.querySelectorAll(el);
};
// Usage = $('.box');
Notice that $ is simply a one-character pointer to document.querySelector. It saves time!

Legacy
if ( !document.getElementsByClassName ) {
	document.getElementsByClassName = function(cl, tag) {
	   var els, matches = [],
	      i = 0, len,
	      regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
	 
	   // If no tag name is specified,
	   // we have to grab EVERY element from the DOM	 
	   els = document.getElementsByTagName(tag || "*");
	   if ( !els[0] ) return false;

	   for ( len = els.length; i < len; i++ ) {
	      if ( els[i].className.match(regex) ) {
	         matches.push( els[i]);
	      }
	   }
	   return matches; // an array of elements that have the desired classname
	};
}
 
// Very simple implementation. We're only checking for an id, class, or tag name.
// Does not accept CSS selectors in pre-querySelector browsers.
var $ = function(el, tag) {
   var firstChar = el.charAt(0);
 
   if ( document.querySelectorAll ) return document.querySelectorAll(el);
 
   switch ( firstChar ) {
      case "#":
         return document.getElementById( el.slice(1) );
      case ".":
         return document.getElementsByClassName( el.slice(1), tag );
      default:
         return document.getElementsByTagName(el);
   }
};

// Usage
$('#container');
$('.box'); // any element with a class of box
$('.box', 'div'); // look for divs with a class of box
$('p'); // get all p elements
Unfortunately, the legacy method isn't quite so minimal. Honestly, at this point, you should use a library. jQuery is highly optimized for working with the DOM, which is why it's so popular! The example above will certainly work, however, it doesn't support complex CSS selectors in older browsers; that task is just a wee-bit more complicated!
