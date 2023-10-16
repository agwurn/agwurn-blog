import "../styles/global.css"
import "../styles/prism-vsc-dark-plus.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
// import "remark-callouts/styles.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

/*
The default export of _app.js is a top-level React component 
that wraps all the pages in your application.

You can use this component to keep state when navigating between pages,
or to add global styles as we're doing here. 
*/