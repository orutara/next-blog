import { client } from "@/libs/client";
import Link from "next/link"

export const CategoryList = ({ category }) => {
  
  return (
    <div className="bg-white py-8 px-5 mb-8">
    <p className="text-center mb-4 font-bold">Category</p>
    <ul className="text-sm leading-5">
      {
        !category 
        ? `Loading...`
        : category.map((category) => {
          return ( <li key={category.id}>
          <Link href={`/category/${category.id}`} legacyBehavior>
            <a className="block py-2 my-1 pl-2 hover:bg-hover">{category.name}</a>
          </Link>
        </li>
        );
      })}
    </ul>
  </div>
  );
};

export const getStaticProps = async () => {
  // カテゴリーコンテンツの取得
  const categoryData = await client.get({ endpoint: "categories" });
  console.log(categoryData);

  return {
    props: {
      category: categoryData.contents,
    },
  };
};
