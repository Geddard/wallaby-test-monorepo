/**
 * Make all properties optional but require at least one to be defined
 */
export type AtLeastOneProperty<T> = {
  [K in keyof T]: Required<Pick<T, K>>
}[keyof T]

export type BuildTuple<
  T,
  N extends number,
  Current extends T[],
> = Current['length'] extends N
  ? [...Current, ...T[]]
  : BuildTuple<T, N, [...Current, T]>

/**
 * Create tuple of type T with N minimum elements
 */
export type AtLeast<T, N extends number> = BuildTuple<T, N, []>
