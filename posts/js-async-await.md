---
title: 'JS｜async / await'
date: '2023-11-08'
tags: ['#js']
---

## 前言

閱讀本篇之前，可以先了解 [Promise](https://blog.agwurn.me/posts/js-promise)。

> async, await 讓 Promise 的寫法可以更像一般的同步程式。

這篇想了解：

1. async / await 的寫法
2. 錯誤處理 try … catch
3. 搭配 Promise.all() 的用法
4. 搭配 Promise.race() 的用法
5. 再次釐清同步 / 異步
6. 所以 async / await 的優點是…
7. 本篇總結

## 1. async / await 的寫法

我們用 `fetchData()` ，模擬平常 fetch 外部 API 的操作。

```jsx
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("資料已取得");
    }, 1000); // 模擬 1 秒的載入時間
  });
}
```

假設連續 fetch 兩次資料，原始的 .then() 寫法如下

```jsx
fetchData()
  .then((result1) => {
    console.log(result1);
    return fetchData();
  })
  .then((result2) => {
    console.log(result2);
  });
```

使用 async, await 的寫法後

```jsx
async function main() {
  const result1 = await fetchData();
  console.log(result1);
  const result2 = await fetchData();
  console.log(result2);
}
main();
```

只要使用 async function 宣告的函式，內部就可以使用 await 來呼叫其他有 Promise 的函式，此時 await 會等待那個函式的 Promise 被處理完，才繼續往下執行後續程式。

> `await`  是屬於一元運算子，它會直接回傳後方表達式的值；但如果是  **Promise 時則會 “等待” resovle 的結果並回傳**。
>
> -- [卡斯伯’s blog](https://www.casper.tw/development/2020/10/16/async-await/)

我們可以看到使用 async, await 後的程式碼看起來更像一般的同步函式，增加可讀性、可維護性。

## 2. 錯誤處理 try … catch

我們可以使用 try … catch 來接收 promise 的錯誤，只要中間有任何一個任務失敗，就會直接跳到 catch 的環節。

```jsx
async function main() {
  try {
    const result1 = await fetchData();
    console.log(result1);
    const result2 = await fetchData();
    console.log(result2);
  } catch (err) {
    console.error(err);
  }
}
main();
```

如果沒有使用 try … catch，一遇到錯誤就會讓整個程式中止。

## 3. 搭配 Promise.all() 的用法

```jsx
function fetchData(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("資料已取得");
    }, time); // 模擬 1 秒的載入時間
  });
}

async function main() {
  const result = await Promise.all([fetchData(1000), fetchData(2000)]);
  console.log(result); // 等待2秒後將兩個結果同時印出
}
main();
```

當我們同時有太多 await 要執行時，直接使用 Promise.all() 可以增加執行效率。

## 4. 搭配 Promise.race() 的用法

```jsx
// 上略...

async function main() {
  const result = await Promise.race([fetchData(1000), fetchData(2000)]);
  console.log(result); // 等待1秒後直接印出第一個的結果
}
main();
```

## 5. 再次釐清同步 / 異步

我個人的想法是：

> 異步就像程式執行到一半時，岔出一道 `支線任務`，此時主線任務跟支線任務是分開進行的，直到支線被完成，再重新 merge 他的資料回主線任務的感覺。

會需要使用異步程式就是因為網頁有些任務是耗時的，例如 `fetch 外部 API` 、`setTimeout()` 等，如果以往的同步程式的話此刻整個程式都會等這個 API 回傳好資料才能繼續往下走，使用異步程式來分一個支線任務，就能讓主線同時執行的情況下，邊等待支線任務 api 資料回傳。

## 6. 所以 async / await 的優缺點是…

以往 .then() 或是 setTimeout 裡用 callback function 的寫法，會讓程式碼在區塊結構變多變複雜，使用 async / await 就可以將程式碼寫起來像以往寫同步程式那樣一行一行結束。

然而 async / await 也要注意效能問題、錯誤處理特殊情況、過多的 async 可能也有 callback hell ….（以後繼續研究）

## 7. 本篇總結

- async, await 讓 Promise 的寫法可以更像一般的同步程式，增加可讀性、可維護性。
- 可以使用 try … catch 進行錯誤處理
- 可以使用 Promise.all() 等方法，替換一次多個 await 的情況，增加效率。
- 異步函式就像岔出去的耗時的支線任務，不阻塞主線執行的情況下，完成支線任務後再把資料傳回來主線。
- 以後可能要再研究一下效能問題、錯誤處理、async 造成的 callback hell 等。

---

## Reference

https://www.casper.tw/development/2020/10/16/async-await/

https://medium.com/itsems-frontend/javascript-sync-async-22e75e1ca1dc

https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/async_function

chatGPT 的交互問答
