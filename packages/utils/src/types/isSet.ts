import { type } from "./type";

export const isSet = <T = any>(test: unknown): test is Set<T> => type(test) == "set";
