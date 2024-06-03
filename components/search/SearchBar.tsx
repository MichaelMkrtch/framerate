import { type ChangeEventHandler, forwardRef, useEffect } from "react";

import { MagnifyingGlassIcon } from "../ui/Icons";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar({ searchQuery, setSearchQuery, onChange }, ref) {
    useEffect(() => {
      return () => setSearchQuery("");
    }, [setSearchQuery]);

    return (
      <div className="flex justify-center">
        <div className="mx-4 flex pr-2">
          <MagnifyingGlassIcon classes="my-auto" />
        </div>
        <input
          ref={ref}
          id="title"
          type="text"
          name="title"
          placeholder="Search"
          value={searchQuery}
          onChange={onChange}
          className="bg-gray-850 placeholder:text-gray-750 w-full py-2 font-medium outline-none placeholder:font-medium placeholder:tracking-normal"
        />
      </div>
    );
  },
);

export default SearchBar;
