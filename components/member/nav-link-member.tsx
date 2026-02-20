"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinkMember({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn('text-lg font-semibold text-gray-500', {
        'text-purple-500': pathname === href,
      })}
    >
      {name}
    </Link>
  );
}
