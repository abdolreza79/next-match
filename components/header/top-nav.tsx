import Logo from './logo';
import NavLinks from './nav-links';
import AuthButtons from './auth-buttons';

const TopNav = () => {
  return (
    <nav className='flex items-center'>
      <Logo />
      <div className='flex-1 flex items-center gap-4 '>
        <NavLinks/>
      </div>
      <div className='flex-1  flex  gap-2 items-center justify-end'>
        <AuthButtons/>
      </div>
    </nav>
  );
};

export default TopNav;
