import { useEffect, useState } from "react";

export default function RotatingQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const quotes = [
    "There's no place like home",
    "We've been expecting you",
    "This is an offer you can't refuse",
    "So, you've come at last",
    "This is the way",
    "Where we're going, we don't need roads",
    "My precious...",
  ];

  // Rotates the current quote
  useEffect(() => {
    if (currentIndex === quotes.length) {
      setCurrentIndex(0);
    }

    const interval = setInterval(() => {
      setCurrentIndex(currentIndex + 1);
    }, 4500);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, quotes.length]);

  return (
    <span className="block text-center text-[26px] font-medium">
      {quotes[currentIndex]}
    </span>
  );
}
