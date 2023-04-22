import { Author } from '@/components/molecules/Author'
import { CategoryList } from '@/components/molecules/CategoryList'

export const Sidebar = () => {
  return (
    <aside className="pb-8 mx-4 lg:mx-0">
      <Author />
      {/* <CategoryList /> */}
    </aside>
  )
};