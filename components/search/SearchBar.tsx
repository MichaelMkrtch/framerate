import { MagnifyingGlassIcon } from "../ui/Icons";

export default function SearchBar() {
  return (
    <div className="flex justify-center">
      <div className="mx-4 flex pr-2">
        <MagnifyingGlassIcon className="my-auto" />
      </div>
      <input
        type="text"
        className="w-full bg-[#232323] py-2 font-medium outline-none placeholder:font-medium placeholder:tracking-wide placeholder:text-[#434343]"
      />
    </div>
  );
}
