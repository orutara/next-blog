import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';

export const GlobalNav = () => {
  const navList = [
    {
      name: "Career",
      categoryId: "career",
    },
    {
      name: "Code",
      categoryId: "code",
    },
    {
      name: "Design",
      categoryId: "design",
    },
  ];

  return (
    <div className="bg-white">
      <nav className="max-w-6xl mx-auto flex items-center">
        <ul className="flex items-center whitespace-nowrap overflow-x-scroll hidden-scrollbar">
          <li>
            <Link href="/" legacyBehavior passHref>
              <a className="py-3 px-5 relative after:content-['|'] after:text-[#cccccc] after:absolute after:right-0"><HomeIcon style={{ width: '18px', height: '18px' }} /></a>
            </Link>
          </li>
          {navList.map((item, index) => {
            return (
              <li key={index} className="[&:last-child>a::after]:content-[none]">
                <Link href={`/category/${item.categoryId}`} legacyBehavior passHref>
                  <a className="py-3 px-6 flex items-center font-semibold relative after:content-['|'] after:text-[#cccccc] after:absolute after:right-0 after:font-normal last-of-type:after:contents-none">{item.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
