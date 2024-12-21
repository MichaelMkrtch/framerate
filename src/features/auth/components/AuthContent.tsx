export default function AuthForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section>
      <h1 className="text-[28px] font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#9370db] to-[#f4b541]">
        {title}
      </h1>
      <p className="mb-4 w-72 text-center text-sm tracking-wide text-gray font-medium">
        {description}
      </p>
    </section>
  );
}
