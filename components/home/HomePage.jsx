import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../layout";
import { animated, useSpring } from "@react-spring/web";
import { TypeAnimation } from "react-type-animation";
import { useEffect } from "react";

const myIntroduction = "web dev. / music prod.";

export default function HomePage({ allPostsData }) {
  const showUp = useSpring({
    from: {
      opacity: 0,
      y: "6%",
    },
    to: {
      opacity: 1,
      y: "0%",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  },[])

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="lg:flex lg:flex-row flex-col">
        <section className="bg-slate-400 flex-1 flex flex-col items-start p-8 lg:h-screen h-[80vh] w-full relative shadow-sm">
          <h1 className="absolute left-8 top-8 text-white">Agwurn Lu</h1>
          <Image
            priority
            src="/images/agwurn_photo.jpg"
            className="absolute right-8 lg:left-8 bottom-0 lg:bottom-8 translate-y-[50%] lg:translate-y-0 w-16 h-16 object-cover rounded-full shadow-[2px_3px_8px_rgba(0,0,0,0.35)]"
            height={128}
            width={128}
            alt=""
          />
          <TypeAnimation
            sequence={[
              "在這個快速的時代，我只想...慢一點。",
              1000,
              "Practice makes perfect.",
              1000,
              "你是為了幸福而生的。",
              1000,
              "May life's most fantastic things always come your way.",
              1000,
              "不用望向未來，現在就正在創造未來。",
              1000,
              "Simplicity is the ultimate sophistication.",
              1000,
              "平常心",
              1000,
              "To focus on technique, not power.",
              1000,
              "真正高手靠的不是激情，而是恰到好處的投入。",
              1000,
            ]}
            wrapper="span"
            speed={50}
            className="text-3xl font-bold my-auto h-[4em] block text-white"
            repeat={Infinity}
          />
        </section>

        <animated.div style={showUp} className="flex-1 p-8">
          <section className="flex flex-col">
            <h2 className="text-3xl font-bold">文章列表</h2>
            <ul className="mt-8">
              {allPostsData.map(({ id, date, title }) => (
                <li className="" key={id}>
                  <span className="text-gray-500 font-mono font-light">
                    {date}{" "}
                  </span>
                  <Link
                    href={`/posts/${id}`}
                    className="text-slate-400 no-underline hover:underline"
                    scroll={false}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </animated.div>
      </div>
    </Layout>
  );
}
