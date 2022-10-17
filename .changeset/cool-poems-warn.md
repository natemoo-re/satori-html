---
"satori-html": minor
---

**NEW** Automatically inline `style` tags directly to matching elements.

```diff
  import { html } from 'satori-html';

- const markup = html`<div style="color:red">Hello world</div>`;
+ const markup = html`<div>Hello world</div><style>div { color: red; }</style>`
```
