'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { TriangleAlert } from 'lucide-react';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='w-full max-w-lg shadow-2xl shadow-gray-400'>
        <CardHeader>
          <div className='flex items-center justify-center gap-2'>
            <TriangleAlert className='size-6 animate-pulse text-red-500' />
            <h2 className='text-xl font-bold text-red-500'>Error</h2>
          </div>
          <p className='text-sm text-center'>Please try again later.</p>
        </CardHeader>
        <CardDescription className='text-red-500 text-center'>
          {error.message}
        </CardDescription>
        <CardFooter className=''>
          <Button onClick={() => reset()} className='block w-full' variant={'destructive'}>Try again</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
