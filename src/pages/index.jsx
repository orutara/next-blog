import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const Home = (props) => {
  return (
    <>
      <Head>
        <title>LPgraph - フロントエンド生存戦略</title>
        <meta name="description" content="Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <ul className="mb-16 md:flex md:flex-wrap">
          {props.posts.map((post) => (
            <li key={post.id} className="flex-[0_1_50%] px-4 pb-8">
              <article className="bg-white shadow-md transition duration-300 hover:shadow hover:translate-y-[1px]">
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    className="object-cover object-center w-full h-[200px] sm:h-[280px] md:h-[135px] lg:h-[200px]"
                    src={post._embedded['wp:featuredmedia'][0].source_url ?? "/img_noimage.png"}
                    width={post.ogimage?.width ?? 750}
                    height={post.ogimage?.height ?? 450}
                    alt={post.title.rendered}
                  />
                </Link>
                <div className="bg-white p-[16px] md:min-h-[100px] lg:min-h-[80px] text-[15px]">
                  <Link href={`/blog/${post.slug}`} className="leading-relaxed">
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

// データをテンプレートに受け渡す部分の処理を記述
export const getStaticProps = async () => {
  const res = await fetch(`${process.env.WP_API_URL}/wp-json/wp/v2/posts?_embed`)
  const posts = await res.json()

  return {
    props: {
      posts: posts,
    },
  };
};

export default Home;
