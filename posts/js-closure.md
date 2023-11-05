---
title: 'JS｜Closure'
date: '2023-11-05'
tags: ['#js']
---

Closure 是一種資料結構，`當一個函式被宣告時，他會在他周圍的詞法環境（Lexical environment）把需要的變數一起包裝起來`，未來這個函式被調用時，裡面所讀取或更動到的變數都來自這個閉包裡。

> 當 function 被宣告的當下，連帶打包起他 lexical environment 裡有用到的東西。
> 

閉包常見的應用是 private variable 的封裝，只要使用閉包將特定變數放到函式裡，再寫一些 getter、setter，就可以讓外部只能照著我們寫的方法去操作資料；另外閉包也可以用在需要被重複建立的物件，使用閉包也可以讓他們彼此之間的資料不互相混淆。

### Closure 最小範例

```jsx
function outer() {
	let a = "hi";
	return function inner(){
		console.log(a);
	}
}

let myClosure = outer()
myClosure() // 印出 hi，因為 a 已經被打包在 myClosure 裡了

console.log(a) // ReferenceError: a is not defined
```

> 我們無法直接取得 `outer()` 裡的 `a`，然而 `myClosure()` 被創建的當下就已經打包好 `a` 在 `inner()` 裡了，所以可以呼叫 `myClosure()` 來取得 `a`
> 

### 私有變數封裝

```jsx
function createBank() {

	let money = 100;

	function showMoney() {
		console.log(money);
	}
	function addMoney(amount) {
		money += amount;
	}

	return {showMoney, addMoney};
}

var mybank = createBank(); 
mybank.showMoney() // 印出 100
mybank.addMoney(10) // money 變成 110
mybank.showMoney() // 印出 110

console.log(money) // ReferenceError: money is not defined
```

上述範例也同時展了工廠模式（Factory Pattern）的設計，適用於需要創建多個相似對象的情況，且彼此之間變數是獨立在各自的封裝裡，不互相混淆。