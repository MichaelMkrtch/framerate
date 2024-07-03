type DetailsProps = {
  tagline: string;
  overview: string;
};

export default function Details({ tagline, overview }: DetailsProps) {
  return (
    <>
      <h3 className="text-balance text-sm font-light uppercase tracking-wide">
        {tagline}
      </h3>
      <p className="mt-2 text-pretty leading-normal lg:mt-2.5">{overview}</p>
    </>
  );
}
