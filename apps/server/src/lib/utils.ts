// Renames object keys while preserving type
export const renameKeys = <
  T extends Record<string, any>,
  M extends Partial<Record<keyof T, string>>,
>(
  keysMap: M,
  obj: T,
): T => {
  const result = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = keysMap[key] || key;
      result[newKey as keyof T] = obj[key];
    }
  }

  return result;
};
