# satori-html

## 0.3.2

### Patch Changes

- [`b7eea4c`](https://github.com/natemoo-re/satori-html/commit/b7eea4c25e5fbc597c1631074445ecf6b6a56790) - Update `ultrahtml` and use `stylis` to properly parse styles

## 0.3.1

### Patch Changes

- [`fa940fb`](https://github.com/natemoo-re/satori-html/commit/fa940fb7c31731e5aedc5e343c878cd6e1bb8f1b) - Upgrade `ultrahtml` dependency, fixing <style> inlining behavior

* [`8c20f51`](https://github.com/natemoo-re/satori-html/commit/8c20f51e8fb578c829a343f7400c5b29bdd8c3bc) - Fix `:` being stripped from absolute URLs

## 0.3.0

### Minor Changes

- [`ba1ee5e`](https://github.com/natemoo-re/satori-html/commit/ba1ee5e91dd6d8165b35c668b1718921c6950442) - Automatically convert Tailwind classes to the special `tw` prop

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
