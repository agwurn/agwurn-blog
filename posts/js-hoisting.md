---
title: 'JS｜Hoisting'
date: '2023-11-08'
tags: ['#js']
---

## 前言

提升（Hoisting），在我的理解裡攏統的說是：某些變數宣告會被 `提升到最上面`。

w3c 很巧妙地先說現象：

> In JavaScript, a variable can be declared after it has been used.
>
> 在 JS 中，變數可以先使用再宣告。
>
> — W3School
 

再解釋 Hoisting

> Hoisting is JavaScript's default behavior of `moving all declarations to the top` of the current scope (to the top of the current script or the current function).
>
> 提升，是 JS 裡預設的行為，會將當下作用域的`宣告移動到當下檔案的最上面`。
>
> — W3School


## 最簡範例

```jsx
x = 5
console.log(x) // 5

var x
```

可以看到 `x` 直接被使用，最後才被宣告。

```jsx
say()

function say(){
  console.log("hi") // 成功印出 "hi"
}
```

可以看到 `say()` 直接先被使用，後面才宣告。

## 原因

主要是在執行任何程式碼前，JavaScript 會 `先把函式宣告放進記憶體` 裡面。

## 只宣告不初始化

```jsx
console.log(x) // 印出 undefined 
var x = 5
```

因為 var 只有宣告被 hoisting，就算不會出錯但 x 此時只是 undefined，直到下面被 x = 5 才正式

> JavaScript only hoists `declarations`, not `initializations`.
>
> — W3School


## let 跟 const 呢

```jsx
console.log(x) // ReferenceError: Cannot access 'x' before initialization
let x
```

let 跟 const 沒有 Hoisting？其實是有的，只是 let 跟 const 被提升的時候沒有被`初始化（Initialized）`，會被放在`暫時死區（Temporal Dead Zone）`


> [!info] 
> 所以 var, let, const 都會被提升，但 let, const 不會被初始化，還不能直接用。另外三者提升都只是宣告，不像 function 是整個函式都被提上去可以直接用。
>
> 也想補充一下 var 是可以重新用 var 宣告同名的變數的，另外兩個不行。


## 該怎麼避免錯誤？

如果不了解 Hoisting，可能會在開發過程中遇到一些錯誤。W3School 建議我們可以把變數宣告都放在檔案的最頂端來避免錯誤。

## 總結

- JavaScript 因為 Hoisting，會提升`宣告` 到程式碼頂端，也就是執行之前會先檢查好各種宣告並放入記憶體。
- Hoisting 只提升`宣告`，不`初始化` ，所以如果在底下宣告 `var x = 5`，此時上面的程式碼所看到的 `x` 還只是 `undefined` 直到遇到 `var x = 5`。
- function 可以直接先使用再呼叫
- let 跟 const 也會提升但會放入暫時死區（Temporal Dead Zone）導致先使用的時候會出錯。
- W3School 建議把宣告都放在頂端，以便減少錯誤出現。

---

## Reference
- [https://www.w3schools.com/js/js_hoisting.asp](https://www.w3schools.com/js/js_hoisting.asp)
- [https://developer.mozilla.org/zh-TW/docs/Glossary/Hoisting](https://developer.mozilla.org/zh-TW/docs/Glossary/Hoisting)
- chatGPT 的交互對談