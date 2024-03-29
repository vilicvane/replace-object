import replaceObject from '../library/index.js';

test('should do deep replace', () => {
  const foo: any = {
    a: 123,
    b: {
      c: 'abc',
    },
    d: true,
  };

  const b = foo.b;

  replaceObject(foo, {
    a: 456,
    b: {
      c: 'def',
      e: 789,
    },
  });

  expect(foo.b).toBe(b);
  expect(foo.b.c).toBe('def');
  expect(foo.b.e).toBe(789);
  expect('d' in foo).toBe(false);
});

test('should do shallow replace', () => {
  const foo: any = {
    a: 123,
    b: {
      c: 'abc',
    },
    d: true,
  };

  const b = foo.b;

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

  expect(foo.b).not.toBe(b);
  expect(foo.b.c).toBe('def');
  expect(foo.b.e).toBe(789);
  expect('d' in foo).toBe(false);
});

test('should replace array', () => {
  const foo: any = {
    arr: [1, 2],
  };

  const arr = foo.arr;

  replaceObject(foo, {
    arr: [3],
  });

  expect(foo.arr).toBe(arr);
  expect(foo.arr.length).toBe(1);
  expect(foo.arr).toEqual([3]);
});

test('should do non-addition replace', () => {
  const foo: any = {
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

  expect(foo).toEqual({
    arr: [3, 4, 5],
    a: 2,
  });
});

test('should do non-deletion replace', () => {
  const foo: any = {
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

  expect(foo).toEqual({
    arr: [3],
    a: 2,
    b: 3,
  });
});
