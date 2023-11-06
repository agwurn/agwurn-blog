import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
// import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
import Link from "next/link";

const name = "Agwurn Lu";
export const siteTitle = "Agwurn Lu 秘密基地";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="理鈞的部落格，紀錄前後端開發、音樂、羽球筆記。"
        />
        <meta property="og:image" content="/images/thumbnail.png" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J4TQWY240X"
        ></Script>
        <Script>
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-J4TQWY240X');
  `}
        </Script>
      </Head>

      <main className="">{children}</main>

      {/* <footer className='w-screen bg-slate-800 text-gray-400 flex flex-col items-center p-2 mt-auto z-40'>
        <h1 className=''>@agwurn 2023</h1>
      </footer> */}
    </div>
  );
}
