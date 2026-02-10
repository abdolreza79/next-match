import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  return (
    <section className='space-y-3'>
      <h1 className='text-3xl'>HomePage</h1>
      <Button className='bg-blue-500 rounded-sm text-white h-7' asChild>
        <Link href={'/members'}>Members</Link>
      </Button>
    </section>
  );
};

export default HomePage;
