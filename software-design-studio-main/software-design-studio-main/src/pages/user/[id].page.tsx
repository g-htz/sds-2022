import Page from 'components/ui/layout/Page';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: '/' }, props: {} };
  return { props: {} };
};

const UserProfile: NextPage = () => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>SRS</title>
        <meta name="description" content="Subject recommendation system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page title="User Profile">
        <div className="grid w-full justify-center">
          <div className="grid space-y-4 rounded-xl bg-slate-300 p-4 pt-0">
            <div>
              <h1 className="flex justify-center py-2 text-2xl">
                {session.data?.user?.name}
              </h1>
              <div className="grid justify-center">
                {session.data?.user?.image && (
                  <Image
                    src={session.data.user.image}
                    alt="user image"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                )}
              </div>
            </div>
            <div className="rounded-md bg-slate-200 p-2">
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};

export default UserProfile;
