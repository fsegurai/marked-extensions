# Code blocks

```ts:line-numbers=10 [config.ts] {2,4-5}
export default {
  title: 'Docs',
  lang: 'en-US',
  themeConfig: {
    nav: [],
  },
};
```

```js title="diff.js"
const greeting = 'hello'; // [!code --]
const greeting = 'hello, world'; // [!code ++]
console.log(greeting); // [!code focus]
```

::: code-group

```sh [npm]
npm install @fsegurai/marked-extended-code
```

```sh [bun]
bun add @fsegurai/marked-extended-code
```

:::
