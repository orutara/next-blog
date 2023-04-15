import Link from "next/link";
import Image from "next/image";
import { GlobalNav } from "@/components/molecules/GlobalNav";

export const Header = () => {

  return (
    <header className="mb-[40px]">
      <div className="bg-primary text-white pt-[18px] pb-[14px]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center justify-center w-full lg:justify-start">
            <Link href="/" legacyBehavior passHref>
              <a><Image src="/logo.svg" alt="" width={100} height={20} /></a>
            </Link>
          </div>
        </div>
      </div>
      <GlobalNav />
    </header>
  );
};
