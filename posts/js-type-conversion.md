---
title: 'JS｜Type Conversion'
date: '2023-11-11'
tags: ['#js']
---

## 1. 前言

這篇比較想整理一下面試可能會遇到的轉換問題，例如把數字跟字串做相加相減等等的操作時，JavaScript 會自動幫我們轉換其中的 type，多了解這個就可以避免一些意想不到的 bug。

- 2-1. Number
- 2-2. String
- 2-3. Boolean
- 2-4. undefined
- 2-5. null
- 2-6. NaN
- 3 明確的 type 轉換
- 4 嚴格相等運算符 ===
- 5 注意浮點數計算問題

## 2-1. Number

- 與 string 使用 + 時，會進行`字串拼接`（無論順序）

```jsx
console.log(1 + '2') // '12'
console.log('1' + 2) // '12'
console.log(1 + 'hello') // '1hello'
```

## 2-2. String

- 使用 + 來字串拼接

```jsx
console.log('3' + '2') // '32'
```

- 如遇到 - * / % 等則會轉換成`數字計算`
    - 但如果數字計算裡有 string 無法轉成數字，整個計算結果就會變成 `NaN` （Not a Number）

```jsx
console.log('3' - 1) // 3 - 1 = 2
console.log('3' * '2') // 3 * 2 = 6
console.log(3 / 'hello') // NaN
console.log('world' % '2') // NaN
```

## 2-3. Boolean

- 遇到數字計算的情況會轉成 number（`true`轉`1`、`false`轉`0`）
- 遇到字串拼接的情況會轉成 string（`true`轉`’true’`、`false`轉`’false'`）

```jsx
console.log(true + 3) // 1 + 3 = 4
console.log(false + 3) // 0 + 3 = 3
console.log(true + '3') // 'true' + '3' = 'true3'
console.log(false + '3') // 'false' + '3' = 'false3'
console.log(true - '3') // 1 - 3 = -2
console.log(false - '3') // 0 - 3 = -3
```

## 2-4. undefined

- 遇到數字計算會變成 NaN
- 遇到字串拼接會轉成 ‘undefined’

```jsx
console.log(undefined + 3) // NaN
console.log(undefined + '3') // 'undefined3'
console.log(undefined - '3') // NaN
```

## 2-5. null

- 遇到數字計算會變成 0
- 遇到字串拼接會轉成 ‘null’

```jsx
console.log(null + 3) // 0 + 3 = 0
console.log(null + '3') // 'null3'
console.log(null - '3') // 0 - 3 = -3
```

## 2-6. NaN

- NaN 做任何數字計算都是 NaN
- 遇到字串拼接會轉成 ‘NaN’ 並拼接

```jsx
console.log(NaN + 3) // NaN
console.log(NaN + '3') // 'NaN3'
console.log(NaN - '3') // NaN
```

## 3. 明確的 type 轉換

上述提及的內容都屬於 JS 自動進行的隱式轉換（Implicit Conversion），我們可以藉由主動的對 type 預先做轉換來得到比較預期的結果。

```jsx
console.log(Number('3')) // 3
console.log(String(5)) // '5'
console.log(Number('hello')) // NaN
console.log(parseInt('123.45')) // 123
console.log(parseFloat('123.45')) // 123.45
```

## 4. 嚴格相等運算符 ===

盡量使用嚴格相等運算符（Strict equality operator） === 強制不做隱式型別轉換，如此只要型態不同就會是 false

```jsx
console.log('3' == 3) // true
console.log('3' === 3) // false
console.log(3 === 3) // true
```

## 5. 注意浮點數計算問題

因為 JS 內部用二進位表達浮點數，二進位在表達 0.1 的時候會出現循環小數，這樣做 0.1 + 0.2 這樣的計算時，結果可能是個非常接近但不完全等於 0.3 的小數。

可以用 `.toFixed(n)` 來限制小數只到小數點後 `n` 位。

```jsx
let ans = 0.1 + 0.2;
console.log(ans) // 0.30000000000000004
console.log(ans.toFixed(3)) // 0.300
```

## 本章總結

- num + str 會變成`字串拼接`，num 會被轉 str
- num -*/% str 都會變成`數字計算`，str 會被轉 num，但如果 str 裡面不只數字，那整個計算就會變 NaN
- boolean 遇到字串拼接就會變 str 的 true 或 false、遇到數字計算就會變成 1 或 0
- undefined 遇到字串拼接就會是 str 的 ’undefined’、遇到數字計算就會變 NaN
- null 遇到字串拼接會變 str 的 ‘null’、遇到數字計算就會變 0
- NaN 遇到字串拼接會變 NaN、遇到計算結果都會是 NaN
- 可以用 `Number()`, `String()`, `parseInt()`, `parseFloat()` 來主動轉換 type，避免 JS 在隱式轉換的時候不小心產生沒有預料到的 bug。
- 可以用 `strict equality operator` === 來限制左右型別要相等才會回傳 true，減少非預期的 bug
- 由於 JS 用二進位存 float，像 0.1 在二進位裡表達會有循環小數。可以用 `toFixed(n)` 來控制一些浮點數的小數點後幾位，避免得到不想要的結果（例如 0.1 + 0.2 得到 0.30000000000000004 之類的）