export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function noop(): void {}

export function identity<T>(value: T): T {
  return value;
}
