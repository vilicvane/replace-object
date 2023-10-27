[![NPM version](https://img.shields.io/npm/v/replace-object?color=%23cb3837&style=flat-square)](https://www.npmjs.com/package/replace-object)
[![Repository package.json version](https://img.shields.io/github/package-json/v/vilic/replace-object?color=%230969da&label=repo&style=flat-square)](./package.json)
[![MIT License](https://img.shields.io/badge/license-MIT-999999?style=flat-square)](./LICENSE)
[![Discord](https://img.shields.io/badge/chat-discord-5662f6?style=flat-square)](https://discord.gg/vanVrDwSkS)

# replace-object

A simple utility for in-place object replacing.

## Installation

```sh
yarn add replace-object
# or
npm install replace-object
```

## Usage

### Default Replacer

```ts
import replaceObject from 'replace-object';

let foo = {a: 123, b: 'abc'};

replaceObject(foo, {b: 'def', c: true});
foo; // {b: 'def', c: true}

let bar = {a: 123, b: 'abc'};

replaceObject(bar, {b: 'def', c: true}, {delete: false});
bar; // {a: 123, b: 'def', c: true}

let pia = {a: 123, b: 'abc'};

replaceObject(pia, {b: 'def', c: true}, {add: false});
pia; // {b: 'def'}
```

Options:

```ts
interface ObjectReplacerOptions {
  /**
   * Whether to do shallow replace without recursion, defaults to `false`.
   */
  shallow?: boolean;

  /**
   * Whether to add new properties, defaults to `true`.
   */
  add?: boolean;

  /**
   * Whether to delete properties that does not exists on the `withObject`,
   * defaults to `true`.
   */
  delete?: boolean;
}
```

### MobX Observable Replacer

```ts
import {observable} from 'mobx';
import replaceObject from 'replace-object/mobx';

let foo = observable({a: 123, b: 'abc'});

replaceObject(foo, {b: 'def', c: true});
foo; // observable {b: 'def', c: true}
```

Check out the source code to find out how to customize.

## License

MIT License.
