import { getMembers } from '@/actions/members-actions';
import { MemberCard } from '@/components/member-card';

const MembersPage = async () => {
  const members = await getMembers();
  if (!members) {
    return (
      <section className='text-3xl font-semibold text-gray-500'>
        No members found
      </section>
    );
  }
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
      {members.map((member) => {
        return (
          <div key={member.id}>
            <MemberCard member={member} />
          </div>
        );
      })}
    </section>
  );
};

export default MembersPage;
