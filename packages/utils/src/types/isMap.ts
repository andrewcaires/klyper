import { type } from "./type";

export const isMap = <K = any, V = any>(test: unknown): test is Map<K, V> => type(test) == "map";
