import { type } from "./type";

export const isRegExp = (test: unknown): test is RegExp => type(test) == "regexp";
