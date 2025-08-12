import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ArrowLeftCircle } from 'lucide-react';

import EditListForm from '@/features/lists/components/edit-list-form';
import { getListData } from '@/server/lists';

export const Route = createFileRoute(
  '/(user)/$username/collections/$slug/edit',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { username, slug } = Route.useParams();

  const [returnSlug, setReturnSlug] = useState(slug);

  const navigate = useNavigate();

  const { data: listData } = useQuery({
    queryKey: ['list-items', username, slug],
    queryFn: () => getListData(username, slug),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  function handleClick() {
    navigate({ to: `/${username}/collections/${returnSlug}` });
  }

  return (
    <div>
      <header className="mt-9 mb-10 flex items-center border-b border-white/[0.08]">
        <h1 className="mb-4 text-[22px] font-semibold">Edit Collection</h1>
      </header>

      <main>
        <button onClick={handleClick}>
          <ArrowLeftCircle
            size={26}
            strokeWidth={1.5}
            className="text-gray mb-6 cursor-pointer transition-colors duration-200 hover:text-white"
          />
        </button>
        {listData && (
          <div className="grid grid-cols-[500px,1fr] gap-5">
            <EditListForm listData={listData} setReturnSlug={setReturnSlug} />
            <div className="bg-background-light flex h-[320px] items-center justify-center rounded-md">
              <p className="text-base font-medium">Image upload coming soon!</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
