import { NextPage } from 'next';
import type { Subject, SubjectTag } from '@prisma/client';
import { trpc } from 'utils/trpc';

import Page from 'components/ui/layout/Page';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SubjectItem from './SubjectItem';

interface Props {
  subjectTags: SubjectTag[];
  subjects: Subject[];
}

const Recommendation: NextPage<Props> = () => {
  const [checked, setChecked] = useState<Array<String>>([]);
  const { data: tagData } = trpc.useQuery(['tag.getAll']);
  const { data: subjectData } = trpc.useQuery(['subject.getAll']);

  const handleCheck = (e: React.FormEvent<HTMLInputElement>) => {
    let updatedList = [...checked];

    if (e.currentTarget.checked) {
      updatedList = [...checked, e.currentTarget.value];
    } else {
      updatedList.splice(checked.indexOf(e.currentTarget.value), 1);
    }

    setChecked(updatedList);
  };

  const filteredSubjects = useMemo(
    () =>
      subjectData?.filter((subject) => {
        return subject.tags.some((tag) => checked.includes(tag.name));
      }),
    [subjectData, checked]
  );

  return (
    <>
      <Head>
        <title>SRS</title>
        <meta name="description" content="Subject recommendation system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page title="Recommendations">
        <div className="flex gap-28">
          <div className="space-y-5">
            <h1 className="text-xl">Select your interests</h1>
            {tagData?.map((tag) => (
              <div key={tag.id}>
                <input
                  type="checkbox"
                  value={tag.name}
                  id={tag.name}
                  onChange={handleCheck}
                  className="mx-2"
                />
                <label htmlFor={tag.name}>{tag.name}</label>
              </div>
            ))}
          </div>

          <div className="w-full space-y-5">
            <h1 className="text-xl">Your Recommendations:</h1>
            <AnimatePresence presenceAffectsLayout>
              {filteredSubjects?.map((subject) => (
                <motion.div
                  key={subject.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SubjectItem subject={subject} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Recommendation;
