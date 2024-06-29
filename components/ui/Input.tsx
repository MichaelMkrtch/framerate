import { type ControllerRenderProps } from "react-hook-form";

type Field =
  | ControllerRenderProps<
      {
        name: string;
        email: string;
        username: string;
        password: string;
      },
      any
    >
  | ControllerRenderProps<{ email: string; password: string }, any>;

type InputProps = {
  id: string;
  type?: string;
  placeholder?: string;
  autocomplete?: string;
  field: Field;
};

export default function Input({
  id,
  field,
  placeholder = "",
  type = "text",
  autocomplete = "on",
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="block w-full rounded bg-neutral-800 px-2 py-2 font-medium outline-none ring-1 ring-white/10 placeholder:select-none placeholder:font-medium placeholder:text-gray-750"
      autoComplete={autocomplete}
      {...field}
    />
  );
}
