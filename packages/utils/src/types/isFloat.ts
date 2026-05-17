import { isNumber } from "./isNumber";

export const isFloat = (test: unknown): test is number => isNumber(test) && !!(test % 1);
