import { type } from "./type";

export const isBoolean = (test: unknown): test is boolean => type(test) == "boolean";
