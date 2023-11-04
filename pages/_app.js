import "../styles/global.css"
import "../styles/prism-vsc-dark-plus.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return <AnimatePresence mode="wait">
    <motion.div key={router.pathname}>
      
      <Component {...pageProps} />

      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-gray-600 origin-left z-50"
        initial={{ scaleX: 0}}
        animate={{ scaleX: 0}}
        exit={{scaleX: 1}}
        transition={{duration: 1.3, ease: [0.22, 1, 0.36, 1]}}
      ></motion.div>

      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-gray-600 origin-right z-50"
        initial={{ scaleX: 1}}
        animate={{ scaleX: 0}}
        exit={{scaleX: 0}}
        transition={{duration: 1.3, ease: [0.22, 1, 0.36, 1]}}
      ></motion.div>


    </motion.div>
  </AnimatePresence>
}

/*
The default export of _app.js is a top-level React component 
that wraps all the pages in your application.

You can use this component to keep state when navigating between pages,
or to add global styles as we're doing here. 
*/