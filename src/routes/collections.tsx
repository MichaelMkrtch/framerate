import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';

import Header from '@/components/header';
import Sidebar from '@/features/lists/components/sidebar';
import { getLists } from '@/server/lists';
import { useListStore } from '@/store/lists/list-store';

export const Route = createFileRoute('/collections')({
  component: CollectionPage,
});

function CollectionPage() {
  const setLists = useListStore.use.setLists();

  const { data: userLists, isFetching } = useQuery({
    queryKey: ['lists'],
    queryFn: () => getLists(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const listsAreReady = !isFetching && userLists && userLists.data;

  if (listsAreReady) {
    if (userLists.error) {
      toast('Something went wrong while getting your lists!');
    }

    if (userLists.data) {
      setLists(userLists.data);
    }
  }

  return (
    <div className="size-full">
      <Header title="Collections" />
      <main className="animate-fade-in flex h-[calc(100vh-var(--header-height))] gap-2.5 pb-6">
        <section className="flex w-[250px] flex-col">
          {listsAreReady && <Sidebar />}
        </section>

        <section className="mx-auto grow text-center font-medium">
          <p>Collection discovery coming soon</p>
        </section>
      </main>
    </div>
  );
}
