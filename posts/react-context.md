---
title: 'React｜Context 跨組件狀態'
date: '2023-11-20'
tags: ['#react', '#notes']
---

## 意義

以往用 prop 來傳遞 state，若傳遞太多層，可能導致 props drilling，可能中間幾個 component 沒用到那個 state 卻幫忙傳遞。React Context 這時候就可以解決 props drilling，讓 state 不需要透過一層一層的傳遞，而是從某個上層 provide ，再讓需要那個 state 的 component 訂閱這個 context 就好。

## 幾個步驟

### 1. createContext

是一個創建 context 的工廠函式，所得到的 myContext 包含相應的 provider 跟 consumer 元件。

```jsx
export const myContext = React.createContext()
```

這裡會加上 export 是因為多數時候不同 Component 是跨檔案的，這樣在其他檔案裡才可以取用這個 context 來做其他操作。

### 2. <Context.Provider>

一個用來提供共享狀態的 React Component，在 `value` 屬性裡共享狀態。

```jsx
<MyContext.Provider value={/* 共享的數據 */}>
  {/* 子組件 */}
</MyContext.Provider>
```

### 3. <Context.Consumer>

一個訂閱 context 的 React Component

```jsx
// 在子組件中使用 Consumer
<MyContext.Consumer>
  {value => /* 根據共享的數據進行渲染 */}
</MyContext.Consumer>
```

### 3b. useContext

我們也可以不用 Consumer 而是用 `useContext` 來獲取共享數據。`useContext` 會告訴 React：『我這個 Component 要讀 MyContext 』。

```jsx
const ChildComponent = () => {

  const data = useContext(MyContext);

  return <p>{data}</p>;
};
```

## 最簡範例

```jsx
import React, { createContext, useContext } from 'react';

const MyContext = createContext(); // 1

// 最上層組件
const App = () => {
  const sharedData = 'Shared Data from Context'; // 2

  return (
    <MyContext.Provider value={sharedData}> // 3
      <ChildComponent />
    </MyContext.Provider>
  );
};

// 子組件
const ChildComponent = () => {

  const data = useContext(MyContext); // 4

  return <p>{data}</p>;
};

export default App;
```

1. 創造 context 對象
2. 創造要共享的資料（也可以用 useState 創造狀態）
3. 用剛剛的 context 對象裡的 `.Provider` 包夾要享有 context 的組件
4. 在子組件透過 `useContext(Mycontext)` 來得到 context 中共享的資料

> [!info]
> 🐤 實際使用時會跨檔案開發，MyContext 創建後會在其他檔案取用，因此會 export 出去。
>

> [!info]
> 🐤 共享的不只可以是變數，還可以是 state 甚至是 setState 的函式等。
>

---

- https://react.dev/learn/passing-data-deeply-with-context
- https://chat.openai.com/