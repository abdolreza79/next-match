import { fetchLikedMembers } from '@/actions/like-actions';
import MemberCard from '../member-card';

export default async function TabContentList({ type }: { type: 'source' | 'target' | 'mutual' }) {
  const members = await fetchLikedMembers(type);
  if (!members.length) {
    return (
      <section className='text-3xl font-semibold text-gray-500'>
        No members found
      </section>
    );
  }
  return (
    <div className='flex items-center gap-4 flex-wrap p-3'>
      {members.map((member) => {
        return <MemberCard key={member.id} member={member}/>;
      })}
    </div>
  );
}
