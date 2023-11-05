import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../layout";
import utilStyles from '../../styles/utils.module.css'
import { animated, useSpring } from '@react-spring/web'

const myIntroduction = "web dev. / music prod.";
const myQuote = "在這個快速的時代，我只想...慢一點";

export default function HomePage({allPostsData}) {

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
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="flex md:flex-row flex-col md:items-center md:justify-center">
        <section className="flex flex-col items-center p-8 m-10 border rounded-lg shadow-md">
          <Image
            priority
            src="/images/agwurn_photo.jpg"
            className="w-28 h-28 object-cover rounded-full shadow-[2px_3px_8px_rgba(0,0,0,0.35)]"
            height={256}
            width={256}
            alt=""
          />
          <h1 className="text-3xl font-bold mt-8">Agwurn Lu</h1>
          <h1 className="">{myIntroduction}</h1>
          <p className="italic text-sm my-8 text-slate-500">{myQuote}</p>
        </section>

        <animated.div style={showUp}>
          <section className="flex flex-col items-center py-auto">
            <h2 className={utilStyles.headingLg}>文章列表</h2>
            <ul className="list-disc">
              {allPostsData.map(({ id, date, title }) => (
                <li className="" key={id}>
                  <span className="text-gray-400 font-light">{date} </span>
                  <Link href={`/posts/${id}`}
                        className="text-slate-400 hover:underline"
                        scroll={false}
                  >{title}</Link>
                </li>
              ))}
            </ul>
          </section>
        </animated.div>
      </div>
    </Layout>
  )
}
