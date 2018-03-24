import {ObjectReplacer, ObjectReplacerOptions} from './object-replacer';

export default function replaceObject<T extends object>(
  object: T,
  withObject: T,
  options?: ObjectReplacerOptions,
): void {
  let replacer = new ObjectReplacer(options);
  replacer.replace(object, withObject);
}

export * from './object-replacer';
