import SearchResult from "./SearchResult";
import { type Results } from "@/types";

export default function SearchResultList({ results }: Results) {
  return (
    <div className="mb-0.5 mt-2.5 cursor-default select-none border-t border-[#434343] pt-1 outline-none">
      {results.map((film, index) => {
        return (
          <SearchResult key={film.id} {...film}>
            {film.title}
          </SearchResult>
        );
      })}
    </div>
  );
}
