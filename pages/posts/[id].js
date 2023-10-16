import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

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

  const [ opacity, setOpacity ] = useState(1);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  },[])

  const handleScroll = () => {
    const scrollY = window.scrollY
    const maxScroll = 400
    const newOpacity = 1 - scrollY / maxScroll

    setOpacity(newOpacity)
  }

  return (
    <Layout>
      <div className="w-screen h-screen fixed bg-indigo-200 -z-10" 
           style={{opacity: opacity}}>

      </div>
      <div className="w-screen flex flex-col items-center">
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">{postData.title}</h1>
          <p className="text-gray-400 absolute bottom-4">{postData.date}</p>
        </div>
        <hr/>
        <article 
          className="md:max-w-[40em] w-4/5 my-8"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
        <author>
          
        </author>
      </div>
    </Layout>
  );
}
