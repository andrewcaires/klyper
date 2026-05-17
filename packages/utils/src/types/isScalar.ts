import { type } from "./type";
import { TypeScalar } from "./typedef";

const types = ["boolean", "number", "string"];

export const isScalar = (test: unknown): test is TypeScalar => types.indexOf(type(test)) != -1;
