type AuthInputProps = {
  label: string;
  type: string;
  placeholder: string;
  autoFocus: boolean;
};

export default function Input({ label, ...props }: AuthInputProps) {
  return (
    <>
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        {...props}
        className="auth-input"
      />
    </>
  );
}
