import React from 'react';

export default function LoadingComponent() {
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='size-12 md:size-24  border-t border-b border-purple-500 rounded-full animate-spin'></div>
    </div>
  );
}
