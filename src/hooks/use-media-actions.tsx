import { useCallback, useEffect, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { debounce } from '@/lib/debounce';
import { updateReview } from '@/server/actions';
import { useReviewStore } from '@/store/details/review-store';

interface InitialReviewState {
  liked: boolean;
  watched: boolean;
}

export function useMediaActions(
  mediaType: 'movie' | 'tv',
  mediaId: number,
  initialState?: InitialReviewState | null,
) {
  const isLiked = useReviewStore.use.isLiked();
  const isWatched = useReviewStore.use.isWatched();
  const setIsLiked = useReviewStore.use.setIsLiked();
  const setIsWatched = useReviewStore.use.setIsWatched();

  useEffect(() => {
    if (initialState) {
      setIsLiked(initialState.liked);
      setIsWatched(initialState.watched);
    }

    return () => {
      setIsLiked(false);
      setIsWatched(false);
    };
  }, [
    initialState,
    initialState?.liked,
    initialState?.watched,
    setIsLiked,
    setIsWatched,
  ]);

  const mutation = useMutation({
    mutationFn: async ({
      field,
      value,
    }: {
      field: 'liked' | 'watched';
      value: boolean;
    }) => {
      return await updateReview({ mediaType, mediaId, field, value });
    },
    onSuccess: () => {},
    onError: (error, variables) => {
      const { field, value } = variables;
      toast.error(
        `Failed to update ${field === 'liked' ? 'like' : 'watch'} status`,
      );
      if (field === 'liked') setIsLiked(!value);
      if (field === 'watched') setIsWatched(!value);
      console.error(error);
    },
  });

  const debouncedMutateLike = useMemo(
    () => debounce(mutation.mutate, 1000),
    [mutation.mutate],
  );

  const debouncedMutateWatch = useMemo(
    () => debounce(mutation.mutate, 1000),
    [mutation.mutate],
  );

  const debouncedHandleClick = useCallback(
    (action: 'like' | 'watch', newValue: boolean) => {
      if (action === 'like') {
        debouncedMutateLike({ field: 'liked', value: newValue });
      } else if (action === 'watch') {
        debouncedMutateWatch({ field: 'watched', value: newValue });
      } else {
        toast.error('Unknown action');
      }
    },
    [debouncedMutateLike, debouncedMutateWatch],
  );

  return {
    isLiked,
    isWatched,
    debouncedHandleClick,
  };
}
