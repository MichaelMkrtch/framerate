type CreditsProps = {
  title: string;
  director: string;
  releaseDate: string;
};

export default function Credits({
  title,
  director,
  releaseDate,
}: CreditsProps) {
  return (
    <>
      <h2 className="pr-5 font-gothic text-5xl tracking-wide">{title}</h2>
      <div className="mt-2.5 font-jakarta text-lg">
        <span className="pr-2">{releaseDate.slice(0, 4)}</span>
        <span className="tracking-wide">Directed by {director}</span>
      </div>
    </>
  );
}
