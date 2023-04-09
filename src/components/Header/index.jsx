// nextjs link import
import Link from "next/link";

const Header = () => {

  const navList = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Blog",
      path: "/blog/test-content-1"
    },
    {
      name: "About",
      path: "/about"
    },
  ]

  return (
    <header className="bg-primary text-white py-4 mb-[40px]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" legacyBehavior passHref>
            <a>JSgraph</a>
          </Link>
        </div>
        <nav className="flex items-center">
          <ul className="flex items-center">
            {navList.map((item, index) => {
              return (
                <li key={index} className="mr-4">
                  <Link href={item.path} legacyBehavior passHref>
                    <a>{item.name}</a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header