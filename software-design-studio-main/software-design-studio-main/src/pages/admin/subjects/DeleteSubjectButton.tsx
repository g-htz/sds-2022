import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Subject } from '@prisma/client';
import toast from 'react-hot-toast';
import { trpc } from 'utils/trpc';

interface Props {
  subjectId: Subject['id'];
}

export default function DeleteSubjectButton({ subjectId }: Props) {
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation(['subject.delete'], {
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.name} deleted`);
      utils.invalidateQueries(['subject.getAll']);
    },
  });

  return (
    <div className="h-12 p-1">
      <button
        onClick={() => mutate({ id: subjectId })}
        disabled={isLoading}
        className="aspect-square h-full scale-90 rounded-full bg-red-400 p-2
      hover:scale-100 hover:bg-red-500 active:scale-90 disabled:scale-90 disabled:bg-gray-500"
      >
        {isLoading ? <ArrowPathIcon className="animate-spin" /> : <TrashIcon />}
      </button>
    </div>
  );
}
