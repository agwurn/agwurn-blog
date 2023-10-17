import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { animated, useSpring } from '@react-spring/web'

const myIntroduction = "web dev. / music prod.";
const myQuote = "在這個快速的時代，我只想...慢一點";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {

  const showUp = useSpring({
    from: {
      opacity: 0,
      y: '6%',
    },
    to: {
      opacity: 1,
      y: '0%',
    }
  })
  
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className="flex flex-col items-center p-8 mt-20">
        <Image
          priority
          src="/images/profile.jpg"
          className="w-28 h-28 object-cover rounded-full"
          height={256}
          width={256}
          alt=""
        />
        <h1 className="text-2xl mt-8">Agwurn Lu</h1>
        <h1 className="">{myIntroduction}</h1>
        <p className="italic text-sm my-8">{myQuote}</p>
      </section>

      <animated.div style={showUp}>
        <section className="flex flex-col items-center py-auto">
          <h2 className={utilStyles.headingLg}>文章列表</h2>
          <ul className="list-disc">
            {allPostsData.map(({ id, date, title }) => (
              <li className="" key={id}>
                <span className="text-gray-500">{date} </span>
                <Link href={`/posts/${id}`}
                      className="text-indigo-400 hover:underline"
                      scroll={false}
                >{title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </animated.div>
    </Layout>
  );
}

/*

getServerSideProps only if you need to pre-render a page 
  whose data must be fetched at request time.

Time to first byte (TTFB) will be slower than getStaticProps 
  because the server must compute the result on every request,
  and the result cannot be cached by a CDN without extra configuration.

*/
