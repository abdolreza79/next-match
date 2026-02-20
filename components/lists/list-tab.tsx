import { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import TabContentList from './tab-content-list';
import LoadingComponent from '../loading-component';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'source', label: 'Members I have liked' },
  { id: 'target', label: 'Members like me' },
  { id: 'mutual', label: 'Mutual likes' },
];

export default function ListTab() {
  return (
    <div>
      <Tabs defaultValue='source' className='w-full'>
        <TabsList>
          {tabs.map((tab) => {
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`data-[state=active]:bg-purple-500 data-[state=active]:text-white`}
              >
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className='mt-6'>
            <Suspense fallback={<LoadingComponent />}>
              <TabContentList type={tab.id as 'source' | 'target' | 'mutual'} />
            </Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
