import Image from "next/image";

import useImageOnLoad from "@/hooks/useImageOnLoad";

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

type BackdropProps = {
  title: string;
  backdrop_path: string;
};

export default function Backdrop({ title, backdrop_path }: BackdropProps) {
  const { handleImageOnLoad, transitionStyles } = useImageOnLoad();

  return (
    backdrop_path && (
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-auto w-full overflow-hidden">
        <Image
          src={`${IMG_BASE_URL}w300${backdrop_path}`}
          alt={`Still image from the film ${title}`}
          width={15}
          height={10}
          className="h-auto w-full object-cover [image-rendering:_pixelated] md:h-auto"
          style={transitionStyles.lowRes}
        />
        <Image
          onLoad={handleImageOnLoad}
          src={`${IMG_BASE_URL}original${backdrop_path}`}
          alt={`Still image from the film ${title}`}
          className="absolute top-0 h-auto w-full object-cover"
          style={transitionStyles.highRes}
          width={3840}
          height={2160}
          priority
        />
        {/* Tablet and Desktop shadow gradient */}
        <div className="hidden before:pointer-events-none before:absolute before:top-0 before:block before:w-full before:bg-backdrop-shadow before:bg-no-repeat md:block md:before:h-[455px] lg:before:h-[530px] xl:before:h-[675px]" />
        {/* Mobile shadow gradient */}
        <div className="pointer-events-none absolute top-0 block h-full w-full bg-gradient-to-t from-gray-950 via-transparent to-transparent bg-no-repeat md:hidden" />
      </div>
    )
  );
}
