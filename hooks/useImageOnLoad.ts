import { useState } from "react";

export default function useImageOnLoad() {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageOnLoad = () => setIsLoaded(true);

  const transitionStyles = {
    lowRes: {
      opacity: isLoaded ? 0 : 0.7,
      transition: "opacity 150ms ease-out 200ms",
    },
    highRes: {
      opacity: isLoaded ? 1 : 0,
      transition: "opacity 150ms ease-out 200ms",
    },
  };

  return { handleImageOnLoad, isLoaded, setIsLoaded, transitionStyles };
}
