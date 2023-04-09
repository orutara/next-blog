import { Author } from '@/components/Author'
import { CategoryList } from '@/components/CategoryList'

const Sidebar = () => {
  return (
    <aside className="pb-8 mx-4">
      <Author />
      <CategoryList />
    </aside>
  )
};

export default Sidebar;
