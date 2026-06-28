export type TGameActionContext<T> = {
  set: (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void;
  get: () => T;
};
