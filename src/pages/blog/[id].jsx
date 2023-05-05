import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const Blog = (props) => {
  // 日付のフォーマット
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const day = dayjs.utc(props.post.date).tz("Asia/Tokyo").format("YYYY/MM/DD");
  const modifiedDay = dayjs.utc(props.post.modified).tz("Asia/Tokyo").format("YYYY/MM/DD");

  return (
    <>
      <Head>
        <title>{`${props.post.title.rendered} | LPgraph - フロントエンド生存戦略`}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="bg-white py-14 mb-16 mx-4 lg:mx-0">
        <p className="text-[13px] text-center text-mat mb-[20px] tracking-wider">
          <span>{day}</span><span>（更新: {modifiedDay}）</span>
        </p>
        <h1 className="text-dark text-center text-[18px] sm:text-[24px] font-bold leading-loose tracking-wider antialiased mb-[16px] px-4 lg:px-0 lg:mx-[40px]">
          {props.post.title.rendered}
        </h1>
        <p className="text-[13px] text-link text-center mb-[32px]">
          <Link href={`/category/${props.post._embedded['wp:term'][0][0].slug}`}>{props.post._embedded['wp:term'][0][0].name}</Link>
        </p>
        <Image
          src={props.post._embedded['wp:featuredmedia'][0].source_url ?? "/img_noimage.png"}
          alt={props.post.title.rendered}
          className="w-full max-h-[450px] object-cover object-center mb-[40px]"
          width={750}
          height={450}
          unoptimized
        />
        <article
          dangerouslySetInnerHTML={{
            __html: `${props.post.content.rendered}`,
          }}
          className="post px-4 lg:px-0 lg:mx-[40px]"
        />
      </div>
    </>
  );
};

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  // APIから記事の一覧を取得
  const res = await fetch(`${process.env.WP_API_URL}/wp-json/wp/v2/posts?_embed`)
  const posts = await res.json()

  // 記事の一覧から、paramsに必要な値を取り出して生成
  const paths = posts.map((post) => ({
    params: { id: post.slug },
  }))

  return { paths, fallback: false }
};

// データをテンプレートに受け渡す部分の処理を記述
export const getStaticProps = async ({params}) => {
  // パラメーターからslugを取得します
  const { id } = params

  // APIから詳細ページの情報を取得
  const resId = await fetch(`https://lpgraph.orutara.com/wp/wp-json/wp/v2/posts?_embed&slug=${id}`)
  const post = await resId.json()

  // propsとして詳細ページの情報を渡す
  return {
    props: {
      post: post[0],
    } 
  }
}

export default Blog;