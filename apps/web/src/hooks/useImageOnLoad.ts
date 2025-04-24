import { useState } from "react";

export default function useImageOnLoad() {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageOnLoad = () => setIsLoaded(true);

  const transitionStyles = {
    lowRes: {
      opacity: isLoaded ? 0 : 1,
    },
    highRes: {
      opacity: isLoaded ? 1 : 0,
    },
  };

  return { handleImageOnLoad, isLoaded, setIsLoaded, transitionStyles };
}
