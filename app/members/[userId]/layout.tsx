import { getMemberByUserId } from '@/actions/members-actions';
import MemberSidebar from '@/components/member-sidebar';
import { Card } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function layout({
  params,
  children,
}: {
  params: Promise<{ userId: string }>;
  children: React.ReactNode;
}) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);
  if (!member) {
    return notFound();
  }
  return (
    <div className='grid grid-cols-12 h-[80vh] gap-4'>
      <div className='col-span-3 h-full  shadow-2xl shadow-gray-400'>
        <MemberSidebar member={member} />
      </div>
      <Card className='col-span-9 h-[80vh] p-0  shadow-2xl shadow-gray-400'>
        {children}
      </Card>
    </div>
  );
}
