import { isFunction } from "./isFunction";
import { TypeAnyConstructor } from "./typedef";

export const isConstructor = (test: unknown): test is TypeAnyConstructor => isFunction(test) && !!test.prototype && test.prototype.constructor === test;
