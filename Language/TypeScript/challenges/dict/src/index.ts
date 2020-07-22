export type Dict<T> = {
  [key: string] : T | undefined;
};

// Array.prototype.map, but for Dict
export function mapDict<T, S>(dict: Dict<T>, fn: (arg: T, index: number) => S): Dict<S> {
  const out: Dict<S> = {};
  // iterate through the array
  Object.keys(dict).forEach((val, index) => {
    const thisItem = dict[val];
    if (typeof thisItem !== 'undefined') {
      out[val] = fn(thisItem, index)
    }
  });
  return out;
}

// Array.prototype.reduce, but for Dict
export function reduceDict<T, S>(dict: Dict<T>, reducer: (val: S, item: T, index: number) => S, initalVal: S) {
  let val: S = initalVal;
  Object.keys(dict).forEach((key, index) => {
    const thisItem = dict[key];
    if (typeof thisItem !== 'undefined'){
      val = reducer(val, thisItem, index);
    }
  });
  return val;
}