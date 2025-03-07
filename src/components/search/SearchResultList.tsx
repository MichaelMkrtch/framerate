import type { Details } from "@/types/tmdb.types";

import SearchResult from "./SearchResult";

export default function SearchResultList({ results }: { results: Details[] }) {
  return (
    <div className="bg-background-accent shadow-small h-[350px] w-full overflow-auto rounded-lg border border-white/5 p-2">
      {results.map((result, index) => {
        return (
          <div key={index}>
            <SearchResult media={result} />
          </div>
        );
      })}
    </div>
  );
}
