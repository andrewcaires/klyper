import { isNumber } from "./isNumber";

export const isInteger = (test: unknown): test is number => isNumber(test) && !(test % 1);
