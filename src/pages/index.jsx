import Image from "next/image";
import Link from "next/link";
import { client } from "@/libs/client";

const Home = ({ blog, category, tag }) => {
  return (
    <div>
      <ul className="md:flex md:flex-wrap">
        {blog.map((blog) => (
          <li key={blog.id} className="flex-[0_1_50%] p-3">
            <div className="bg-white shadow-lg">
              <Image className="object-cover object-center w-full h-[200px]" src={blog.ogimage.url} width={blog.ogimage.width} height={blog.ogimage.height} alt={blog.title} />
              <div className="bg-white p-[16px] min-h-[88px] text-[15px]">
                <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* <ul>
        {tag.map((tag) => (
          <li key={tag.id}>
            <Link href={`/tag/${tag.id}`}>{tag.tags}</Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  // カテゴリーコンテンツの取得
  // const categoryData = await client.get({ endpoint: "categories" });
  // タグコンテンツの取得
  // const tagData = await client.get({ endpoint: "tags" });
  console.log(data.contents);

  return {
    props: {
      blog: data.contents,
      // category: categoryData.contents,
      // tag: tagData.contents,
    },
  };
};

export default Home;
