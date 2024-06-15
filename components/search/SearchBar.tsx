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
      <div className="mx-3 flex justify-center bg-transparent pb-1 md:mx-0 md:pb-0">
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
          className="fixed left-3 right-3 top-4 rounded-full bg-neutral-800 px-[18px] py-2.5 font-medium outline-none ring-1 ring-white/10 placeholder:font-medium placeholder:text-gray-750 md:static md:w-full md:rounded-none md:bg-neutral-900 md:px-0 md:ring-0"
          autoFocus
        />
      </div>
    );
  },
);

export default SearchBar;
