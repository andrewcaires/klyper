import { isObject } from "./isObject";
import { TypeAnyObject } from "./typedef";

export const isPlainObject = (test: unknown): test is TypeAnyObject => isObject(test) && test.constructor === Object;
