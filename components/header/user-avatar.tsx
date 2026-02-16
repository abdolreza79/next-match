'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProps {
  user: {
    name?: string | null;
    image?: string | null;
  };
}

export function UserAvatar({ user }: UserProps) {
  return (
    <Avatar className=''>
      {user?.image ? (
        <AvatarImage
          src={user.image}
          alt='user-image'
          className='rounded-full'
        />
      ) : (
        <AvatarFallback className='bg-white text-black capitalize'>
          {user?.name || 'USER'}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
