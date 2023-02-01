import Button from 'components/ui/Button';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) return { redirect: { destination: '/' }, props: {} };
  return { props: {} };
};

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <main className="py-10">
        <div className="grid w-full place-items-center">
          <Button
            onClick={() => signIn('google')}
            title="Sign In With Google"
          />
        </div>
      </main>
    </>
  );
};

export default Login;
