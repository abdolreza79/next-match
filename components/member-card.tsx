import { Member } from '@/app/generated/prisma/client';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { calculateAge } from '@/lib/utils';
import LikeButton from './like-button';
import { fetchLikedMembers} from '@/actions/like-actions';
import { auth } from '@/auth';

export default async function MemberCard({ member }: { member: Member }) {
  const session  = await auth()
  if (!session?.user) {
    return null;
  }
  const sourceMembers = await fetchLikedMembers('source');

  const isLiked = sourceMembers.map((sourceMember) => sourceMember.userId).includes(member.userId);
  return (
    <Card className='relative py-0 gap-0  overflow-hidden'>
      <div className='relative overflow-hidden'>
        <Link href={`/members/${member.userId}`}>
          <Image
            src={member.image ?? '/images/user.jpeg'}
            alt='Event cover'
            width={150}
            height={0}
            className='w-full object-cover h-52 hover:scale-110 transition-transform duration-300 '
          />
        </Link>
      </div>
      <LikeButton
        isLiked={isLiked ? true : false}
        targetUserId={member.userId}
      />
      <div className='p-3 absolute bottom-0 left-0 right-0 from-black/80 bg-linear-to-t to-transparent  w-full text-white flex flex-col items-start gap-1'>
        <span className='font-semibold text-white'>
          {member.name},{calculateAge(member.dataOfBirth)}
        </span>
        <span className='text-sm'>{member.city}</span>
      </div>
    </Card>
  );
}
