import * as _ from 'lodash';

export type ReplaceableType = 'object' | 'array';

interface ObjectReplacerInternalOptions {
  shallow: boolean;
  add: boolean;
  delete: boolean;
}

export interface ObjectReplacerOptions {
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
    let options = this.options;

    let currentKeySet = this.getReplaceableKeySet(object, type);
    let nextKeySet = this.getReplaceableKeySet(withObject, type);

    let newKeySet = new Set(nextKeySet);

    for (let key of currentKeySet) {
      newKeySet.delete(key);
    }

    if (options.add || type === 'array') {
      for (let key of newKeySet) {
        this.add(object, key, withObject[key]);
      }
    }

    for (let key of currentKeySet) {
      if (nextKeySet.has(key)) {
        let currentValue = object[key];
        let nextValue = withObject[key];

        let type = this.isSameReplaceableType(currentValue, nextValue);

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

  private isSameReplaceableType(x: any, y: any): ReplaceableType | false {
    return this.isReplaceableObject(x) && this.isReplaceableObject(y)
      ? 'object'
      : this.isReplaceableArray(x) && this.isReplaceableArray(y)
        ? 'array'
        : false;
  }

  private assertSameReplaceableType(x: any, y: any): ReplaceableType {
    let type = this.isSameReplaceableType(x, y);

    if (type) {
      return type;
    }

    throw new TypeError('Expecting objects with the same replaceable type');
  }
}
