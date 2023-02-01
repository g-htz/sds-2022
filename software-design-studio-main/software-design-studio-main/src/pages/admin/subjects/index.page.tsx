import { GetServerSideProps, NextPage } from 'next';
import Page from 'components/ui/layout/Page';
import CreateSubjectForm from './CreateSubjectForm';
import { trpc } from 'utils/trpc';
import { prisma } from '../../../server/db/client';
import type { Subject } from '@prisma/client';
import SubjectItem from './SubjectItem';
import DeleteSubjectButton from './DeleteSubjectButton';
import { getSession } from 'next-auth/react';

interface Props {
  subjects: Subject[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.user?.role !== 'ADMIN')
    return { redirect: { destination: '/' }, props: {} };
  const subjects = await prisma.subject.findMany({
    orderBy: { number: 'asc' },
    include: { tags: { orderBy: { name: 'asc' } } },
  });
  return { props: { subjects } };
};

const Subjects: NextPage<Props> = ({ subjects }) => {
  const { data } = trpc.useQuery(['subject.getAll'], {
    placeholderData: subjects,
  });

  return (
    <Page title="Subjects">
      <h2 className="mb-3 text-lg">Add Subject</h2>
      <CreateSubjectForm />
      <hr className="my-5" />

      <h2 className="mb-3 text-lg">Subjects</h2>
      <ul className="grid gap-5">
        {data?.map((subject) => (
          <li key={subject.id} className="flex w-full gap-3">
            <SubjectItem subject={subject} />
            <DeleteSubjectButton subjectId={subject.id} />
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default Subjects;
