import LoadingComponent from '@/components/loading-component';
import MemberPhoto from '@/components/member-photo';

import { Suspense } from 'react';

export default async function PhotosPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <div className='h-[80vh]'>
      <div className='px-4 py-3  text-lg font-semibold text-purple-500  border-b border-purple-300'>
        Photos
      </div>
      <Suspense fallback={<LoadingComponent />}>
        <MemberPhoto userId={userId} />
      </Suspense>
    </div>
  );
}
