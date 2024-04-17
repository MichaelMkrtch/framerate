import { MagnifyingGlassIcon } from "../ui/Icons";

export default function SearchBar() {
  return (
    <div className="flex justify-center">
      <div className="mx-4 flex pr-2">
        <MagnifyingGlassIcon className="my-auto" />
      </div>
      <input
        id="title"
        type="text"
        name="title"
        placeholder="Search"
        required
        className="bg-gray-850 placeholder:text-gray-750 w-full py-2 font-medium outline-none placeholder:font-medium placeholder:tracking-wide"
      />
    </div>
  );
}
