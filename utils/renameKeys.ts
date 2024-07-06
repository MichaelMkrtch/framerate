export const renameKeys = (
  keysMap: Record<string, string>,
  obj: Record<string, unknown>,
) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {},
  );
