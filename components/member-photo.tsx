import { CardDescription } from './ui/card';
import Image from 'next/image';
import { getMemberPhotosByUserId } from '@/actions/members-actions';

export default async function MemberPhoto({ userId }: { userId: string }) {
  const photos = await getMemberPhotosByUserId(userId);
  if (!photos) {
    return null;
  }
  return (
    <CardDescription className='p-5 leading-8 text-gray-600'>
      <div className='flex items-center flex-wrap gap-5'>
        {photos.map((photo) => {
          return (
            <div key={photo.id}>
              <Image
                src={photo.url}
                alt={'member-photo'}
                width={150}
                height={150}
                className='object-cover rounded-md'
              />
            </div>
          );
        })}
      </div>
    </CardDescription>
  );
}
