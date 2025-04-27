type CreditsProps = {
  title: string;
  director?: string | false;
  creator?: string | false;
  releaseDate: string | null;
};

export default function Credits({
  title,
  director,
  creator,
  releaseDate,
}: CreditsProps) {
  return (
    <>
      <h2 className="font-bespoke text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      <div className="mt-2.5 text-sm md:text-xl">
        <span className="pr-2 text-sm md:text-base">
          {releaseDate ? releaseDate.slice(0, 4) : ""}
        </span>
        <span className="tracking-wide md:text-base">
          {`${director ? "Directed by " : "Created by "}`}
          <p className="font-medium md:inline-block md:text-base">
            {director ? director : creator}
          </p>
        </span>
      </div>
    </>
  );
}
