import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { client } from "@/libs/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const BlogId = ({ blog }) => {
  // 日付のフォーマット
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const day = dayjs.utc(blog.publishedAt).tz("Asia/Tokyo").format("YYYY/MM/DD");

  return (
    <>
      <Head>
        <title>{blog.title} | LPgraph - フロントエンド生存戦略</title>
        <meta name="description" content={blog.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="bg-white py-14 mb-16 mx-4 lg:mx-0">
        <p className="text-[13px] text-center text-mat mb-[20px] tracking-wider">
          {day}
        </p>
        <h1 className="text-dark text-center text-[18px] sm:text-[24px] font-bold leading-loose tracking-wider antialiased mb-[16px] px-4 lg:px-0 lg:mx-[40px]">
          {blog.title}
        </h1>
        <p className="text-[13px] text-link text-center mb-[32px]">
          <Link href={`/category/${blog.category.id}`}>{blog.category.id}</Link>
        </p>
        <Image
          src={blog.ogimage?.url ?? "/img_noimage.png"}
          alt={blog.title}
          className="w-full max-h-[450px] object-cover object-center mb-[40px]"
          width={750}
          height={450}
        />
        <article
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
          className="post px-4 lg:px-0 lg:mx-[40px]"
        />
      </div>
    </>
  );
};

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/${content.id}`);

  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export default BlogId;

// <div v-for="content in contents" :key="content.id" class="mb-5 md:mb-0">
//   <img class="ogimage" :src="`${content.ogimage.url}`" alt="" />
// </div>

// <p class="category">{{ category && category.name }}</p> -->
// <div class="container lg:px-12">
//   <div class="post" v-html="body"></div>
// </div>
