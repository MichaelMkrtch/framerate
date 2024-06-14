import {
  type ChangeEventHandler,
  type Dispatch,
  type SetStateAction,
  forwardRef,
  useEffect,
} from "react";

import { MagnifyingGlassIcon } from "../ui/Icons";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar({ searchQuery, setSearchQuery, onChange }, ref) {
    useEffect(() => {
      return () => setSearchQuery("");
    }, [setSearchQuery]);

    return (
      <div className="mx-3 flex justify-center md:mx-0">
        <div className="mx-4 hidden pr-2 md:flex">
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
          className="w-full rounded-full bg-neutral-800 px-[18px] py-2.5 font-medium outline-none placeholder:font-medium placeholder:text-gray-750 md:rounded-none md:bg-neutral-900 md:px-0"
        />
      </div>
    );
  },
);

export default SearchBar;
