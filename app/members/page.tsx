import Link from 'next/link'
import React from 'react'

const MembersPage = () => {
  return (
    <section>
        <h1 className='text-3xl'>MembersPage</h1>
        <Link className='text-blue-500' href={'/'}>Home</Link>
    </section>
  )
}

export default MembersPage