# Lean Web Kit

Toolkit for the lean web

> Ruby on rails for the modern web for JavaScript/Typescript developers

# 🚧 This project is still in the experimental stage. Do not use in production

## Features

- Hot Module Reload
- Use Svelte for templating with familiar express like router
- Scoped css, build your apps with reusable components
- Deploy anywhere, with adapters for different platforms. Currently supported Vercel and Node
- Build websites/apps with modern DX (bundling, minifying etc) without sacrificing the user experience
- Use only what you need, no unnecessary JavaScript sent to the client
- Modern SPA features by using Turbolinks, HTMX etc

## Examples

- [Basic app](/playground/basic)
- [Realworld app](/playground/realworldapp)

## Project structure

.
└── app/
    ├── src/
    │   ├── views - your view templates/
    │   │   ├── home.html
    │   │   └── about.html
    │   └── entry.ts - entry point for your application routes
    ├── hono-mvc.d.ts
    ├── vite.config.js
    ├── package.json
    └── tsconfig.json

## Routing

[link](https://hono.dev/api/routing)

```ts
import {render} from 'core/runtime'

const app = new Router()

app.get('/', () => render('home', {/* your template data (props) */}))

// ...
```

## Gotchas

- Templating is done using svelte, but template files must use the .html file extension instead of .svelte

- Svelte client side reactivity is not supported, we only send plain-old-html to the client

- Imports in templates must always include the file extension. Writing

```html
<script>
  import Component from "./component"
  import Enum from './types/enum'
</script>
```

will not work, it has to be

```html
<script>
  import Component from "./component.html"
  import Enum from './types/enum.ts'
</script>
```