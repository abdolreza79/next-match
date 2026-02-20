import { Member } from '@/app/generated/prisma/client';
import { calculateAge } from '@/lib/utils';
import Image from 'next/image';

export default function NavProfileHeader({ member }: { member: Member }) {
  return (
    <>
      <div className='w-44 h-44 rounded-full overflow-hidden mx-auto'>
        <Image
          src={member?.image || '/images/user.jpeg'}
          alt='user-image'
          width={110}
          height={0}
          className='w-full object-cover h-full'
        />
      </div>
      <span className='text-lg font-semibold'>
        {member.name},{calculateAge(member.dataOfBirth)}
      </span>
      <span className='text-center text-sm italic'>
        {member.city},{member.country}
      </span>
    </>
  );
}
