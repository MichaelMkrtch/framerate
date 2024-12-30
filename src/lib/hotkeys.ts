import { redirect } from "next/navigation";

const keys = new Set();

export function handleKeyDown(event: KeyboardEvent) {
  keys.add(event.key.toLowerCase());
  checkCombination();
}

export function handleKeyUp() {
  if (keys.size === 2) {
    keys.clear();
  }
}

function checkCombination() {
  if (keys.has("g")) {
    if (keys.has("h")) {
      redirect("/");
    }

    if (keys.has("l")) {
      redirect("/lists");
    }

    if (keys.has("c")) {
      redirect("/collection");
    }

    if (keys.has("p")) {
      redirect("/preferences");
    }
  }
}
