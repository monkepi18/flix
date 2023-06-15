import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';

import Billboard from '@/components/Billboard';
import Navbar from '@/components/Navbar';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Billboard />
    </>
  )
}