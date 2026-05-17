import { type } from "./type";

export const isDate = (test: unknown): test is Date => type(test) == "date";
