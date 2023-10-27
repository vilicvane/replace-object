import type {ObjectReplacerOptions} from './object-replacer.js';
import {ObjectReplacer} from './object-replacer.js';

export default function replaceObject<T extends object>(
  object: T,
  withObject: T,
  options?: ObjectReplacerOptions,
): void {
  const replacer = new ObjectReplacer(options);
  replacer.replace(object, withObject);
}

export * from './object-replacer.js';
