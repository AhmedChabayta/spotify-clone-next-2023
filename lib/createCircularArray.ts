const createCircularArray = (
  order: number,
  uris?: string[] | string
): string[] | string | null => {
  if (typeof uris === "string" || !uris) return uris || null;
  const index = order % uris?.length!;
  const slicedUris =
    index !== -1 ? uris?.slice(index).concat(uris.slice(0, index)) : [];
  return slicedUris;
};

export default createCircularArray;
