import { api } from "@/polar";

export const { result } = await api.products.list({
  isArchived: false, // Only fetches published and active products
});
