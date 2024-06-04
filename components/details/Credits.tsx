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
      <h2 className="font-gothic pr-5 text-5xl tracking-wide">{title}</h2>
      <div className="font-jakarta mt-2.5 text-lg">
        <span className="pr-2">{releaseDate}</span>
        <span>Directed by {director}</span>
      </div>
    </>
  );
}
