---
title: 'JS｜Prototype & Inheritance 的一些疑惑'
date: '2023-11-12'
tags: ['#js']
---

## 前言

我目前所知 prototype 為 JavaScript 物件都具有的元素，多個 object 可以共用一個 prototype，其中會有一些共用的 `屬性` 或 `方法`。而 prototype 也可以被繼承，例如有 Person 這個類別，我們再用一個 Employee 這個類別，並繼承 Person 的 prototype，此時就能擁有 Person prototype 裡的屬性或方法。

> All JavaScript objects inherit properties and methods from a prototype.
>
> 所有 JavaScript 物件都繼承著某個 prototype 原形。
>
> — [w3school](https://www.w3schools.com/js/js_object_prototypes.asp)

如同我們使用的 `array.push()` ，就源自於 Array 這個類裡面的 prototype，再舉一個常用的：
`array.length` 也是 Array 的 prototype 裡的屬性之一。

## 最簡範例

我們創建一個 Person 的建構函式（constructor function），這個 Person 有 `name` 跟 `hey()` 這個印出 “hey” 文字的方法，並幫他的 prototype 加上 `sayHello()` 的方法。

```jsx
function Person(name) {
  this.name = name;
	// 1.
  this.hey = function () {
    console.log("hey");
  };
}

// 2.
Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const agwurn = new Person("agwurn");
agwurn.sayHello(); // "Hello, I'm agwurn"
agwurn.hey(); // "hey"
```

1. 屬於 instance 的 method，代表每個 instance 都會有一個 `獨立的 hey()`。
2. 附屬於 Person.prototype 的 method，代表每個不同 Person 的 instance 是共用著這一個 `sayHello()` 的，可以`節省記憶體`。

## Prototype Inheritance

我們新增 `Employee` 的類，因為 Employee 算是更明確的概念的 Person，所以我們可以用繼承 Person 的方式，來減少重複的程式碼。

```jsx
// 接續前面的程式碼...

function Employee(name, jobTitle) {
  Person.call(this, name); // 1.

  this.jobTitle = jobTitle;
}

Employee.prototype = Object.create(Person.prototype); // 🌟2.
Employee.prototype.jobInfo = function () {
  console.log(`${this.name} is a ${this.jobTitle}`);
};

const agwurn = new Employee("agwurn","developer");

agwurn.sayHello(); // "Hello, I'm agwurn"
agwurn.hey(); // "hey"
agwurn.jobInfo(); // "agwurn is a developer"
```

在 1. 的地方，`Person.call(this, name)` 會將 Person 原有的 name 綁過來 Employee 這裡，讓這裡也有 name 這個屬性。

而在 2. 的地方，我們不能直接 `Employee.prototype = Person.prototype` ：

```jsx
Employee.prototype = Person.prototype; 
// ❌ 因為這只是把 Person.prototype 的記憶體位址複製過來，此時兩者會指向同一個物件。

Employee.prototype = Object.create(Person.prototype); 
// ✅ 真正複製了一個新的 prototype 並賦值給 Employee.prototype
```

因為 JS 物件若直接 `=`，他只會把 Employee.prototype 指向 Person.prototype，此時他們倆是共用同一個物件的，若修改了 Employee.prototype 就會同時污染到 Person.prototype，因此我們要使用`Object.create()`，這個方法會真正創建一個新的物件並且複製 Person.prototype，使其擁有一樣內容，但彼此在記憶體中是真正分開的兩個不同物件。

## 建構函式跟實體的 prototype

取得 constructor function 或是創造出來的 instance 他們的 prototype，程式碼是不一樣的。

```jsx
function Person(name) {
  this.name = name;
}
Person.prototype.age = 26;

const agwurn = new Person("agwurn");

// 1. instance 無法直接呼叫 prototype
console.log(agwurn.prototype) // undefined
console.log(Person.prototype) // {age: 26}

// 2. instance 要用這兩種方法得到 prototype
console.log(Object.getPrototypeOf(agwurn)) // {age: 26}
console.log(agwurn.__proto__) // {age: 26}

// 3. 確認 instance 與 constructor function 的 prototype 一樣 
console.log(agwurn.__proto__ === Person.prototype) // true
console.log(Object.getPrototypeOf(agwurn) === Person.prototype) // true
```

## 總結

- prototype 就是 JS 各種物件帶有的一個繼承物件，例如我們創建的 array 內部都會預設有 `array.push()`、`array.length` 等 prototype 的屬性或方法。
- 建構函式直接 `this.something` 所創建的 method 並不會丟進 prototype，也就是每創建一個新的 Person，那就會多一份 this.something 的 property 或 method。
- 使用 `Person.prototype.something` 另外宣告的 method 會進到 Person.prototype 裡，此時不管創建多少個新 Person，他們都會共用同一個 prototype，節省記憶體。
- 談到 inheritance，我們可以創建一個 Employee 建構函式，並在其中呼叫 `Person.call(this, name)` 來把 Person 的 name 綁過來 Employee 的 this。
- 至於 prototype 的 inheritance，我們不能直接用 = 的方式把兩個 prototype 連起來，因為這樣他們兩個 prototype 實際上都是指向 Person 的，這樣修改其中一個都會污染到另一個；我們要用 `新 = Object.create(原);` 的方式把原來的 prototype 重新拷貝一份並賦值給新的 prototype，就可以真正的完成 prototype 的繼承。
- constructor function 的 prototype 直接 `Person.prototype` 取用就好，而 instance 的 prototype 需要用 `Employee.__proto__` 或 `Object.getPrototypeOf(Employee)` 來取得。constructor function 跟他的 instance 擁有一樣的 prototype。
- 接下來好像可以繼續往 class 做研究…

---

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype#description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype#description)
- [https://www.w3schools.com/js/js_object_prototypes.asp](https://www.w3schools.com/js/js_object_prototypes.asp)
- [https://chat.openai.com/](https://chat.openai.com/c/be505174-8b70-423f-84b8-d9225098f6fa)