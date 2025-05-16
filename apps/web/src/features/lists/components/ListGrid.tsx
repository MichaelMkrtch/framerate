import PosterGrid from "@web/components/PosterGrid";
import { useListItemStore } from "@web/store/collections/list-item-store";

export default function ListGrid({ isFetching }: { isFetching: boolean }) {
  const listItems = useListItemStore.use.listItems();

  return (
    <section
      className={`${listItems.length > 0 && "bg-background-darker overflow-auto border border-white/10"} w-4/5 rounded-md px-7 py-8`}
    >
      {!isFetching && listItems.length > 0 && (
        <PosterGrid
          media={listItems}
          isTooltipEnabled={false}
          classes="grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-3.5"
        />
      )}
      {!isFetching && !listItems && (
        <div className="flex size-full items-center justify-center">
          <p className="font-medium">
            Add your first film or series to this collection!
          </p>
        </div>
      )}
    </section>
  );
}
