import React from 'react';
import AuthButton from './auth-button';

const links = [
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
];

export default function AuthButtons() {
  return (
    <>
      {links.map((link) => (
        <AuthButton key={link.label} label={link.label} href={link.href} />
      ))}
    </>
  );
}
