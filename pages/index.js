import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

const myIntroduction = "web dev. / music prod.";
const myQuote = "practice makes perfect";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="flex flex-col items-center p-8">
        <Image
          priority
          src="/images/profile.jpg"
          className="w-28 h-28 object-cover rounded-full"
          height={256}
          width={256}
          alt=""
        />
        <h1 className="font-bold text-2xl">Agwurn Lu</h1>
        <h1 className="">{myIntroduction}q</h1>
        <p>{myQuote}</p>
      </section>

      <section className="flex flex-col items-center">
        <h2 className={utilStyles.headingLg}>文章列表</h2>
        <ul className="list-disc">
          {allPostsData.map(({ id, date, title }) => (
            <li className="" key={id}>
              <span className="text-gray-500">{date} </span>
              <Link href={`/posts/${id}`}
                    className="text-indigo-800 hover:underline"
              >{title}</Link>
            </li>
          ))}
        </ul>
      </section>
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
