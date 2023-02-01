import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { trpc } from 'utils/trpc';

interface Props {
  value: string;
}

export default function CreateTagForm({ value }: Props) {
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation(['tag.create'], {
    onSuccess: () => utils.invalidateQueries(['tag.getAll']),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex h-10 justify-between px-2 py-2">
      <p>{value}</p>
      <button
        onClick={() => mutate({ name: value })}
        disabled={isLoading}
        className="aspect-square h-full rounded bg-sky-400 p-1 shadow-lg hover:bg-sky-500 active:shadow-none disabled:bg-gray-400"
      >
        {isLoading ? (
          <ArrowPathIcon className="h-full animate-spin" />
        ) : (
          <PlusIcon className="h-full font-bold" />
        )}
      </button>
    </div>
  );
}
