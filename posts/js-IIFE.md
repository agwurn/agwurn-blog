---
title: 'JS｜IIFE'
date: '2023-11-15'
tags: ['#js']
---

立即執行函式 **IIFE** (Immediately Invoked Function Expression) 是在宣告當下就馬上執行的程式。

## 最簡範例

```jsx
(function(){
  console.log("hello IIFE");
})()
```

程式碼沒有額外呼叫這個 function，但一宣告的當下就馬上執行了，印出”hello IIFE”。

## IIFE 有封閉的 scope

在 IIFE 裡的變數命名不會污染到外部，因為 IIFE 內宣告的變數只存在 IIFE 裡。

```jsx
let a = 1;

(function () {
  let a = 5;
  console.log(a); // 印出 5
})();

console.log(a); // 印出 1
```

這裡還有一個範例：

```jsx
var result = (function(x, y) {
    var sum = x + y;
    return sum;
})(10, 5);

console.log(result);
```

如此臨時性的變數 sum 只會被保留在 IIFE scope 裡，不必留在 global scope。

## IIFE 模組模式

可以用 IIFE 實現模組的封裝

```jsx
var module = (function () {
  let privateVar = "I'm private";

  function privateFunction() {
    console.log("This is a private function");
  }

  return {
    publicVar: "I'm public",
    publicFunction: function () {
      console.log("This is a public function");
    },
    getPrivateVar: function () {
      console.log(privateVar);
    },
  };
})();
```

以上只有 return 的物件裡的變數和函式可以被外界使用：

```jsx
console.log(module.publicVar); // "I'm public"
module.publicFunction(); // This is a public function
```

而封裝起來的 private variable, function 就不存在外部：

```jsx
module.privateFunction(); // TypeError: module.privateFunction is not a function
console.log(module.privateVar) // undefined
```

我們可以寫 getter 如 `getPrivateVar()` 這個 method 並 return 給外界，讓外界可以用我們提供的方式來讀取或操作 private variable。如上面程式碼裡我已經寫好在 return 裡的  `getPrivateVar()` 。

```jsx
module.getPrivateVar(); // "I'm private"
```

## 補充：經典的 setTimeout 面試題

```jsx
for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

這裡 setTimeout 會一次被放進 event loop 第二輪，總共有五個，會全部一起經過 1 秒後印出當時的 i，答案就會是：

```jsx
1 
1 
1 
1 
1
```

我們可以改用 IIFE 把 for loop 裡每一個 i 都先被丟進一層 function 裡，讓 for loop 的每一輪都是一個不同的 function scope。

```jsx
for (var i = 1; i <= 5; i++) {
  (function(j){
    setTimeout(function () {
      console.log(j);
    }, 1000);
  })(i)
}
```

如此答案就是正確的了

```
1
2
3
4
5
```

## 總結

- IIFE 全名叫 Immediately Invoked Function Expression
- IIFE 在宣告當下就會馬上執行
- IIFE 有封閉的 scope，適合把臨時變數放在裡面避免污染全域
- IIFE 可以做簡單的模組封裝，並安排好 private variable 跟他的 getter, setter
- IIFE 可以解決 for loop 搭配 setTimeout 正確顯示 12345 的問題

---

- [https://developer.mozilla.org/zh-TW/docs/Glossary/IIFE](https://developer.mozilla.org/zh-TW/docs/Glossary/IIFE)
- [https://chat.openai.com/](https://chat.openai.com/)