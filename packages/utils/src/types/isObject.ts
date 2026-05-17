import { type } from "./type";
import { TypeAnyObject } from "./typedef";

export const isObject = (test: unknown): test is TypeAnyObject => type(test) == "object";
