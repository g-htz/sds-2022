import { Menu, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { classNames } from 'utils/styles';

export default function ProfileDropdown() {
  const session = useSession();

  if (session.data?.user)
    return (
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            {session.data.user.image ? (
              <Image
                width={40}
                height={40}
                className="rounded-full"
                src={session.data.user.image}
                alt="user photo"
              />
            ) : (
              <div className="h-8 w-8 bg-gray-400">
                <UserIcon />
              </div>
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <>
                  <Link href={`/user/${session.data.user?.id}`}>
                    <a
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      Profile
                    </a>
                  </Link>
                  <a
                    onClick={() => signOut()}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    Sign Out
                  </a>
                </>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );

  return (
    <button
      onClick={() => signIn('google')}
      className="ml-6 rounded-md bg-cyan-400 px-3 py-2 text-sm font-medium shadow"
    >
      Sign In
    </button>
  );
}
