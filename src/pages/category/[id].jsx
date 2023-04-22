import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { client } from "@/libs/client";

const CategoryId = ({ blog, category }) => {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (blog.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }
  return (
    <>
      <Head>
        <title>{category.name} | LPgraph - フロントエンド生存戦略</title>
        <meta
          name="description"
          content={`${category.name}のカテゴリー記事 | LPgraph - フロントエンド生存戦略`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <div className="px-4">
          <h1 className="text-[24px] font-semibold mb-[20px]">
            {category.name}に関する記事一覧
          </h1>
        </div>
        <hr className="border-t-2 text-white mb-[20px]" />
        <ul className="mb-16 md:flex md:flex-wrap">
          {blog.map((blog) => (
            <li key={blog.id} className="flex-[0_1_50%] px-4 pb-8">
              <article className="bg-white shadow-md transition duration-300 hover:shadow hover:translate-y-[1px]">
                <Link href={`/blog/${blog.id}`}>
                  <Image
                    className="object-cover object-center w-full h-[200px]"
                    src={blog.ogimage?.url ?? "/img_noimage.png"}
                    width={blog.ogimage?.width ?? 330}
                    height={blog.ogimage?.height ?? 200}
                    alt={blog.title}
                  />
                </Link>
                <div className="bg-white p-[16px] min-h-[88px] text-[15px]">
                  <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });
  const paths = data.contents.map((content) => `/category/${content.id}`);

  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    queries: { filters: `category[equals]${id}` },
  });
  const categoryData = await client.get({
    endpoint: "categories",
    queries: { filters: `id[equals]${data.contents[0].category.id}` },
  });

  return {
    props: {
      blog: data.contents,
      category: categoryData.contents[0],
    },
  };
};

export default CategoryId;
