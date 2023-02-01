import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import TagChip from 'components/ui/tag/TagChip';
import { AnimatePresence, motion } from 'framer-motion';
import { inferQueryOutput } from 'utils/trpc';
import TagField from '../../../components/ui/tag/TagField';
import UpdateSubjectForm from './UpdateSubjectForm';

interface Props {
  subject: inferQueryOutput<'subject.getAll'>[0];
}

export default function SubjectItem({ subject }: Props) {
  return (
    <div className="w-full">
      <Disclosure>
        {({ open, close }) => (
          <>
            <Disclosure.Button
              as="div"
              className="grid w-full items-center justify-between gap-2 rounded-lg bg-slate-200 px-4 py-2 text-left font-bold hover:bg-slate-300 md:flex"
            >
              <div className="flex flex-wrap gap-1">
                <span className="mr-3">
                  {subject.number} - {subject.name}
                </span>
                <div className="flex gap-1">
                  {subject.tags.map((tag) => (
                    <TagChip key={tag.id} subjectId={subject.id} tag={tag} />
                  ))}
                </div>
              </div>
              <div className="flex w-full gap-3 md:w-48">
                <TagField subjectId={subject.id} tags={subject.tags} />
                <ChevronDownIcon
                  className={`ml-auto w-5 transition ${open && 'rotate-180'}`}
                />
              </div>
            </Disclosure.Button>
            <AnimatePresence>
              {open && (
                <Disclosure.Panel
                  static
                  as={motion.div}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mb-4 mt-2 rounded-lg bg-slate-200 p-4">
                    <UpdateSubjectForm
                      subject={subject}
                      onCancel={() => close()}
                    />
                  </div>
                </Disclosure.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Disclosure>
    </div>
  );
}
