import { type } from "./type";

export const isDef = <T = any>(test: unknown): test is T => type(test) != "null";
