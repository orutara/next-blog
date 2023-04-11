import Link from "next/link";
import { GlobalNav } from "@/components/GlobalNav";

export const Header = () => {
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
    <header className="mb-[40px]">
      <div className="bg-primary text-white py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" legacyBehavior passHref>
              <a>JSgraph</a>
            </Link>
          </div>
        </div>
      </div>
      <GlobalNav />
    </header>
  );
};
