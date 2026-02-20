import Logo from './logo';
import NavLinks from './nav-links';
import AuthButtons from './auth-buttons';
import { auth, signOut } from '@/auth';
import UserMenu from './user-menu';

const TopNav = async () => {
  const session = await auth();
  return (
    <nav className='flex items-center'>
      <Logo />
      <div className='flex-1 hidden md:flex items-center gap-4 '>
        <NavLinks />
      </div>
      <div className='flex-1  flex  gap-2 items-center justify-end'>
        {session?.user ? (
          <div className='flex items-center gap-4'>
            <UserMenu />
            <form action={async () => {
              'use server';
              await signOut({redirectTo: '/'});

            }}>
              <button className='rounded-sm  h-7 w-20 bg-white   text-sm hover:bg-black hover:text-white'>
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <AuthButtons />
        )}
      </div>
    </nav>
  );
};

export default TopNav;
