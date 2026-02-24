export const isObjectEmpty = <T extends object>(obj: T | null | undefined): boolean =>
  !!obj && Object.keys(obj).length === 0;
