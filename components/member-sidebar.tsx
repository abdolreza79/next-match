import { Member } from '@/app/generated/prisma/client';
import { Card, CardFooter, CardHeader } from './ui/card';
import Link from 'next/link';
import { Button } from './ui/button';
import NavLinksMember from './member/nav-links-member';
import NavProfileHeader from './member/nav-profile-header';
import { Suspense } from 'react';
import LoadingComponent from './loading-component';

export default function MemberSidebar({ member }: { member: Member }) {
  return (
    <Card className='h-[80vh]'>
      <CardHeader className='flex flex-col gap-3 items-center justify-between'>
        <Suspense fallback={<LoadingComponent />}>
          <NavProfileHeader member={member} />
        </Suspense>
      </CardHeader>
      <div className='h-0.5 w-3/4 border border-purple-500 mx-auto bg-gray-300 my-3'></div>
      <CardFooter className='flex flex-col justify-between items-start h-full px-2'>
        <NavLinksMember member={member} />
        <Button
          asChild
          className='block w-full text-center border-2 text-purple-500 border-purple-500 bg-white'
        >
          <Link href={'/members'} className='text-lg font-semibold'>
            Go back
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
