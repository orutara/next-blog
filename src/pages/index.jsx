import Image from "next/image";
import Link from "next/link";
import { client } from "@/libs/client";
import Head from "next/head";

const Home = ({ blog }) => {
  return (
    <>
    <Head>
      <title>JSgraph - フロントエンド生存戦略</title>
      <meta name="description" content="Blog" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div>
      <ul className="mb-16 md:flex md:flex-wrap">
        {blog.map((blog) => (
          <li key={blog.id} className="flex-[0_1_50%] px-4 pb-8">
            <article className="bg-white shadow-md transition duration-300 hover:shadow hover:translate-y-[1px]">
              <Link href={`/blog/${blog.id}`}>
                <Image className="object-cover object-center w-full h-[200px] sm:h-[280px] md:h-[135px] lg:h-[200px]" src={blog.ogimage.url} width={blog.ogimage.width} height={blog.ogimage.height} alt={blog.title} />
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

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  // カテゴリーコンテンツの取得
  // const categoryData = await client.get({ endpoint: "categories" });
  // タグコンテンツの取得
  // const tagData = await client.get({ endpoint: "tags" });

  return {
    props: {
      blog: data.contents,
      // category: categoryData.contents,
      // tag: tagData.contents,
    },
  };
};

export default Home;
