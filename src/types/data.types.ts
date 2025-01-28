export type StoredRating = {
  avgRating: number;
  reviewCount: number;
};

export type List = {
  type: "list";
  id: number;
  userId: string;
  name: string;
  likeCount: number;
  saveCount: number;
  createdAt: Date;
  updatedAt: Date | null;
  slug: string;
};

export type ListItem = {
  mediaType: "movie" | "tv";
  listId: number;
  mediaId: number;
  listItemId: number;
  title: string;
  posterPath: string | null;
  createdAt: Date;
};

export type ActiveList = List;

export type Review = {
  mediaType: "movie" | "tv";
  mediaId: number;
  title: string;
  rating: string;
  posterPath: string;
  createdAt: Date;
};
