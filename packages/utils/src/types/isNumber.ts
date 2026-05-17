import { type } from "./type";

export const isNumber = (test: unknown): test is number => type(test) == "number";
