# html-to-preact-h

Generates a string of [preact](https://preactjs.com) `h()` function calls for a
given HTML string. Designed to make it easier to embed snippets of markup
(notably generated SVG files) into JavaScript source listings that use `h()`
to render markup (as opposed to JSX).

## Install

```
npm install html-to-preact-h
```

## API

```js
const htmlToPreactH = require('html-to-preact-h')

const result = htmlToPreactH('<a href="https://example.com">Great example!</a>')

console.log(result)
```

Will print:

```
h('a', {href: 'https://example.com'}, 'Great example!')
```

It handles things like nesting, dropping to 1 or 2 args when appropriate.

## CLI

Just pass a file path and it'll print out the `h()`'s you crave:

```
$ html-to-preact-h example.svg
```


