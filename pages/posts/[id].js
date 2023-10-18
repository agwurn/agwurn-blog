import { useEffect, useState, useRef } from "react";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Image from "next/image";
import { animated, config, useSpring } from "@react-spring/web";

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

  const imgRef = useRef(null)



  const [ opacityProp, setOpacityProp ] = useSpring(() => ({
    opacity: 0,
  }));

  const checkImageLoaded = () => {
    if(postData.thumbnail && imgRef.current.complete) {
      setOpacityProp({opacity: 1})
    }
  }

  useEffect(() => {
    checkImageLoaded()
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  },[])

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = 400
    const newOpacity = 1 - scrollY / maxScroll

    setOpacityProp({opacity: newOpacity})
  }

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
    }
  })
  

  return (
    <Layout>
      <animated.div style={opacityProp} className="-z-50">
        <animated.div className="w-screen h-screen fixed bg-indigo-200" 
            style={opacityProp}
        >
          {postData.thumbnail && 
            <img src={postData.thumbnail} 
                 alt=""
                 className="w-screen h-screen object-cover blur-sm"
                 ref={imgRef}
                 onLoad={() => setOpacityProp({opacity: 1})}
                 draggable="false"
            />
          }      
        </animated.div>
      </animated.div>

      <div className="w-screen flex flex-col items-center">
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <animated.h1 className="text-4xl font-bold drop-shadow-md" style={showUp}>{postData.title}</animated.h1>
          <div className="absolute bottom-4">
            <animated.p className="text-indigo-400" style={showUp}>
              {postData.tags.map(tag => {
                return <>{tag} </>
              })}
            </animated.p>
            <animated.p className="text-gray-400 " style={showUp}>{postData.date}</animated.p>
          </div>
        </div>
        <hr/>

        <article 
          className="md:max-w-[40em] w-[90vw] my-8 z-40"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />

        <author className="w-full mt-10 py-8 flex flex-col items-center bg-gray-600 z-40">
          <h1 className="mb-8">感謝您的閱讀</h1>
          <div>
            <Image
              src={"/images/profile.jpg"}
              height={144}
              width={144}
              alt="author_img"
              className="w-20 h-20 object-cover rounded-full"
            />
            <p className="my-2">Agwurn Lu</p>
          </div>
          <p className="italic text-sm font-extralight">practice makes perfect</p>
        </author>
      </div>
    </Layout>
  );
}
