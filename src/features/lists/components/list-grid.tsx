import type { List, ListItem } from '@/types/lists';

import { useEffect, useState } from 'react';

import PosterGrid from '@/components/poster-grid';

type ListData = {
  list: List;
  isLiked: boolean;
  isSaved: boolean;
  listItems: ListItem[];
};

type ListGridProps = {
  listData: ListData | undefined;
  isFetching: boolean;
};

export default function ListGrid({ listData, isFetching }: ListGridProps) {
  const [displayData, setDisplayData] = useState<ListItem[]>();
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // This method of assigning query data to local state is necessary to prevent
  // component flashing when the cache is invalidated due to list actions (like/save)
  useEffect(() => {
    if (listData && !initialDataLoaded) {
      setDisplayData(listData.listItems);
      setInitialDataLoaded(true);
    }
  }, [listData, initialDataLoaded]);

  return (
    <section
      className={`${displayData && displayData.length > 0 && 'bg-background-dark overflow-auto border border-white/10'} order-2 rounded-md p-4 md:order-1 md:w-4/5 md:px-7 md:py-8`}
    >
      {displayData && displayData.length > 0 && (
        <PosterGrid
          media={displayData}
          isTooltipEnabled={false}
          classes="grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-3.5"
        />
      )}
      {(!isFetching && !displayData) ||
        (displayData?.length === 0 && (
          <div className="flex size-full items-center justify-center">
            <p className="font-medium">
              Add your first film or series to this collection!
            </p>
          </div>
        ))}
    </section>
  );
}
