import {
  InfinityGauntletIcon,
  AvengersIcon,
  DeathStarIcon,
  HPIcon,
  OneRingIcon,
  StarIcon,
} from "@/components/ui/Icons";

export default function getIcon(title: string) {
  if (title.includes("Harry Potter")) {
    return <HPIcon />;
  } else if (title.includes("Lord of the Rings")) {
    return <OneRingIcon />;
  } else if (title.includes("Star Wars")) {
    return <DeathStarIcon fill="#737373" classes="h-6 w-6" />;
  } else if (title.includes("Avengers")) {
    return <AvengersIcon />;
  } else if (title.includes("Avengers")) {
    return;
  } else {
    return <StarIcon fill="#FFD43B" classes="h-6 w-6" />;
  }
}
