'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <Link
      href={href}
      className={cn('text-white text-lg', {
        'text-yellow-400 font-bold': isActive,
      })}
    >
      {label}
    </Link>
  );
}


