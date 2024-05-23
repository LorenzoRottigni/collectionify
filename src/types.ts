export type ID = string | number

export declare interface Translation  {
    id: ID
    name: string
    slug: string
}

export declare interface CollectionBreadcrumb {
  id: ID,
  name: string[]
  slug: string
};

export declare interface Collection {
  breadcrumbs: Array<CollectionBreadcrumb>;
  children?: Array<Collection>;
  createdAt: Date
  description: Date
  filters: Array<any>;
  id: ID;
  languageCode?: string
  name: string
  parent?: Collection
  parentId: ID
  position: number
  slug: string
  translations: Array<Translation>;
  updatedAt: Date
};
