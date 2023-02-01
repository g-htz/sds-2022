import { Subject } from '@prisma/client';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { trpc } from 'utils/trpc';

export default function CreateSubjectForm() {
  const { register, handleSubmit, reset, formState } =
    useForm<Omit<Subject, 'id'>>();
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation(['subject.create'], {
    onSuccess: (data) => {
      utils.invalidateQueries(['subject.getAll']);
      toast.success(`Subject ${data.name} added`);
      reset();
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
      />
      <button
        type="submit"
        disabled={isLoading || !formState.isValid}
        className="col-span-2 disabled:text-gray-400"
      >
        Add
      </button>
    </form>
  );
}
