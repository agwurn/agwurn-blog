import Head from 'next/head';
import Image from 'next/image';
// import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Agwurn Lu';
export const siteTitle = 'Agwurn Lu 秘密基地';

export default function Layout({ children, home }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header> */}
      <main>{children}</main>
      
      {!home && (
        <div className="m-10 text-indigo-500 hover:underline z-40">
          <Link href="/" scroll={false}>← Back to home</Link>
        </div>
      )}
      
      <footer className='w-screen bg-slate-800 text-gray-400 flex flex-col items-center p-2 mt-auto z-40'>
        <h1 className=''>@agwurn 2023</h1>
      </footer>
    </div>
  );
}