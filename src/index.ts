export type TransDataToInject = Record<string, string> | { [k: string]: string } | null;

// to match strings like 'my name is {first_name}'
export const TRANS_VAR_PATTERN = /\{([^\}]+)\}/g;

export function template(txt = '', ctx: TransDataToInject = null) {
  if (!ctx) return txt;

  const replaceEachWith = (match, name) => {
    if (match && name) {
      if (name in ctx) return ctx[name];
      return `{${name}}`;
    }
    return 'NULL';
  };
  
  return String(txt).replace(TRANS_VAR_PATTERN, replaceEachWith);
}

export class Traduire<T> {
  _code: string;
  _lookup: T;

  constructor(_code: string, _lookup: T) {
    this._code = _code;
    this._lookup = _lookup;
  }

  _(key: keyof T, ctx: TransDataToInject = {}): string {
    return ((key in this._lookup) ? template(String(this._lookup[key]), ctx) : `[${key}]`);
  }

  keys(): string[] {
    return Object.keys(this._lookup);
  }
}
