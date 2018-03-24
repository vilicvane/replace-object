// tslint:disable:no-implicit-dependencies

import {test} from 'ava';

import replaceObject from '..';

test('should do deep replace', t => {
  let foo: any = {
    a: 123,
    b: {
      c: 'abc',
    },
    d: true,
  };

  let b = foo.b;

  replaceObject(foo, {
    a: 456,
    b: {
      c: 'def',
      e: 789,
    },
  });

  t.is(foo.b, b);
  t.is(foo.b.c, 'def');
  t.is(foo.b.e, 789);
  t.false('d' in foo);
});

test('should do shallow replace', t => {
  let foo: any = {
    a: 123,
    b: {
      c: 'abc',
    },
    d: true,
  };

  let b = foo.b;

  replaceObject(
    foo,
    {
      a: 456,
      b: {
        c: 'def',
        e: 789,
      },
    },
    {shallow: true},
  );

  t.not(foo.b, b);
  t.is(foo.b.c, 'def');
  t.is(foo.b.e, 789);
  t.false('d' in foo);
});

test('should replace array', t => {
  let foo: any = {
    arr: [1, 2],
  };

  let arr = foo.arr;

  replaceObject(foo, {
    arr: [3],
  });

  t.is(foo.arr, arr);
  t.is(foo.arr.length, 1);
  t.deepEqual(foo.arr, [3]);
});

test('should do non-addition replace', t => {
  let foo: any = {
    arr: [1, 2],
    a: 1,
  };

  replaceObject(
    foo,
    {
      arr: [3, 4, 5],
      a: 2,
      b: 3,
    },
    {
      add: false,
    },
  );

  t.deepEqual(foo, {
    arr: [3, 4, 5],
    a: 2,
  });
});

test('should do non-deletion replace', t => {
  let foo: any = {
    arr: [1, 2],
    a: 1,
    b: 3,
  };

  replaceObject(
    foo,
    {
      arr: [3],
      a: 2,
    },
    {
      delete: false,
    },
  );

  t.deepEqual(foo, {
    arr: [3],
    a: 2,
    b: 3,
  });
});
