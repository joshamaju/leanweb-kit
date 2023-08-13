Experimental web application framework

> More like ruby on rails for JavaScript

Build your UI with modern tools e.g svelte for templating and Hono for routing. Which put together give you the traditional express and view engine experience and with little or no complexity.

Deploy anywhere, with adapters for different platforms. Currently supported Vercel and Node

## Examples

[Realworld app](/playground/realworlapp)

## Gotchas

Imports in svelte (.html) files must always include the file extension. So

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