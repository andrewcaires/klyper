import { type } from "./type";

export const isArray = (test: unknown): test is Array<any> => type(test) == "array";
