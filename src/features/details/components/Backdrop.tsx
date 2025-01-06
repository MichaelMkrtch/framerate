import Image from "next/image";

import useImageOnLoad from "@/hooks/useImageOnLoad";

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

type BackdropProps = {
  title: string;
  backdropPath: string;
};

export default function Backdrop({ title, backdropPath }: BackdropProps) {
  const { handleImageOnLoad, isLoaded, transitionStyles } = useImageOnLoad();

  return (
    backdropPath && (
      <div className={`relative -z-10 m-auto h-auto w-full overflow-hidden`}>
        <Image
          onLoad={handleImageOnLoad}
          src={`${IMG_BASE_URL}original${backdropPath}`}
          alt={`Still image from ${title}`}
          width={1920}
          height={1080}
          className={`${isLoaded && "animate-fade-in"} h-auto w-full object-cover`}
          style={transitionStyles.highRes}
          priority
        />
        {/* Tablet and Desktop shadow gradient */}
        <div className="before:backdrop-fade hidden before:pointer-events-none before:absolute before:top-0 before:block before:w-full before:bg-no-repeat md:block md:before:h-[455px] lg:before:h-[675px] xl:before:h-[800px]" />
        {/* Mobile shadow gradient */}
        <div className="pointer-events-none absolute top-0 block size-full bg-gradient-to-t from-neutral-900 via-transparent to-transparent bg-no-repeat md:hidden" />
      </div>
    )
  );
}
