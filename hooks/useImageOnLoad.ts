import { useState } from "react";

export default function useImageOnLoad() {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageOnLoad = () => setIsLoaded(true);

  const transitionStyles = {
    lowRes: {
      opacity: isLoaded ? 0 : 1,
      transition: "opacity 100ms ease-in 150ms",
    },
    highRes: {
      opacity: isLoaded ? 1 : 0,
      transition: "opacity 100ms ease-in 150ms",
    },
  };

  return { handleImageOnLoad, isLoaded, setIsLoaded, transitionStyles };
}
