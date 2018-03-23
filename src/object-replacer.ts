import * as _ from 'lodash';

export interface ObjectReplacerOptions {
  shallow?: boolean;
}

export class ObjectReplacer {
  shallow: boolean;

  constructor({shallow = false}: ObjectReplacerOptions = {}) {
    this.shallow = shallow;
  }

  replace<T extends object>(object: T, withObject: T): void;
  replace(object: any, withObject: any): void {
    let currentKeySet = new Set(this.getReplaceableKeys(object));
    let nextKeySet = new Set(this.getReplaceableKeys(withObject));

    let newKeySet = new Set(nextKeySet);

    for (let key of currentKeySet) {
      newKeySet.delete(key);
    }

    for (let key of newKeySet) {
      this.add(object, key, withObject[key]);
    }

    for (let key of currentKeySet) {
      if (nextKeySet.has(key)) {
        let currentValue = object[key];
        let nextValue = withObject[key];

        if (!this.shallow && this.isSameReplaceable(currentValue, nextValue)) {
          this.replace(currentValue, nextValue);
        } else {
          this.update(object, key, nextValue);
        }
      } else {
        this.delete(object, key);
      }
    }
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

  private getReplaceableKeys(object: any): string[] {
    return this.isReplaceableArray(object)
      ? this.getArrayKeys(object)
      : this.getObjectKeys(object);
  }

  private isSameReplaceable(x: any, y: any): boolean {
    return (
      (this.isReplaceableObject(x) && this.isReplaceableObject(y)) ||
      (this.isReplaceableArray(x) && this.isReplaceableArray(y))
    );
  }
}
