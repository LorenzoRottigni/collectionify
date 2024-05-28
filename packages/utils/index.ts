import type { Collection, ID } from "./types";

export const findCollection = (
  id: number | string,
  collections: Collection[]
): Collection | null => {
  let collection: Collection | null = null;
  function iter(option: Collection) {
    if (
      Number.parseInt(option.id.toString()) === Number.parseInt(id.toString())
    ) {
      collection = option;
      return true;
    }
    return Array.isArray(option.children) && option.children.some(iter);
  }
  collections.some(iter);
  return collection;
};

export const findCollectionParent = (hay: Collection, haystack: Collection[]): Collection | null => {
  for (const collection of haystack) {
    if (collection?.id === hay.parent?.id) {
      return collection
    } else if (collection?.children) {
      const parent = findCollectionParent(hay, collection?.children)
      if (parent) {
        return parent
      }
    }
  }
  return null
}

export const findChild = (
  id: number,
  list: Collection[]
): Collection | null => {
  function iter(option: Collection) {
    if (
      option?.parent?.id
        ? Number.parseInt(option?.parent?.id.toString()) === id
        : false
    ) {
      const child: Collection | null = findChild(
        Number.parseInt(option?.id.toString()),
        list
      );
      child ? (result = child) : (result = option);
      return true;
    }
    return Array.isArray(option.children) && option.children.some(iter);
  }
  let result: Collection | null = null;
  list.some(iter);
  return result;
};

export const array2tree = (
  collections: Collection[],
  rootSlug: string
): Collection[] => {
  const map: { [id: string]: Collection } = {};
  collections.forEach((collection: Collection) => {
    const id: ID = collection.id;
    map[id] = { ...collection, children: [] };
  });
  collections.forEach((collection: Collection) => {
    const { id, parentId } = collection;
    if (parentId && parentId !== "0") {
      map[parentId]?.children?.push(map[id]);
    }
  });
  // WORKAROUND: ensure there's only 1 root
  const rootCollection = Object.values(map).find((c) => c.slug === rootSlug);
  // TODO: make it working only returning Object.values(map) because there should always be only 1 root
  return rootCollection ? [rootCollection] : [];
};
