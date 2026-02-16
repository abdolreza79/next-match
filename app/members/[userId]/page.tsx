import { getMemberByUserId } from '@/actions/members-actions';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const MemberDetailPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);
  if (!member) {
    return notFound();
  }
  return <div className='h-[80vh]'>
    <div className='px-4 py-3  text-lg font-semibold text-purple-500  border-b border-gray-300'>Profile</div>
    <CardDescription className='p-5 leading-8 text-gray-600'>{member.description}</CardDescription>
  </div>
};

export default MemberDetailPage;
