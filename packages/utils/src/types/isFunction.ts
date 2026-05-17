import { TypeAnyFunction } from "./typedef";

export const isFunction = (test: unknown): test is TypeAnyFunction => typeof test == "function";
