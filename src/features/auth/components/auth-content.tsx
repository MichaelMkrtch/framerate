export default function AuthContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section>
      <h1 className="mb-1.5 bg-gradient-to-r from-[#9370db] to-[#f4b541] bg-clip-text text-center text-[28px] font-extrabold text-transparent">
        {title}
      </h1>
      <p className="text-gray mx-auto mb-7 w-72 text-center text-sm font-medium tracking-wide">
        {description}
      </p>
    </section>
  );
}
