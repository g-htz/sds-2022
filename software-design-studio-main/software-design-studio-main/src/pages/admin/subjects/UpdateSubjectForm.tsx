import { Subject, SubjectTag } from '@prisma/client';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { trpc } from 'utils/trpc';

interface Props {
  subject: SubjectTag;
  onCancel: () => void;
}

export default function UpdateSubjectForm({ subject, onCancel }: Props) {
  const { register, handleSubmit, formState } = useForm<Subject>({
    defaultValues: subject,
  });
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation(['subject.update'], {
    onSuccess: (data) => {
      utils.invalidateQueries(['subject.getAll']);
      toast.success(`Subject ${data.name} updated`);
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="grid grid-cols-2 gap-3"
    >
      <div className="col-span-2 flex justify-end gap-3">
        <button
          type="submit"
          disabled={isLoading || !formState.isValid}
          className="w-20 rounded-lg bg-emerald-400 py-1 shadow hover:bg-emerald-500 hover:shadow-lg active:shadow-none disabled:text-gray-400 "
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => onCancel()}
          disabled={isLoading || !formState.isValid}
          className=" w-20 rounded-lg bg-orange-300 py-1 shadow hover:bg-orange-400 hover:shadow-lg active:shadow-none disabled:text-gray-400 "
        >
          Cancel
        </button>
      </div>
      <input
        type="number"
        placeholder="Number"
        {...register('number', { valueAsNumber: true })}
      />
      <input type="text" placeholder="Name" {...register('name')} />
      <textarea
        placeholder="Description"
        {...register('description')}
        className="col-span-2"
        rows={5}
      />
      <div className="col-span-2 flex justify-center"></div>
    </form>
  );
}
