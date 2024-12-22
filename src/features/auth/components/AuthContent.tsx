export default function AuthContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section>
      <h1 className="text-[28px] text-center font-extrabold mb-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#9370db] to-[#f4b541]">
        {title}
      </h1>
      <p className="mb-7 text-center mx-auto w-72 text-sm tracking-wide text-gray font-medium">
        {description}
      </p>
    </section>
  );
}
