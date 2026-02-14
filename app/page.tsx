import { signInUser } from '@/actions/auth-actions';
import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const HomePage = async() => {
  const session = await auth()
  return (
    <section className='space-y-3'>
      <h1 className='text-3xl'>HomePage</h1>
      <h3 className='text-xl font-semibold'>User data</h3>
      {session?.user ? (
        <pre className=' p-2 rounded'>{JSON.stringify(session.user, null, 2)}</pre>
      ) : (
        <p>No signed in user</p>
      )}
      <Button className='bg-blue-500 rounded-sm text-white h-7' asChild>
        <Link href={'/members'}>Members</Link>
      </Button>
    </section>
  );
};

export default HomePage;
