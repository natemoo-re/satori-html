# satori-html

## 0.2.0

### Minor Changes

- [`28fb172`](https://github.com/natemoo-re/satori-html/commit/28fb1726028820605a1ec406edf5a16aa1aef718) - **NEW** Automatically inline `style` tags directly to matching elements.

  ```diff
    import { html } from 'satori-html';

  - const markup = html`<div style="color:red">Hello world</div>`;
  + const markup = html`<div>Hello world</div><style>div { color: red; }</style>`
  ```

## 0.1.0

### Minor Changes

- [`c64fc25`](https://github.com/natemoo-re/satori-html/commit/c64fc257c6c726d81a500e6735bd70fe8a4f2f9a) - Update `html` to be synchronous

## 0.0.2

### Patch Changes

- [`3ed0921`](https://github.com/natemoo-re/satori-html/commit/3ed0921f44d4088090eaa55501aa2fd273d1cd38) - Update README
