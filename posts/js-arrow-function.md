---
title: 'JS | Arrow Function'
date: '2023-11-02'
tags: ['#js']
---


### 簡潔的語法

```jsx
// 1. 一般函式
function increment(a){
	return a + 1;
}

// 2. 箭頭函式
const increment = (a) => {
	return a + 1;
}

// 3. 只有一行的表達式可省 return
const increment = (a) => a + 1;

// 4. 只有一個輸入可省括號
const increment = a => a + 1;
```

### 適合做 callback

- 可做匿名函式，不用特別想 callback 名稱
- 超簡潔語法很省程式碼、增加可讀性

### 沒有自己的 this

- 在被創建時就固定了 this 在外部作用域的 this （與包圍他的 function 有一樣的 this）
- 好處是可預期的穩定的 this 綁定

### 沒有.call() .apply() .bind()

- 無法綁定其他物件

### 不能做建構函式

- Arrow function 本身不可以作為建構函式
- 不能用 new 的方式
- 不可以放在 Class 的 contructor 裡