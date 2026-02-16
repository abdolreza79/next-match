import { Member } from '@/app/generated/prisma/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { calculateAge } from '@/lib/utils';

export function MemberCard({ member }: { member: Member }) {
  return (
    <Link href={`/members/${member.userId}`}>
      <Card className='relative py-0 gap-0  overflow-hidden'>
        <div className=' overflow-hidden'>
          <Image
            src={member.image ?? '/images/user.jpeg'}
            alt='Event cover'
            width={150}
            height={0}
            className='w-full object-cover h-52 hover:scale-110 transition-transform duration-300 '
          />
        </div>
        <div className='p-3 absolute bottom-0 left-0 right-0 from-black/80 bg-linear-to-t to-transparent  w-full text-white flex flex-col items-start gap-1'>
          <span className='font-semibold text-white'>
            {member.name},{calculateAge(member.dataOfBirth)}
          </span>
          <span className='text-sm'>{member.city}</span>
        </div>
      </Card>
    </Link>
  );
}
