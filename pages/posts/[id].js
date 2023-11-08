import { useEffect, useState, useRef } from "react";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Image from "next/image";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import Head from 'next/head';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {

  const [opacityProp, setOpacityProp] = useSpring(() => ({
    opacity: 1,
  }));

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = 400;
    const newOpacity = 1 - scrollY / maxScroll;

    setOpacityProp({ opacity: newOpacity });
  };

  const showUp = useSpring({
    from: {
      opacity: 0,
      // y: '60%',
    },
    to: {
      opacity: 1,
      // y: '0%',
    },
    config: {
      mass: 1,
      friction: 20,
      tension: 30,
    },
  });

  return (
    <Layout>
      <Head>
        <title>{postData.title} - Agwurn Lu</title>
        <meta
          name="description"
          content="理鈞的部落格，紀錄前後端開發、音樂、羽球筆記。"
        />
        <meta property="og:image" content="/images/thumbnail.png" />
        <meta name="og:title" content={postData.title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <animated.div className="-z-50" style={opacityProp}>
        <div className="w-full h-screen fixed bg-gray-600"></div>
      </animated.div>

      <div className="w-full flex flex-col items-center">
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <animated.h1 className="text-4xl font-bold drop-shadow-md text-slate-200">
            {postData.title}
          </animated.h1>
          <div className="absolute bottom-4">
            <animated.p className="text-teal-600" style={showUp}>
              {postData.tags.map((tag) => {
                return <>{tag} </>;
              })}
            </animated.p>
            <animated.p className="text-gray-400 " style={showUp}>
              {postData.date}
            </animated.p>
          </div>
        </div>
        <hr />

        <article
          className="md:max-w-[40em] w-[92vw] my-8 z-40"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        <author className="w-full mt-10 py-8 flex flex-col items-center bg-gray-200 z-40">
          <h1 className="italic text-slate-400">感謝您的閱讀</h1>
          <p className="md:max-w-[40em] w-[92vw] my-8 text-sm text-slate-600">這個部落格才剛成立，我仍然在調整畫面，覺得這個時代資訊都太複雜了、社群軟體的廣告又多，希望在這裡可以提供一個最舒適的閱讀體驗，讓您可以專注、最小化干擾、一同心流。</p>

          <div>
            <Image
              src={"/images/agwurn_photo.jpg"}
              height={144}
              width={144}
              alt="author_img"
              className="my-4 w-20 h-20 object-cover rounded-full shadow-lg"
            />
            <p className="my-2">Agwurn Lu</p>
          </div>

          <p className="italic text-sm font-extralight">
            practice makes perfect
          </p>
        </author>

        <div className="my-8 text-teal-600 hover:underline z-40">
          <Link href="/" scroll={false}>
            ← Back to home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
