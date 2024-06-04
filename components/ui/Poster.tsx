import Image from "next/image";
import { useRef } from "react";

import useImageOnLoad from "@/hooks/useImageOnLoad";

const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

type PosterProps = {
  title: string;
  src: string;
  fetchSize: string;
  width: number;
  height: number;
  grid?: boolean;
};

export default function Poster({
  title,
  fetchSize,
  src,
  width,
  height,
}: PosterProps) {
  const boundingRef = useRef<DOMRect | null>(null);

  const { handleImageOnLoad, isLoaded, transitionStyles } = useImageOnLoad();

  let perspectiveClasses = "";
  if (isLoaded) {
    perspectiveClasses =
      "group rounded relative transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]";
  }

  return (
    <div className="w-fit [perspective:800px]">
      <div
        onMouseEnter={(event) => {
          boundingRef.current = event.currentTarget.getBoundingClientRect();
        }}
        onMouseLeave={() => (boundingRef.current = null)}
        onMouseMove={(event) => {
          if (!boundingRef.current) return;
          const x = event.clientX - boundingRef.current.left;
          const y = event.clientY - boundingRef.current.top;
          const xPercentage = x / boundingRef.current.width;
          const yPercentage = y / boundingRef.current.height;
          // converts the positions into degrees
          // x needs to be subtracted from 0.5 so all corners have the same behavior
          const xRotation = (0.5 - xPercentage) * 20;
          const yRotation = (yPercentage - 0.5) * 20;
          // x needs to rotate vertically so apply yRotation
          // y needs to rotate horizontally so apply xRotation
          event.currentTarget.style.setProperty(
            "--x-rotation",
            `${yRotation}deg`,
          );
          event.currentTarget.style.setProperty(
            "--y-rotation",
            `${xRotation}deg`,
          );
          event.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
          event.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
        }}
        className={perspectiveClasses}
      >
        {src && (
          <>
            <Image
              src={`${IMG_BASE_URL}w92${src}`}
              alt={`A poster from the film ${title}`}
              width={width}
              height={height}
              className="absolute h-[264px] w-44 rounded object-cover blur-[4px] drop-shadow [image-rendering:_pixelated]"
              style={transitionStyles.lowRes}
              priority
            />
            <Image
              onLoad={handleImageOnLoad}
              src={`${IMG_BASE_URL}${fetchSize}${src}`}
              alt={`A poster from the film ${title}`}
              width={width}
              height={height}
              className="relative top-0 h-[264px] w-44 select-none rounded object-cover drop-shadow"
              style={transitionStyles.highRes}
              priority
            />
          </>
        )}
        {/* the radial gradient is positioned according to mouse position */}
        <div className="pointer-events-none absolute inset-0 rounded drop-shadow group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.1)_15%,transparent_70%)]" />
      </div>
    </div>
  );
}
