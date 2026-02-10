'use client';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AuthButton({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <Button
      className={cn(
        'rounded-sm  h-7 bg-white  text-gray-700 text-sm hover:bg-black hover:text-white',
        {
          'bg-yellow-400 text-white': isActive,
        },
      )}
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
