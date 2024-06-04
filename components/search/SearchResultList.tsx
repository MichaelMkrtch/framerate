import { useSuspenseQueries } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { type Film, type Results } from "@/types";

import { fetchDetails } from "@/utils/fetchDetails";

import SearchResult from "./SearchResult";

export default function SearchResultList({ results }: Results) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const idList: number[] = [];
  const updatedResults: Film[] = [];

  results.forEach((result) => idList.push(result.id));

  const detailsQuery = useSuspenseQueries({
    queries: idList.map((id) => ({
      queryKey: ["credits", id],
      queryFn: () => fetchDetails(id),
      staleTime: 2 * 6 * 1000,
      enabled: id >= 0,
    })),
  });

  if (detailsQuery) {
    detailsQuery.forEach((detailsResult, index) => {
      let resultData = results[index];

      if (detailsResult.data) {
        const directorList = detailsResult.data.directorList;

        if (directorList.length > 2) {
          resultData.director =
            directorList
              .map((director) => director.name)
              .slice(0, 2)
              .join(", ") + "...";
        } else if (directorList.length === 2) {
          resultData.director = directorList
            .map((director) => director.name)
            .join(", ");
        } else if (directorList.length === 1) {
          resultData.director = directorList[0].name;
        } else {
          resultData.director = "Unknown";
        }
        updatedResults.push(resultData);
      }
    });
  }

  // This ensures handleKeyPress is only updated when necessary,
  // rather than on every re-render
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (selectedIndex < results.length) {
        if (event.key === "ArrowUp" && selectedIndex > 0) {
          setSelectedIndex((prevIndex) => prevIndex - 1);
        }
        if (event.key === "ArrowDown" && selectedIndex < results.length - 1) {
          setSelectedIndex((prevIndex) => prevIndex + 1);
        }
        if (event.key === "Enter" && selectedIndex >= 0) {
        }
      } else {
        setSelectedIndex(0);
      }
    },
    [selectedIndex, results],
  );

  // This ensures we don't remove and re-add event listeners on
  // each re-render, but only when handler changes
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="mb-0.5 mt-2.5 cursor-default select-none border-t border-gray-750 pt-1 outline-none">
      {updatedResults.map((film, index) => {
        return (
          <SearchResult
            key={film.id}
            renderIndex={index}
            selectedIndex={selectedIndex}
            {...film}
          >
            {film.title}
          </SearchResult>
        );
      })}
    </div>
  );
}
