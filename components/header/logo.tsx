import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo-1.svg';

const Logo = () => {
  return (
    <Link href={'/'} className='flex-1 flex items-center gap-1'>
      <Image src={logo} alt='Logo' className='w-5 h-5 mr-1' />
      <span className='text-xl text-white'>Next</span>
      <span className='text-xl text-white'>Match</span>
    </Link>
  );
};

export default Logo;
