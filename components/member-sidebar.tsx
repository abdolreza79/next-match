'use client';

import { Member } from '@/app/generated/prisma/client';
import { Card, CardFooter, CardHeader } from './ui/card';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { calculateAge, cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';

export default function MemberSidebar({ member }: { member: Member }) {
  const pathname = usePathname();
  const basePath = `/members/${member.userId}`;
  const navLinks = [
    { name: 'Profile', href: `${basePath}` },
    { name: 'Photos', href: `${basePath}/photos` },
    { name: 'Chat', href: `${basePath}/chat` },
  ];

  return (
    <Card className='h-[80vh]'>
      <CardHeader className='flex flex-col gap-3 items-center justify-between'>
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
      </CardHeader>
      <div className='h-0.5 w-3/4 border border-purple-500 mx-auto bg-gray-300 my-3'></div>
      <CardFooter className='flex flex-col justify-between items-start h-full px-2'>
        <div className='flex flex-col gap-3 mt-5 pl-8'>
          {navLinks.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={cn('text-lg font-semibold text-gray-500', {
                'text-purple-500': pathname === href,
              })}
            >
              {name}
            </Link>
          ))}
        </div>
          <Button  asChild className='block w-full text-center border-2 text-purple-500 border-purple-500 bg-white'>
            <Link href={'/members'} className='text-lg font-semibold'>Go back</Link>
          </Button>
      </CardFooter>
    </Card>
  );
}
