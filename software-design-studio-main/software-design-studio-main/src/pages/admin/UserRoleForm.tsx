import { trpc } from 'utils/trpc';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { User } from '@prisma/client';
import { Listbox, Transition } from '@headlessui/react';

interface Props {
  user: User;
}

export default function UserRoleForm({ user }: Props) {
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation(['admin.updateUser'], {
    onSuccess: () => utils.invalidateQueries('admin.getUsers'),
  });

  const options = [
    { id: 0, label: 'User', value: 'USER' },
    { id: 1, label: 'Admin', value: 'ADMIN' },
  ];

  return (
    <Listbox
      value={user.role}
      onChange={(v) => mutate({ id: user.id, role: v })}
      disabled={isLoading}
    >
      {({ open }) => (
        <div className="relative w-28">
          <Listbox.Button
            className={`flex h-full w-full items-center justify-between rounded-t-2xl bg-white px-4 py-1 text-left text-sm capitalize transition-all duration-100 disabled:bg-slate-400
            ${open ? 'rounded-b-[0px]' : 'rounded-b-2xl'}
            `}
          >
            {user.role.toLocaleLowerCase()}
            {open ? (
              <ChevronUpIcon className="w-5" />
            ) : (
              <ChevronDownIcon className="w-5" />
            )}
          </Listbox.Button>
          <div className="absolute z-10 w-full">
            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="grid w-full overflow-hidden rounded-b border-t-2 bg-white shadow">
                {options.map((option) => (
                  <Listbox.Option key={option.id} value={option.value}>
                    {({ active, selected }) => (
                      <div
                        className={`flex  px-2 py-1 ${active && 'bg-cyan-200'}`}
                      >
                        <CheckIcon
                          className={`w-5 ${!selected && 'opacity-0'}`}
                        />
                        <p
                          className={`ml-2 text-sm ${
                            selected && 'font-semibold'
                          }`}
                        >
                          {option.label}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
