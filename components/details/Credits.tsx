type CreditsProps = {
  title: string;
  director?: string | false;
  creator?: string | false;
  releaseDate: string;
};

export default function Credits({
  title,
  director,
  creator,
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
