import { GetServerSideProps, NextPage } from 'next';
import { trpc } from 'utils/trpc';
import { TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { User } from '@prisma/client';
import Image from 'next/image';
import UserRoleForm from './UserRoleForm';
import Page from 'components/ui/layout/Page';
import { getSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.user?.role === 'ADMIN') return { props: {} };
  return { redirect: { destination: '/' }, props: {} };
};

const Admin: NextPage = () => {
  const { data: users, isLoading } = trpc.useQuery(['admin.getUsers']);

  return (
    <Page title="Admin Settings">
      <div className="rounded bg-slate-200 p-4">
        <h2 className="mb-3 text-lg">Users</h2>
        <ul className="grid gap-3">
          {isLoading && <p>Loading users...</p>}
          {users &&
            users.map((user) => <UserListItem key={user.id} user={user} />)}
        </ul>
      </div>
    </Page>
  );
};

export default Admin;

interface UserListItemProps {
  user: User;
}

function UserListItem({ user }: UserListItemProps) {
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation(['admin.deleteUser'], {
    onSuccess: () => {
      utils.invalidateQueries(['admin.getUsers']);
    },
  });

  return (
    <li className="flex gap-4">
      <div
        className={`flex w-full justify-between gap-4 rounded-xl p-2 hover:bg-slate-400 ${
          isLoading ? 'bg-gray-500' : 'bg-slate-300'
        }`}
      >
        <div className="flex gap-4">
          <div className="grid aspect-square h-full place-items-center rounded-full bg-gray-300">
            {user.image && (
              <Image
                src={user.image}
                width={50}
                height={50}
                alt={`${user.name} image`}
                className="aspect-square h-full rounded-full"
              />
            )}
          </div>
          <div>
            <p>{user.name}</p>
            <p className="text-xs">{user.email}</p>
          </div>
        </div>
        <UserRoleForm user={user} />
      </div>
      <button
        onClick={() => mutate({ id: user.id })}
        disabled={isLoading}
        className="aspect-square h-full scale-90 rounded-full bg-red-400 p-3
        hover:scale-100 hover:bg-red-500 active:scale-90 disabled:scale-90 disabled:bg-gray-500"
      >
        {isLoading ? <ArrowPathIcon className="animate-spin" /> : <TrashIcon />}
      </button>
    </li>
  );
}
