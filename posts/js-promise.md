---
title: "JS｜Promise"
date: "2023-11-06"
tags: ["#js"]
---

## 前言

在我的理解裡，JavaScript 有些程式像是開了一個支線來分開執行的，我們需要 Promise 來知道開出去的支線有沒有完成、或是出錯了。

在 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise) 的定義是這麼說的：

> **`Promise`**  物件代表一個即將完成、或失敗的非同步操作，以及它所產生的值。

總之，Promise 讓我們可以知道分出去的異步 function 是否正在等待、或成功、或失敗，並且執行後續動作。有時候我們需要等待網站抓取外面的圖片，抓完才能顯示之類的。

## 最簡範例

```jsx
const myPromise = new Promise();
```

並加入要執行的 callback function，

```jsx
const myPromise = new Promise((resolve, reject) => {
  // 某個執行一段時間的程式，成功時呼叫 resolve() 來結束 promise
  // 失敗時呼叫 reject() 來結束 promise
});
```

用一個等待 1 秒鐘再回傳的範例

```jsx
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("完成123");
  }, 1000);
});
```

此時我們可以這麼呼叫，並附上 `.then()` 抓取 promise 成功完成的結果，並在回調函式中用 `result` 抓取剛剛 `resolve()` 裡回傳的資訊。

```jsx
myPromise.then((result) => {
  console.log("成功:", result); // 印出 "成功: 完成123"
});
```

## 抓取失敗

我們用隨機數 `randomNumber` 來造成可能失敗的局面，並 `reject()` 來返回。

```jsx
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      resolve("成功");
    } else {
      reject("失敗");
    }
  }, 1000);
});
```

我們可以用 `.catch()` 來抓取失敗的情況

```jsx
myPromise
  .then((result) => {
    console.log(result); // 印出"成功"
  })
  .catch((error) => {
    console.error(error); // 印出"失敗"
  });
```

## .finally()

無論成功與否都會執行的 .finally()

```jsx
myPromise
  .then((result) => {
    console.log(result); // 印出"成功"
  })
  .catch((error) => {
    console.error(error); // 印出"失敗"
  })
  .finally(() => {
    console.log("不論成敗，這裡都會被執行");
  });
```

## 中場休息重點整理

- Promise 用來等待一個未完成、成功或失敗的`非同步操作`
- 在 Promise 裡面使用 `resolve()` | `reject()` 來讓 Promise 知道任務結束
- 在外面用 `.then()` | `.catch()` 來抓取 Promise 的成敗狀態
- 最後可用 `.finally()` 抓取 Promise 結束的狀態，無論成敗都會執行

---

## Promise Chaining

讓多個 Promise 接棒！假設我們有兩個 Promise：

1. 從外部抓資料
2. 將其處理

```jsx
// 第一個非同步操作，模擬從伺服器獲取資料
function fetchDataFromServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "資料從伺服器取得";
      resolve(data);
    }, 1000);
  });
}

// 第二個非同步操作，將從第一個操作獲得的資料進行處理
function processData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const processedData = data + "，然後進行處理";
      resolve(processedData);
    }, 1000);
  });
}
```

我們可以在 `.then()` 裡頭繼續 return 下一個 function 的呼叫：

```jsx
fetchDataFromServer()
  .then((data) => {
    return processData(data); // 返回第二個非同步操作
  })
  .then((processedData) => {
    console.log(processedData); // 印出 "資料從伺服器取得，然後進行處理"
  })
  .catch((error) => {
    console.error("錯誤:", error);
  });
```

## Promise.all()

- 等 array 裡的 Promise 全都執行成功就 `.then()`
- 只要有一個失敗就會進到 `catch()`。

```jsx
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1成功了");
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2成功了");
  }, 1500);
});

Promise.all([p1, p2])
  .then((results) => {
    console.log("所有 Promise 完成:", results);
  })
  .catch((error) => {
    console.error("至少有一個 Promise 失敗:", error);
  });
```

那個 results 會印出所有 promise 的完成值。

## Promise.race()

- 只要有一個完成，就執行它的 `.then()`，其他的都拋棄。
- 全都失敗就進 `.catch()` ，只印第一個失敗的 `error`。

我們拿上一段的範例繼續看：

```jsx
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1成功了");
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2成功了");
  }, 1500);
});

Promise.race([p1, p2])
  .then((results) => {
    console.log("第一個完成的:", results); //印出比較快完成的p1
  })
  .catch((error) => {
    console.error("都失敗，第一個失敗的原因是:", error);
  });
```

---

## 重點整理

- Promise 用來等待一個未完成、成功或失敗的`非同步操作`
- 在 Promise 裡面使用 `resolve()` | `reject()` 來讓 Promise 知道任務結束
- 在外面用 `.then()` | `.catch()` 來抓取 Promise 的成敗狀態
- 最後可用 `.finally()` 抓取 Promise 結束的狀態，無論成敗都會執行
- Promise Chaining 可以串接多個 Promise，繼續 `then` 下去
- Promise.all() 要等全部都成功，並回傳一個 array 代表大家的成功狀態
- Promise.race() 只要一個成功就 `then`，都失敗就只 `catch` 第一個失敗的

## Reference

- [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- ChatGPT 的交互詢問
