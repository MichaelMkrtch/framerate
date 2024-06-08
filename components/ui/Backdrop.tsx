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
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[675px] w-[1200px] max-w-full overflow-hidden">
        <Image
          src={`${IMG_BASE_URL}w300${backdrop_path}`}
          alt={`Still image from the film ${title}`}
          width={15}
          height={10}
          className="top-0 h-[675px] w-[1200px] object-cover [image-rendering:_pixelated]"
          style={transitionStyles.lowRes}
        />
        <Image
          onLoad={handleImageOnLoad}
          src={`${IMG_BASE_URL}original${backdrop_path}`}
          alt={`Still image from the film ${title}`}
          className="object-cover"
          style={transitionStyles.highRes}
          fill
          sizes="100vw"
          priority
        />
        <div className="before:pointer-events-none before:absolute before:top-0 before:block before:h-[675px] before:w-full before:bg-backdrop-shadow before:bg-no-repeat" />
      </div>
    )
  );
}
