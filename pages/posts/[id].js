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

  return (
    <Layout>
      <div className="w-screen flex flex-col items-center">
        <div className="w-full h-screen flex flex-col items-center justify-center bg-indigo-50">
          <h1 className="text-4xl font-bold">{postData.title}</h1>
          <p className="text-gray-400">{postData.date}</p>
        </div>
        <article 
          className="w-4/5 my-8"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
        <author>
          
        </author>
      </div>
    </Layout>
  );
}
