# Satori HTML

Generate a [satori](https://github.com/vercel/satori)-friendly VDOM from a string of HTML.

## What is this?

[Satori](https://github.com/vercel/satori) is an amazing library for generating SVG strings from pure HTML and CSS.

Unfortunately, it is built on top of React's JSX and [expects "React-elements-like objects"](https://github.com/vercel/satori#use-without-jsx). This library (`satori-html`) bridges that gap, generating the necessary VDOM object from a string of HTML.

> **Note**
> Satori supports a limited subset of HTML and CSS features, due to its special use case. Please use inline styles rather than class-based styling!

## Example

### API

`satori-html` exports an `html` helper, which transforms HTML strings into an object that is compatible with `satori`.

```js
import satori from "satori";
import { html } from "satori-html";

const markup = html`<div style="color: black;">hello, world</div>`;
// See https://github.com/vercel/satori#documentation
const svg = await satori(markup, {
  width: 600,
  height: 400,
  fonts: [],
});
```

The `html` utility can be used as a tagged template literal or as a function.

```js
// Tagged Template Literal
const tagged = html`<div style="color: ${color};">hello, world</div>`;
// Function
const fn = html('<div style="color: black;">hello, world</div>');
```
