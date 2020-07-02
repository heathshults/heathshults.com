## Demo Markup

A component that takes in code, renders it within a code element and
demos the code at the same time. Useful for documentation.

### Pre-requisite

Link to the **highlight.js** styles and script library.
e.g.

```html
<link rel="stylesheet" href="/path/to/styles/default.css">
<script src="/path/to/highlight.pack.js"></script>
```

### How to use

Example:

**html**

```html
<hs-demo language="html" code='<button type="button" class="hs-button">Button</button>'></hs-demo>
```

**jsx**

```html
<hs-demo language="html" code={`<button type="button" class="hs-button">Button</button>`} />
```

### API

**code** - A string of code that you would like to demonstrate

**demo** - render the code supplied to the component _(default **true**)_

**classes** - Additional classes you can apply to the demo container

**language** - The class to apply to help HighlightJS
