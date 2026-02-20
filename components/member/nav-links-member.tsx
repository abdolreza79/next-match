import { Member } from '@/app/generated/prisma/client';
import NavLinkMember from './nav-link-member';

export default function navLinksMember({ member }: { member: Member }) {
  const basePath = `/members/${member.userId}`;
  const navLinks = [
    { name: 'Profile', href: `${basePath}` },
    { name: 'Photos', href: `${basePath}/photos` },
    { name: 'Chat', href: `${basePath}/chat` },
  ];
  return (
    <div className='flex flex-col gap-3 mt-5 pl-8'>
      {navLinks.map(({ name, href }) => (
        <NavLinkMember key={href} name={name} href={href} />
      ))}
    </div>
  );
}
