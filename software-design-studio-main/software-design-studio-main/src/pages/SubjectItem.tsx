import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { inferQueryOutput } from 'utils/trpc';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  subject: inferQueryOutput<'subject.getAll'>[0];
}

export default function SubjectItem({ subject }: Props) {
  return (
    <div className="w-full">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="div"
              className="grid w-full items-center justify-between gap-2 rounded-lg bg-slate-200 px-4 py-3 text-left font-bold hover:bg-slate-300 md:flex"
            >
              <div className="flex flex-wrap gap-1">
                <span className="mr-3">
                  {subject.number} - {subject.name}
                </span>
                <div className="flex gap-1">
                  {subject.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex h-6 items-center gap-1 rounded-full bg-gray-400 p-2 font-normal hover:shadow-lg"
                    >
                      <span>{tag.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full gap-3 md:w-48">
                <ChevronDownIcon
                  className={`ml-auto w-5 transition duration-200 ${
                    open && 'rotate-180'
                  }`}
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
                    <p>{subject.description}</p>
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
