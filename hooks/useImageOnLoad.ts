import { useState } from "react";

export default function useImageOnLoad() {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageOnLoad = () => setIsLoaded(true);

  const transitionStyles = {
    lowRes: {
      opacity: isLoaded ? 0 : 0.45,
      transition: "opacity 175ms ease-in 200ms",
    },
    highRes: {
      opacity: isLoaded ? 1 : 0,
      transition: "opacity 175ms ease-out 200ms",
    },
  };

  return { handleImageOnLoad, isLoaded, setIsLoaded, transitionStyles };
}
