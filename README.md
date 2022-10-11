# Astro Remote

Render remote HTML or Markdown content in Astro with full control over the output.

Powered by [`ultrahtml`](https://github.com/natemoo-re/ultrahtml) and [`marked`](https://github.com/markedjs/marked).

## Rendering Remote Content

The most basic function of `astro-remote` is to convert a string of HTML or Markdown to HTML. Use the `Markup` and `Markdown` components depending on your input.

```astro
---
import { Markup, Markdown } from 'astro-remote';
const { html, markdown } = await fetch('http://my-site.com/api/v1/post').then(res => res.json());
---

<Markup content={html} />
<Markdown content={markdown} />
```

### Sanitization

By default, all content will be sanitized with sensible defaults (`script` blocks are dropped). This can be controlled using the [`SanitizeOptions`](https://github.com/natemoo-re/ultrahtml/blob/71e723f6093abea2584c9ea3bfecc0ce68d02d8d/src/index.ts#L251-L268) available in `ultrahtml`. Set to `false` to disable sanitization.

```astro
---
import { Markdown } from 'astro-remote';
const content = await fetch('http://my-site.com/api/v1/post').then(res => res.text());
---

<!-- Disallow inline `style` attributes, but allow HTML comments -->
<Markdown content={content} sanitize={{ dropAttributes: { "style": ["*"] }, allowComments: true }} />
```

### Customization

Both `Markup` and `Markdown` allow full control over the rendering of output. The `components` option allows you to replace a standard HTML element with a custom component.

```astro
---
import { Markdown } from 'astro-remote';
import Title from '../components/Title.astro';
const content = await fetch('http://my-site.com/api/v1/post').then(res => res.text());
---

<!-- Render <h1> as custom <Title> component -->
<Markdown content={content} components={{ h1: Title }} />
```

In addition to built-in HTML Elements, `Markdown` also supports a few custom components for convenience.

#### `<Heading />`

The `Heading` component renders all `h1` through `h6` elements. It receives the following props:

- `as`, the `h1` through `h6` tag
- `href`, a pre-generated, slugified `href`
- `text`, the text content of the children (for generating a custom slug)

```astro
---
import { Markdown } from 'astro-remote';
import Heading from '../components/Heading.astro';
const content = await fetch('http://my-site.com/api/v1/post').then(res => res.text());
---

<!-- Render all <h1> through <h6> using custom <Heading> component -->
<Markdown content={content} components={{ Heading }} />
```

A sample `Heading` component might look something like this.

```astro
---
const { as: Component, href } = Astro.props;
---

<Component><a href={href}><slot /></a></Component>
```

#### `<CodeBlock />`

The `CodeBlock` component allows you customize the rendering of code blocks. It receives the following props:

- `lang`, the language specified after the three backticks (defaults to `plaintext`)
- `code`, the raw code to be highlighted. **Be sure to escape the output!**
- `...props`, any other attributes passed to the three backticks. These should follow HTML attribute format (`name="value"`)

A sample `CodeBlock` component might look something like this.

```astro
---
const { lang, code, ...props } = Astro.props;
const highlighted = await highlight(code, { lang });
---

<pre class={`language-${lang}`}><code set:html={highlighted} /></pre>
```

#### `<CodeSpan />`

The `CodeSpan` component allows you customize the rendering of inline code spans. It receives the following props:

- `code`, the value of the code span

A sample `CodeSpan` component might look something like this.

```astro
---
const { code } = Astro.props;
---

<code set:text={code} />
```

#### `<Note />`

The `Note` component allows you customize the rendering of GitHub-style notes and warnings. It receives the following props:

- `type`, either `"note"` or `"warning"`

To use a `Note` component in Markdown, use the following syntax:

```md
> **Note**
> Some tip here!

> **Warning**
> Some warning here!
```

### Custom Components in Markdown

If you'd like to allow custom components in Markdown, you can do so using a combination of the `sanitize` and `components` options. By default, sanitization removes components.

Given the following markdown source:

```markdown
# Hello world!

<MyCustomComponent a="1" b="2" c="3">It works!</MyCustomComponent>
```

```astro
---
import { Markdown } from 'astro-remote';
import MyCustomComponent from '../components/MyCustomComponent.astro';
const content = await fetch('http://my-site.com/api/v1/post').then(res => res.text());
---

<Markdown content={content} sanitize={{ allowComponents: true }} components={{ MyCustomComponent }} />
```
