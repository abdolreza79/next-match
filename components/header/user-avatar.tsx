'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';

export function UserAvatar() {
  const { data: session } = useSession();
  return (
    <Avatar className=''>
      {session?.user?.image ? (
        <AvatarImage
          src='/images/user.png'
          alt='user-image'
          className='rounded-full'
        />
      ) : (
        <AvatarFallback className='bg-white text-black capitalize'>
          {' '}
          {(session?.user?.name)?.split('')[0]|| 'U'}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
