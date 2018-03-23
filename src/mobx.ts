// tslint:disable:no-implicit-dependencies

import {extendObservable, isArrayLike, toJS} from 'mobx';

import {ObjectReplacer} from './object-replacer';

export class ObservableObjectReplacer extends ObjectReplacer {
  constructor() {
    super({shallow: false});
  }

  replace<T extends object>(object: T, withObject: T): void {
    super.replace(object, toJS(withObject));
  }

  protected add(object: any, key: string, value: any): void {
    extendObservable(object, {[key]: value});
  }

  protected update(object: any, key: string, value: any): void {
    object[key] = value;
  }

  protected isReplaceableArray(object: any): boolean {
    return isArrayLike(object);
  }

  protected getArrayKeys(object: any): string[] {
    return ['length', ...Object.keys(toJS(object))];
  }
}

const replacer = new ObservableObjectReplacer();

export default function replaceObject<T extends object>(
  object: T,
  withObject: T,
): void {
  replacer.replace(object, withObject);
}
