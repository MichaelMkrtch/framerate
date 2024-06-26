import { type ControllerRenderProps, FieldPath } from "react-hook-form";

type InputProps = {
  type?: string;
  placeholder?: string;
  autocomplete?: string;
  field: ControllerRenderProps<
    {
      name: string;
      email: string;
      username: string;
      password: string;
    },
    any
  >;
};

export default function Input({
  field,
  placeholder = "",
  type = "text",
  autocomplete = "on",
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="block w-full rounded bg-neutral-800 px-2 py-2 font-medium outline-none ring-1 ring-white/10 placeholder:font-medium placeholder:text-gray-750"
      autoComplete={autocomplete}
      {...field}
    />
  );
}
