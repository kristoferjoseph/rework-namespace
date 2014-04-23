# rework-namespace [![BuildStatus](https://travis-ci.org/kristoferjoseph/rework-namespace.png?branch=master)](https://travis-ci.org/kristoferjoseph/rework-namespace)
> Namespace plugin for rework

# Usage

Pass the namespace as the first argument:

```js
var namespace = require('rework-namespace');

var css = rework('.button { color: black; }')
  .use(namespace('ns'))
  .toString();
```

Results:

```css
.ns-button { color: black; }
```

## Options

Pass an options object as the second argument.

### options.not

Don't prefix specific classes or classes that match a regex.

```js
var css = rework(inputCSS)
  .use(namespace('ns', { not: [ /\.icon/, '.button-bar' ] }))
  .toString();
```

### options.only

Only prefix specific classes or classes that match a regex.

```js
var css = rework(inputCSS)
  .use(namespace('ns', { only: [ /\.icon/, '.icon-group' ] }))
  .toString();
```

## Examples

### Prefix every class

```js
var css = rework(inputCSS)
  .use(namespace('ns'))
  .toString();
```

### Prefix every class except icon classes

```js
var css = rework(inputCSS)
  .use(namespace('ns', {
    not: /\.icon-/,
  }))
  .toString();
```

### Prefix all classes with "button" in them except .button itself

```js
var css = rework(inputCSS)
  .use(namespace('ns', {
    only: /button/,
    not: '.button'
  }))
  .toString();
```
