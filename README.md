[![NPM Package](https://badge.fury.io/js/replace-object.svg)](https://www.npmjs.com/package/replace-object)
[![Build Status](https://travis-ci.org/vilic/replace-object.svg?branch=master)](https://travis-ci.org/vilic/replace-object)

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

replaceObject(foo, {b: 'def', c: true}, {delete: false});

foo; // {a: 123, b: 'def', c: true}

replaceObject(foo, {b: 'def', c: true}, {add: false});

foo; // {b: 'def'}
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
