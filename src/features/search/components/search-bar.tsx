import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { useEffect } from 'react';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  useEffect(() => {
    return () => setSearchQuery('');
  }, [setSearchQuery]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        name="search"
        placeholder="Search across film and tv"
        value={searchQuery}
        onChange={(e) => handleChange(e)}
        className="bg-background-lighter h-[46px] w-full rounded-lg border border-white/5 px-5 font-medium outline-none placeholder:tracking-wide placeholder:text-white/25"
      />
    </>
  );
}
