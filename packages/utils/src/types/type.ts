import { TypeStringObject } from "./typedef";

const types: TypeStringObject = {};

export const type = (test: unknown): string => test == null ? "null" : types[types.toString.call(test)] || "object";

["Array", "AsyncFunction", "Boolean", "Date", "Function", "Map", "Number", "Object", "RegExp", "Set", "String"].forEach((type) => types["[object " + type + "]"] = type.toLowerCase());
