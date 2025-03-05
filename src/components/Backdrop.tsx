import Image from "next/image";

import useImageOnLoad from "@/hooks/useImageOnLoad";

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

type BackdropProps = {
  collection?: boolean;
  alt: string;
  backdropPath: string;
};

export default function Backdrop({
  alt,
  backdropPath,
  collection = false,
}: BackdropProps) {
  const { handleImageOnLoad, isLoaded, transitionStyles } = useImageOnLoad();

  return (
    backdropPath && (
      <div className={`relative -z-10 m-auto h-auto w-full overflow-hidden`}>
        <Image
          onLoad={handleImageOnLoad}
          src={`${IMG_BASE_URL}original${backdropPath}`}
          alt={alt}
          width={1920}
          height={1080}
          className={`${isLoaded && "animate-fade-in"} ${collection ? "h-[450px]" : "h-auto"} w-full object-cover`}
          style={transitionStyles.highRes}
          loading="lazy"
        />
        {/* Tablet and Desktop shadow gradient */}
        <div
          className={`${collection ? "before:h-[550px]" : "md:before:h-[455px] lg:before:h-[675px] xl:before:h-[700px]"} before:backdrop-fade hidden before:pointer-events-none before:absolute before:top-0 before:block before:w-full before:bg-no-repeat md:block`}
        />
        {/* Mobile shadow gradient */}
        <div className="pointer-events-none absolute top-0 block size-full bg-gradient-to-t from-neutral-900 via-transparent to-transparent bg-no-repeat md:hidden" />
      </div>
    )
  );
}
