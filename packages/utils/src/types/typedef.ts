/* eslint-disable no-unused-vars */

export type TypeAnyConstructor<T = any> = new (...args: Array<any>) => T;
export type TypeAnyFunction<T = any> = (...args: Array<any>) => T;

export type TypeArray<T> = Array<T>;
export type TypeAnyArray = TypeArray<any>;
export type TypeStringArray = TypeArray<string>;
export type TypeNumberArray = TypeArray<number>;
export type TypeFunctionArray = TypeArray<TypeAnyFunction>;

export type TypeKey = number | string | symbol;
export type TypeOptional<T> = T | null | undefined;
export type TypeScalar = boolean | number | string;
export type Nullable<T> = T | null;
export type Maybe<T> = TypeOptional<T>;
export type EntityId = string;

export type TypeObject<T, K extends keyof any = string> = Record<K, T>
export type TypeAnyObject = TypeObject<any>;
export type TypeBooleanObject = TypeObject<boolean>;
export type TypeFunctionObject = TypeObject<TypeAnyFunction>;
export type TypeNumberObject = TypeObject<number>;
export type TypeStringObject = TypeObject<string>;

export type TypeObjectOptional<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
} & {
  [P in keyof T as P extends K ? P : never]?: T[P];
};
export type TypeObjectRequired<T, K extends keyof T> = {
  [P in K]-?: T[P];
} & {
  [P in Exclude<keyof T, K>]: T[P];
};

export type TypeObjectKeys<T, F = any> = {
  [K in keyof T]: T[K] extends F ? K : never;
}[keyof T];
export type TypeObjectKeysFunction<T> = TypeObjectKeys<T, TypeAnyFunction>;

export type TypeCallback<T, K, O, R> = (value: T, key: K, object: O) => R;
export type TypeCallbackArray<T> = TypeCallback<T, number, TypeArray<T>, any>;
export type TypeCallbackMap<T> = TypeCallback<T, number, TypeArray<T>, T>;
export type TypeCallbackObject<T> = TypeCallback<T, string, TypeObject<T>, any>;
