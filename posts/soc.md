---
title: '關注點分離（設計模式）'
date: '2023-10-18'
tags: ['#designPattern', '#react']
thumbnail: ''
---

## 關注點分離？

就是把程式碼依照特定關注點（功能、責任）去分開，降低程式碼的 `耦合`

### MVC架構
Model 負責處理資料、View 負責處理畫面、Controller 負責處理模型跟畫面的交互作用。

### 資料庫訪問
將資料存取的邏輯與其他程式碼分開

### 路由跟控制
想到 Express.js，把 routes.js 裡原本後面要執行的一個一個函式放到 controller.js 這個檔案，路由就專門把請求映射給相關控制器、控制器們專門處理特定請求。

### HTML跟CSS
分開到不同檔案更好閱讀跟開發

### 前後端分離
React 跟 Express 各自開發前後端程式

### 單一責任原則
每個 Component、Function、Class 只負責單一明確功能或責任，降低程式碼複雜性，更好理解。

## 程式碼範例
```js
// 不分離關注點的程式碼
function fetchUserDataAndRenderPage() {
  const userData = fetchUserData(); // 資料存取和處理
  renderPage(userData); // 用戶界面處理
}

// 分離關注點的程式碼
function fetchUserData() {
  // 資料存取和處理
  return userData;
}

function renderPage(userData) {
  // 用戶界面處理
}
```

## 優點
1. 可讀性
2. 方便除錯、修改
3. 方便寫測試

## 反思（碎碎念）


---
## Reference
來自 chatgpt 與自己的反思
