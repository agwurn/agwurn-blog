import { getSortedPostsData } from "../lib/posts";
import HomePage from "../components/home/HomePage";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Index({ allPostsData }) {

  return (
    <HomePage allPostsData={allPostsData}/>
  );
}

/*

getServerSideProps only if you need to pre-render a page 
  whose data must be fetched at request time.

Time to first byte (TTFB) will be slower than getStaticProps 
  because the server must compute the result on every request,
  and the result cannot be cached by a CDN without extra configuration.

*/
