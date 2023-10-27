import _ from 'lodash';

export type ReplaceableType = 'object' | 'array';

type ObjectReplacerInternalOptions = {
  shallow: boolean;
  add: boolean;
  delete: boolean;
};

export type ObjectReplacerOptions = {
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
};

export class ObjectReplacer {
  private options: ObjectReplacerInternalOptions;

  constructor({
    shallow = false,
    add = true,
    delete: del = true,
  }: ObjectReplacerOptions = {}) {
    this.options = {shallow, add, delete: del};
  }

  replace<T extends object>(object: T, withObject: T): void {
    this._replace(object, withObject);
  }

  protected add(object: any, key: string, value: any): void {
    this.update(object, key, value);
  }

  protected update(object: any, key: string, value: any): void {
    object[key] = _.cloneDeep(value);
  }

  protected delete(object: any, key: string): void {
    delete object[key];
  }

  protected isReplaceableArray(object: any): boolean {
    return Array.isArray(object);
  }

  protected isReplaceableObject(object: any): boolean {
    return _.isPlainObject(object);
  }

  protected isSameReplaceableType(x: any, y: any): ReplaceableType | false {
    return this.isReplaceableObject(x) && this.isReplaceableObject(y)
      ? 'object'
      : this.isReplaceableArray(x) && this.isReplaceableArray(y)
      ? 'array'
      : false;
  }

  protected getArrayKeys(object: any): string[] {
    return ['length', ...Object.keys(object)];
  }

  protected getObjectKeys(object: any): string[] {
    return Object.keys(object);
  }

  private _replace(
    object: any,
    withObject: any,
    type = this.assertSameReplaceableType(object, withObject),
  ): void {
    const options = this.options;

    const currentKeySet = this.getReplaceableKeySet(object, type);
    const nextKeySet = this.getReplaceableKeySet(withObject, type);

    const newKeySet = new Set(nextKeySet);

    for (const key of currentKeySet) {
      newKeySet.delete(key);
    }

    if (options.add || type === 'array') {
      for (const key of newKeySet) {
        this.add(object, key, withObject[key]);
      }
    }

    for (const key of currentKeySet) {
      if (nextKeySet.has(key)) {
        const currentValue = object[key];
        const nextValue = withObject[key];

        const type = this.isSameReplaceableType(currentValue, nextValue);

        if (!options.shallow && type) {
          this._replace(currentValue, nextValue, type);
        } else {
          this.update(object, key, nextValue);
        }
      } else if (options.delete || type === 'array') {
        this.delete(object, key);
      }
    }
  }

  private getReplaceableKeySet(
    object: any,
    type: ReplaceableType,
  ): Set<string> {
    return new Set(
      type === 'object'
        ? this.getObjectKeys(object)
        : this.getArrayKeys(object),
    );
  }

  private assertSameReplaceableType(x: any, y: any): ReplaceableType {
    const type = this.isSameReplaceableType(x, y);

    if (type) {
      return type;
    }

    throw new TypeError('Expecting objects with the same replaceable type');
  }
}
