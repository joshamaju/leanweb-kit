# Lean Web Kit

Toolkit for the lean web

> Ruby on rails for the modern web for JavaScript/Typescript developers

# 🚧 This project is still in the experimental stage. Do not use in production

## Features

- Use Svelte for templating with familiar express like router
- Deploy anywhere, with adapters for different platforms. Currently supported Vercel and Node
- Build websites/apps with modern DX (bundling, minifying etc) without sacrificing the user experience
- Use only what you need, no unnecessary JavaScript sent to the client
- Get modern SPA features by using Turbolinks, HTMX etc

## Examples

- [Basic app](/playground/basic)
- [Realworld app](/playground/realworldapp)

## Gotchas

- Templating is done using svelte, but template files must use the .html file extension instead of .svelte

- Svelte client side reactivity is not supported, we only send plain-old-html to the client

- Imports in templates must always include the file extension. So

```ts
<script>
  import Component from "./component"
  import Enum from './types/enum'
</script>
```

will not work, it has to be

```ts
<script>
  import Component from "./component.html"
  import Enum from './types/enum.ts'
</script>
```