import { useMemo, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { trpc } from 'utils/trpc';
import toast from 'react-hot-toast';
import { Subject, SubjectTag } from '@prisma/client';
import CreateTagForm from './CreateTagForm';

interface Props {
  subjectId: Subject['id'];
  tags: SubjectTag[];
}

export default function TagField({ subjectId, tags }: Props) {
  const [query, setQuery] = useState('');
  const utils = trpc.useContext();

  const { data: allTags } = trpc.useQuery(['tag.getAll'], {
    initialData: [],
    onError: (error) => toast.error(error.message),
  });

  const setTags = trpc.useMutation(['subject.setTags'], {
    onSuccess: () => utils.invalidateQueries(['subject.getAll']),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const filteredTags = useMemo(() => {
    if (!allTags) return [];
    if (query === '') return allTags;
    return allTags.filter((tag) =>
      tag.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [allTags, query]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      className="relative font-normal"
    >
      <Combobox
        multiple
        value={tags}
        by={(a, b) => a.id === b.id}
        onChange={(values) =>
          setTags.mutate({
            subjectId,
            tags: values.map((value) => ({ id: value.id })),
          })
        }
      >
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            placeholder="Add tags"
            onChange={(e) => setQuery(e.target.value.trim())}
            className="h-8 w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Combobox.Options className="absolute z-10 mt-1 grid max-h-60 w-full overflow-auto rounded-md border-t-2 bg-white shadow">
          {filteredTags.length === 0 && (
            <>
              <li className="px-2 py-1 text-center text-sm">
                No matching tags
              </li>
              <hr />
              <li>
                <CreateTagForm value={query} />
              </li>
            </>
          )}
          {filteredTags.map((option) => (
            <Combobox.Option key={option.id} value={option}>
              {({ active, selected }) => {
                return (
                  <div
                    className={`flex items-center gap-3 px-2 py-1 ${
                      active && 'bg-cyan-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      readOnly
                      className="rounded border-gray-300 bg-gray-100 text-sky-600"
                    />
                    <p className={`text-sm ${selected && 'font-semibold'}`}>
                      {option.name}
                    </p>
                  </div>
                );
              }}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
