---
title: 'JS｜Scope'
date: '2023-11-07'
tags: ['#js']
---

## 前言

作用域（Scope）會影響 `變數在哪些地方可以被讀到` ，或是反過來說 `當下程式可以讀到哪些變數` 。

在本篇中，我想紀錄：

1. Global Scope
2. Local(function & block) Scope
3. Scope Chain
4. 在 Child Scope 改 Parent Scope 的值…

正式開始之前，先看看 [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Scope) 的敘述：

> The **scope** is the current context of execution in which values and expressions are `visible` or can be referenced.
>
> 作用域，是一個當下執行的前後文環境，決定有哪些變數或函式可以被 `看見` 或是引用。


再看 [W3School](https://www.w3schools.com/js/js_scope.asp) 的：

> Scope determines the accessibility (visibility) of variables.
>
> 作用域決定了變數是否能被讀取（看見）。
 

## 1. Global Scope

全域作用域，是一種`任何地方`都讀得到的作用域，在 JS 裡我們如果在外部宣告變數，則任何 function 裡就算沒有傳參數進去，都還是讀得到：

```jsx
var a = "這是全域變數"

function outer(a){
	console.log(a) // 印出 "這是全域變數"
}

function outer2(){
	console.log(a) // 也印出 "這是全域變數"
}
```

## 2. Local Scope

區域作用域，只能在`特定區域`讀取，分為 Function Scope 跟 Block Scope。

使用 var 宣告的變數是 Function Scope，存在整個 function 裡面，不管是否有更深層的區域：

```jsx
function outer(){
	var a = "123"
	console.log(a) // 印出 "123"
}
console.log(a) // ReferenceError: a is not defined
```

使用 let, const 宣告的變數是 Block Scope，存在 block `{}` 裡面：

```jsx
function outer(){
	if(true){
		var a = "123"
		let b = "456"
    console.log(a) // "123"
    console.log(b) // "456"
	}
	console.log(a) // "123" 因為這裡仍然是 inner() 這個 function scope
	console.log(b) // 錯誤，因為 b 只存在上面 if 的 block scope 裡面
}
outer()

console.log(a) // 錯誤，a 不是 global scope
console.log(b) // 錯誤，b 也不是 global scope
```

## 3. Scope Chain

當 JS 的程式要讀取某個變數時，會先在當下的 scope 尋找，找不到就會往它的父層 scope 繼續找下去，直到 global scope。這個遞迴過程產生了 Scope Chain，讓變數在適當的 scope 被訪問。

```jsx
let a = "11"
function outer(){
  let b = "22"
  function inner(){
    let c = "33"
    console.log(c) // "33"
    console.log(b) // "22" 因為往父層找 outer() 的 function scope 找到了 b
    console.log(a) // "11" 因為再往父層找 global scope 找到了 a
    console.log(d) // 錯誤，因為整個 scope chain 直到 global 都沒有找到 d
  }
  inner()
  console.log(c) // 錯誤，outer() 的 scope chain 裡只有 a 跟 b
}
outer()
```

## 4. 在 Child Sope 改 Parent Scope 的值…

這題好像在面試有機會出現，因此親自實驗 and 詢問 chatGPT 了一番，下列是我的筆記：

```jsx
var a = "11"

function func1(){
  var a = "22"
  console.log(a) // "22"
}
func1() // 此時 a 沒有被改動，因為 global 的 a 跟 func1() 裡面的 a 是不同的兩個變數。

console.log(a) // "11" 沒變

function func2(){
  a = "33"
}
func2() // 此時 a 被改了，因為 func2() 的 a 是 global scope 裡的 a。

console.log(a) // "33" 變了
```

---

## 重點整理

- Scope 作用域是一個 `範圍`、`環境`、`前後文`，決定了變數在哪裡可以被`看見`或`讀取`。
- 分為 Global scope和 Local scope
    - Local 裡又有 Function Scope 和 Block Scope。
        - `var` 宣告的是 Function Scope
        - `const`, `let` 宣告的是 Block Scope
- 若當下 scope 找不到，會往 Parent scope 找資料，形成 Scope Chain。
- 若是 Scope Chain 裡取得的外層變數，修改它就會改到外層原始的變數。
- 若外層有個 `a`，在內部又重新宣告了一個 `a` ，此時內層的 a 和外層的 a 是兩個不同的變數，且內層只會抓到他自己的 a，修改的時候也不會改到外層。

## Reference

- https://developer.mozilla.org/en-US/docs/Glossary/Scope
- https://medium.com/itsems-frontend/javascript-scope-and-scope-chain-ca17a1068c96
- https://www.w3schools.com/js/js_scope.asp
- https://juejin.cn/post/7070681670625853476
- chatGPT