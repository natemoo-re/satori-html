---
"satori-html": minor
---

**NEW** Add `htmlWithOptions` function. Currently only supports control of `tailwind`.

```js
import { htmlWithOptions } from "satori-html";

const options = { tailwind: true };

// Tagged Template Literal
const tagged = htmlWithOptions(
  options
)`<div class="color-${color}">hello, world</div>`;
// Function
const fn = htmlWithOptions(options)(
  '<div class="color-red">hello, world</div>'
);
```
