---
title: 'NextJS｜getStaticProps 跟 getStaticPaths 的疑問'
date: '2023-11-13'
tags: ['#nextjs']
---

# NextJS｜getStaticProps 跟 getStaticPaths 的疑問

- 前言
- Static-Site Generation（SSG）
- getStaticProps
- getStaticPaths
- 動態路徑 [id].js
- Fallback
- 心得總結

## 前言

這篇想紀錄我剛接觸 NextJS 時的某個疑問。在建構我的 next blog 時，主頁的程式碼長這樣：

```jsx
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
```

對於當時只會 React 並第一次使用 NextJS 的情況，對中間那一行 `getStaticProps()` 非常有疑問。

## Static-Site Generation（SSG）

相較於我以前聽過的 Server-Side Rendering（SSR），如果說 SSR 是使用者每次訪問頁面，伺服器都要重新運算一次頁面再丟給使用者，那 `SSG 就是一種伺服器在 Build 並上架的時候，就已經先把頁面算好，以後使用者訪問就直接回傳給他這個算好的頁面`，這個功能非常適合部落格這種比較少更動網頁的狀況。

## getStaticProps

所以回到這個函式，NextJS 並不會把這個 getStaticProps 函式丟出去給 Client，而是會在 Build 的階段讀到這一行，發現有 getStaticProps 的話，就運行裡面的程式，這個範例中我們會在 getStaticProps 中嘗試抓取所有部落格的資料，並且 return 裡面用 props 包起來。

```jsx
// 這個 getStaticProps 不會被傳給客戶，而是在 nextjs build 上架時運行一次
export async function getStaticProps() {
  const allPostsData = getSortedPostsData(); // 這是某個程式碼，用來獲得所有貼文資料
  return { // 這個 return 可以讓 props 被其他 component 取得
    props: {
      allPostsData,
    },
  };
}
```

這個 getStaticProps 裡的 props 會被 NextJS 在 Build time 的時候記得，並且讓我們在下面真正要渲染的 `Index` 取用這些 props。

```jsx
// Index 取用到 {allPostsData} 並渲染該顯示的畫面
export default function Index({ allPostsData }) { 
  return (
    <HomePage allPostsData={allPostsData}/>
  );
}
```

在部落格的主頁，我們獲得 allPostsData 主要是為了顯示 `所有文章`，包含他們的 `title`、`date` 等

## getStaticPaths

接著到顯示部落格文章的 `posts/[id].js` 這個檔案，這裡除了使用 getStaticProps，還多了一個 getStaticPaths。

```jsx
// 略...各種 import

export async function getStaticPaths() {
  const paths = getAllPostIds(); // 2
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id); // 1
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
	// 略...
	return (
		// 略...文章渲染畫面等
	)
}
```

getStaticProps 在這裡，我們可以看到 1 的地方獲取了這一篇文章的資料，並包在 props 裡 return 給所有 component 取用，如下方 `Post({ postData })`。

接下來聚焦在上面的 getStaticPaths，我們可以看到 2 的地方獲取了所有文章的 id，並且直接把 paths return 了回去，這是為了`動態路徑`頁面的生成。

## 動態路徑 [id].js

因為 SSG 動態路徑的處理是先寫一個檔案 [id].js，讓 NextJS 抓取我們文章後，把每一篇文章的 id 生成那篇文章的網頁，所以`我們需要先知道我們有哪些文章`，這就是 getStaticPaths 的用途。

在這個檔案中 getStaticPaths 也是不會傳給 Client 的，而是專案 build 的時候 NextJS 會運行一次，並在 2 的那邊獲取所有文章 id 後，在 return 那裡回傳給 NextJS，它會依照這些 id 們產生每個 id 的頁面（如 post1.js、post2.js …）

## Fallback

```jsx
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, // here
  };
}
```

為了處理 Client 訪問到`未生成的頁面`的狀況

- fallback: false 會返回 404 錯誤
- fallback: true 會提供一個預先生成的頁面，並馬上觸發一次重新生成
- fallback: blocking 會直接觸發生成，讓用戶等一下

## 心得總結

覺得剛接觸 NextJS 的時候可能還不太熟係所謂的 SSR 或 SSG，其實所寫的程式碼，不像是以前 React 會幾乎都傳到 Client，在 NextJS 中有些程式碼就是只有 Server 才看得到的。

且 SSG 就是一個在 Next Build 階段時，一次把所有頁面算好的方式，跟我一開始認識的 Next SSR 不同。SSG 可以提供很快的瀏覽體驗、很沒有 server 負擔的部署。

一開始很糾結於 getStaticProps 跟 getStaticPaths，現在就認知到這兩個東西一定要叫這個名字是因為讓 NextJS 辨認出來，並且根據這兩個函式去做一些 server 端的運算，getStaticProps 是為了取得資料並把結果存到 props、getStaticPaths 是專門給 [id].js 這種動態路由的檔案生成，為了告訴 server 我們總共有哪些頁面要被產生。

---

- [https://nextjs.org/learn-pages-router/basics/data-fetching/with-data](https://nextjs.org/learn-pages-router/basics/data-fetching/with-data)
- [https://chat.openai.com/](https://chat.openai.com/)