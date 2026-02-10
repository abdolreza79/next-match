import NavLink from './nav-link';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Matches', href: '/members' },
  { label: 'Lists', href: '/lists' },
  { label: 'Messages', href: '/messages' },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => (
        <NavLink key={link.label} label={link.label} href={link.href} />
      ))}
    </>
  );
}
