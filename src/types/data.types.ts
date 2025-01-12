export type StoredRating = {
  avgRating: number;
  reviewCount: number;
};

export type List = {
  type: "list";
  id: number;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ListItem = {
  mediaType: "movie" | "tv";
  listId: number;
  mediaId: number;
  listItemId: number;
  title: string;
  posterPath: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ActiveList = {
  id: number;
  name: string;
};
