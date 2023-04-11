import Link from "next/link";

export const GlobalNav = () => {
  const navList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Blog",
      path: "/blog/test-content-1",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  return (
    <div className="bg-white">
      <nav className="max-w-6xl mx-auto flex items-center">
        <ul className="flex items-center">
          {navList.map((item, index) => {
            return (
              <li key={index} className="mr-3">
                <Link href={item.path} legacyBehavior passHref>
                  <a className="inline-block p-4">{item.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
