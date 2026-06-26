export type Factory<T> = {
  getDefault: () => T;
};
