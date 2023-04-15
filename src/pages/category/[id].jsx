import Link from "next/link";
import Image from "next/image";
import { client } from "@/libs/client";

const CategoryId = ({ blog, category }) => {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (blog.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }
  return (
    <div>
      {/* <h2>
        {category.name}
      </h2> */}
      <ul className="mb-16 md:flex md:flex-wrap">
        {blog.map((blog) => (
          <li key={blog.id} className="flex-[0_1_50%] px-4 pb-8">
            <article className="bg-white shadow-md transition duration-300 hover:shadow hover:translate-y-[1px]">
              <Link href={`/blog/${blog.id}`}>
                <Image className="object-cover object-center w-full h-[200px]" src={blog.ogimage.url} width={blog.ogimage.width} height={blog.ogimage.height} alt={blog.title} />
              </Link>
              <div className="bg-white p-[16px] min-h-[88px] text-[15px]">
                <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });
  const paths = data.contents.map((content) => `/category/${content.id}`);

  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", queries: { filters: `category[equals]${id}` } });
  // const categoryData = await client.get({ endpoint: "categories", queries: { filters: `category[equals]${id}` } });
  // console.log(categoryData);
  
  return {
    props: {
      blog: data.contents,
      // category: categoryData
    },
  };
};

export default CategoryId;