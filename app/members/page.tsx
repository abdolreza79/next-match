import Link from 'next/link'
import { auth } from '@/auth';

const MembersPage = async() => {
  const session = await auth();
  console.log(session)
  return (
    <section>
        <h1 className='text-3xl'>MembersPage</h1>
        <Link className='text-blue-500' href={'/'}>Home</Link>
    </section>
  )
}

export default MembersPage