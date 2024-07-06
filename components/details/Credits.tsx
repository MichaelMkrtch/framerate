type CreditsProps = {
  title: string;
  director: string | false;
  releaseDate: string;
};

export default function Credits({
  title,
  director,
  releaseDate,
}: CreditsProps) {
  return (
    <>
      <h2 className="font-gothic text-3xl tracking-wide md:text-5xl">
        {title}
      </h2>
      <div className="mt-2.5 font-jakarta text-sm md:text-lg">
        <span className="pr-2 text-sm md:text-base">
          {releaseDate.slice(0, 4)}
        </span>
        {director && (
          <span className="text-sm tracking-wide md:text-base">
            Directed by{" "}
            <p className="text-sm font-medium md:inline-block md:text-base">
              {director}
            </p>
          </span>
        )}
      </div>
    </>
  );
}
