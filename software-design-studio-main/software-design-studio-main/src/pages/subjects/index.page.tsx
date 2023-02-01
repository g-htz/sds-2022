import { GetStaticProps, NextPage } from 'next';
import Page from 'components/ui/layout/Page';
import { trpc } from 'utils/trpc';
import { prisma } from '../../server/db/client';
import type { Subject } from '@prisma/client';
import SubjectItem from './SubjectItem';

interface Props {
  subjects: Subject[];
}

export const getStaticProps: GetStaticProps = async () => {
  const subjects = await prisma.subject.findMany({
    orderBy: { number: 'asc' },
    include: { tags: { orderBy: { name: 'asc' } } },
  });
  const dayInSeconds = 60 * 60 * 24;
  return { props: { subjects }, revalidate: dayInSeconds };
};

const Subjects: NextPage<Props> = ({ subjects }) => {
  const { data } = trpc.useQuery(['subject.getAll'], {
    placeholderData: subjects,
  });

  return (
    <Page title="Subjects">
      <ul className="grid gap-5">
        {data?.map((subject) => (
          <SubjectItem key={subject.id} subject={subject} />
        ))}
      </ul>
    </Page>
  );
};

export default Subjects;
