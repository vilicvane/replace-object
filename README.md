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

Using the default replacer:

```ts
import replaceObject from 'replace-object';

let foo = {a: 123, b: 'abc'};

replaceObject(foo, {b: 'def', c: true});

foo; // {b: 'def', c: true}
```

Using the mobx observable replacer:

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
