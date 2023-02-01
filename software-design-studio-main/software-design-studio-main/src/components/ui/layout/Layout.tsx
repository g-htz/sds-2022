import { Disclosure } from '@headlessui/react';
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { classNames } from 'utils/styles';
import ProfileDropdown from './ProfileDropdown';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Subjects', href: '/subjects' },
  { name: 'Admin Users', href: '/admin' },
  { name: 'Admin Subjects', href: '/admin/subjects' },
];

export default function Layout({ children }: Props) {
  const router = useRouter();
  const session = useSession();

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-cyan-700">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        height={32}
                        width={75}
                        src="/assets/uts-logo.png"
                        alt="UTS Logo"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <a
                              className={classNames(
                                router.pathname === item.href
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <ProfileDropdown />
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      onClick={() => router.push(item.href)}
                      className={classNames(
                        router.pathname === item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  {session.data?.user && (
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        {session.data.user.image ? (
                          <Image
                            width={40}
                            height={40}
                            className="rounded-full"
                            src={session.data.user.image}
                            alt="user photo"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-400">
                            <UserIcon />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {session.data.user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {session.data.user.email}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-3 space-y-1 px-2">
                    {session.data?.user ? (
                      <>
                        <Disclosure.Button
                          as="a"
                          onClick={() =>
                            router.push(`/user/${session.data?.user?.id}`)
                          }
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          Profile
                        </Disclosure.Button>
                        <Disclosure.Button
                          as="a"
                          onClick={() => signOut()}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          Sign Out
                        </Disclosure.Button>
                      </>
                    ) : (
                      <Disclosure.Button
                        as="a"
                        onClick={() => signIn('google')}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-white"
                      >
                        Sign In
                      </Disclosure.Button>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {children}
      </div>
    </>
  );
}
