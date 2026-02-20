'use client';
import { HeartIcon, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toggleLike } from '@/actions/like-actions';
import { useTransition } from 'react';

export default function LikeButton({
  targetUserId,
  isLiked,
}: {
  isLiked: boolean;
  targetUserId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const clickHandler = () => {
    startTransition(async () => {
      await toggleLike(targetUserId);
    });
  };

  return (
    <>
      {isPending ? (
        <Loader className='absolute top-3 right-3 z-10 size-5 animate-spin text-white' />
      ) : (
        <HeartIcon
          className={cn(
            'absolute top-3 right-3 z-10 size-5 transition-colors duration-500 text-red-500 cursor-pointer',
            {
              'fill-red-500 ': isLiked,
            },
          )}
          onClick={clickHandler}
        />
      )}
    </>
  );
}
