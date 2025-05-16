import type { ActiveList } from "@web/types/lists";

import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { formatElapsedTime } from "@web/lib/utils";
import { Route as CollectionPageRoute } from "@web/routes/(user)/$username/collections/$slug.index";
import { useActiveListStore } from "@web/store/collections/active-list-store";

import { toast } from "sonner";

export default function ListDescription() {
  const { username } = CollectionPageRoute.useParams();

  const [hovering, setHovering] = useState(false);

  const activeList = useActiveListStore.use.activeList();

  return (
    <div className="mb-8">
      <h2 className="mb-2 h-7 text-xl font-bold">{activeList?.name}</h2>
      <h3 className="text-gray mb-0.5 font-medium">
        Collection by{" "}
        <Link
          to="/home"
          className="hover:text-foreground font-bold opacity-100 transition-colors duration-200"
        >
          {username}
        </Link>
      </h3>

      <p
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="text-medium text-gray relative h-5 w-fit cursor-default text-sm"
      >
        {getElapsedTimeText(hovering, activeList)}
      </p>
    </div>
  );
}

function getElapsedTimeText(hovering: boolean, activeList: ActiveList | null) {
  let elapsedCreateTime = "";
  let elapsedUpdateTime = "";

  try {
    if (activeList?.updatedAt && !elapsedUpdateTime) {
      const updatedAt = formatElapsedTime(activeList.updatedAt);
      elapsedUpdateTime = updatedAt;
    }

    if (activeList?.createdAt && !elapsedCreateTime) {
      const createdAt = formatElapsedTime(activeList.createdAt);
      elapsedCreateTime = createdAt;
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error("Something went wrong while calculating elapsed time!");
    }
  }

  if (hovering && elapsedUpdateTime) {
    return `Published ${elapsedCreateTime} ago`;
  }

  if (elapsedUpdateTime) {
    return `Updated ${elapsedUpdateTime} ago`;
  }

  if (!elapsedUpdateTime) {
    return `Published ${elapsedCreateTime} ago`;
  }
}
