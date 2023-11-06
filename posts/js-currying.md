---
title: 'JS｜Currying'
date: '2023-11-06'
tags: ['#js']
---

### 前言

我看到了一個面試題目

```jsx
var result = add(1)(2)(3)
```

要怎麼實作這個 funtion 呢？

### 來源

柯里化（Currying）這個名稱來自於 20 世紀初期的美國數學家和邏輯學家 Haskell Curry，是計算機科學和數學領域的一位重要人物，並且對組合邏輯（Function Composition）和函數式編程（Functional Programming）有深遠的貢獻。柯里化這個名稱是為了紀念他的貢獻而命名的。

> 柯里化的本質是將`多參數函數`轉化為接受`單一參數`的`一系列嵌套函數`。這種轉化有助於更容易地處理`部分應用`，`函數組合`和`高階函數`。
> 

### 基礎範例

以下為非 Currying 的 function

```jsx
function add(x, y) {
  return x + y;
}
```

將其轉為 Currying function

```jsx
function curriedAdd(x) {
  return function(y) {
    return x + y;
  };
}
```

接下來我們就可以這麼使用：

```jsx

const add5 = curriedAdd(5);
console.log(add5(3)); // 8
```

### 部分應用（Partial Application）

Currying 使部分應用變得更加容易。部分應用是指`只提供函數的一部分參數`，然後`返回一個新函數`，等待提供剩餘的參數。這有助於創建更具彈性的函數，可以在需要的時候提供參數。

### 組合函數（Function Composition）

Currying 使函數的組合變得更加容易，這有助於構建更複雜的函數。你可以將多個柯里化的函數組合在一起，以實現更複雜的邏輯。

### 延遲評估（Lazy Evaluation）

Currying 的概念與延遲評估相關。延遲評估是一種只在`需要時才計算結果`的概念，柯里化有助於實現這種特性。

### 更複雜的範例

```jsx
function add(x) {
  return function(y) {
    if (y === undefined) {
      return x;
    } else {
      return add(x + y);
    }
  };
}

var result = add(1)(2)(3)();
console.log(result); // 6
```

我理解這個的切入點是，每層都是 return 一個 `已打包好 x 在裡面的 function` ，每層 function 再檢查是否還有下一個輸入，沒有就會回傳最終結果 `x` ，有就繼續將 `x + y` 放入下一層遞迴中。

可以從 `add(1)()`、`add(1)(2)()` 開始慢慢理解。

### 與 Closure 的關係

其實某方便來說 Currying 就是用 Closure 的特性，將當下的 Lexical Environment 打包在要回傳的下一個 function 裡。

### 重點整理

- Currying 將 `多重輸入參數` 的 function 轉變成多個 `單一輸入參數` 連環嵌套的 function
- Currying 利用 Closure 打包當下用到的參數給下一個 function
- 助於 Functional Programming
- 助於處理 Partial Application：先輸入`部分參數`、返回新的函數
- 助於 Composition Programming 結合成更複雜的邏輯
- 助於 Lazy Evaluation，`只在需要時`才繼續計算結果