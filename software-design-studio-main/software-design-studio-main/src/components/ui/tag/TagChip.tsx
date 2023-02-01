import { ArrowPathIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Subject, SubjectTag } from '@prisma/client';
import toast from 'react-hot-toast';
import { trpc } from 'utils/trpc';

interface Props {
  tag: SubjectTag;
  subjectId: Subject['id'];
}

export default function TagChip({ tag, subjectId }: Props) {
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation(['subject.deleteTag'], {
    onSuccess: () => utils.invalidateQueries(['subject.getAll']),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-6 items-center gap-1 rounded-full bg-gray-400 pl-2 pr-1 font-semibold hover:shadow-lg"
    >
      <span>{tag.name}</span>
      {isLoading ? (
        <ArrowPathIcon className="w-5 animate-spin" />
      ) : (
        <XCircleIcon
          onClick={() => mutate({ subjectId, tagId: tag.id })}
          className="w-5 text-gray-600 hover:text-gray-300"
        />
      )}
    </div>
  );
}
