import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const Category = (props) => {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (props.posts.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }
  return (
    <>
      <Head>
        <title>{`${props.posts[0]._embedded['wp:term'][0][0].name} | LPgraph - フロントエンド生存戦略`}</title>
        <meta
          name="description"
          content={`${props.posts[0]._embedded['wp:term'][0][0].name}のカテゴリー記事一覧 | LPgraph - フロントエンド生存戦略`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <div className="px-4">
          <h1 className="text-[24px] font-semibold mb-[20px]">
            {props.posts[0]._embedded['wp:term'][0][0].name}に関する記事一覧
          </h1>
        </div>
        <hr className="border-t-2 text-white mb-[20px]" />
        <ul className="mb-16 md:flex md:flex-wrap">
          {props.posts.map((post) => (
            <li key={post.id} className="flex-[0_1_50%] px-4 pb-8">
              <article className="bg-white shadow-md transition duration-300 hover:shadow hover:translate-y-[1px]">
                <Link href={`/blog/${post.id}`}>
                  <Image
                    className="object-cover object-center w-full h-[200px]"
                    src={post._embedded['wp:featuredmedia'][0].source_url ?? "/img_noimage.png"}
                    width={post.ogimage?.width ?? 330}
                    height={post.ogimage?.height ?? 200}
                    alt={post.title.rendered}
                  />
                </Link>
                <div className="bg-white p-[16px] min-h-[88px] text-[15px]">
                  <Link href={`/blog/${post.id}`}>
                    {post.title.rendered}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  // APIから記事の一覧を取得
  const res = await fetch(`${process.env.WP_API_URL}/wp-json/wp/v2/posts?_embed`)
  const posts = await res.json()

  const paths = posts.map((post) => `/category/${post._embedded['wp:term'][0][0].slug}`);

  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述
export const getStaticProps = async ({params}) => {
  const { id } = params

  // パラメーターからcategoryIDを取得
  const res = await fetch(`${process.env.WP_API_URL}/wp-json/wp/v2/categories?slug=${id}`)
  const posts = await res.json()
  const categoryId = posts[0].id

  // categoryIDから記事を取得
  const res2 = await fetch(`${process.env.WP_API_URL}/wp-json/wp/v2/posts?categories=${categoryId}&_embed`)
  const posts2 = await res2.json()

  return {
    props: {
      posts: posts2,
    }
  }
};

export default Category;
