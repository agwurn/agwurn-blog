---
title: 'JS｜Class'
date: '2023-11-14'
tags: ['#js']
---

這篇可以跟上一篇 [Prototype](https://blog.agwurn.me/posts/js-prototype&inheritance) 互相 review。

## 前言

很多人會說類別（class）像是藍圖，藍圖裡包含一些程式碼跟變數，接著我們可以用這個藍圖來生產多個一樣的實體（instance）。例如假設有一個 `Person` 的 class，其中有 `name`, `hey()` 等屬性跟方法，那我們可以用這個 class 來重複的創造很多個 Person 的 instance，例如 `const p1 = Person(”agwurn”)`、`const p2 = Person(”Harry”)`，那者兩個實體都屬於 Person 這個類別，都擁有 `name`, `hey()` 等屬性可以用。

來看看 MDN 五天前更新的解釋：

> `類別 (class)` 是在 ECMAScript 6 中引入，用來作為建立新物件的模板。它能將程式碼封裝起來便於處理。 類別基於原型（prototype），但在語法和定義上，與 ES5 的類類別（class-like）有所不同。
>
> — [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes)


總之 Class 算是一種語法糖，讓建構函式的封裝、prototype、變得更直覺更便利。

## 最簡範例

我們用跟上一篇 prototype 一樣的 Person 範例，改成用 class 宣告：

```jsx
class Person {
  constructor(name){
    this.name = name;
    this.hey = function () {
      console.log("hey");
    };
  }
}

const agwurn = new Person("agwurn")
agwurn.hey() // "hey"
console.log(agwurn.name) // "agwurn"
```

## 建構子 constructor

可以看到上面範例中一開始即呼叫 `constructor()`，這是用來初始化這個類別的一些屬性的，引入的參數也要寫在這裡，例如 `constructor(name)` 。

- 除了 constructor 以外的地方，是不可以直接 `this.name = name` 來宣告屬性的。
- constructor 裡的 method 將不會放到 prototype，而是每次創建一個類的 instance 就會重新創建一個，導致重複的佔用記憶體，所以我們 method 盡量要放在外面，如下一小節所述。

## 原形方法 prototype method

```jsx
class Person {
  constructor(name){
    this.name = name;
  }
  sayHello(){ // 1
    console.log("hello, I'm", this.name)
  }
}

const agwurn = new Person("agwurn")
agwurn.sayHello() // "hello, I'm agwurn"
```

將 method 直接放在 `1` 的位置，就可以直接宣告 prototype method，這樣多個 Person instance 都會共用這個 prototype method，節省記憶體空間。

## 靜態方法 static method

這個是透過 class 直接呼叫的方法，無法透過 instance 來呼叫。

範例是有 Point 這個 class 紀錄某個點的位置 `x`，並且使用 `static` 創建靜態方法，讓我們可以透過 `Point.distance(p1, p2)` 來得到兩點距離。

```jsx
class Point {
  constructor(x){
    this.x = x;
  }
  static distance(p1, p2){
    return Math.abs(p1.x - p2.x)
  }
}

const p1 = new Point(1)
const p2 = new Point(4)

const d = Point.distance(p1, p2) // here
console.log(d)
```

靜態方法只存在 class，不存在 instance 裡：

```jsx
p1.distance() // TypeError: p1.distance is not a function
```

## 繼承 inheritance

繼承的意義在於我們想創造更進階概念的東西，例如 Person 可以延伸到 Employee，Employee 擁有比 Person 更多屬性如 jobTitle 等。

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log("hello, I'm", this.name);
  }
}

class Employee extends Person {
  // 沒有 constructor 就會直接繼承 Person 所有東西
}

const agwurn = new Employee("agwurn");
agwurn.sayHello(); // "hello, I'm agwurn"
console.log(agwurn.name); // "agwurn" 
```

## super()

若我們想要在繼承的子類別加上其他變數，就要使用 `constructor()`，且子類別必須在 contrustor 裡面呼叫 `super()` 來繼承父類別的 constructor。

```jsx
// ...

class Employee extends Person {
  constructor(name){
    super(name);
  }
}

// ...
```

如果我們還想新增一個變數 `jobTitle`：

```jsx
// ...

class Employee extends Person {
  constructor(name, jobTitle) {
    super(name);
    this.jobTitle = jobTitle;
  }
}

const agwurn = new Employee("agwurn", "Developer");
console.log(agwurn.jobTitle); // Developer
```

## 覆蓋方法

我們可以在子類別宣告同樣名稱的 method，如此當我們呼叫 Employee 的 `sayHello()`，我們會呼叫的是他自己的 `sayHello()` 而不是 Person 的 `sayHello()`。

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log("hello, I'm", this.name);
  }
}

class Employee extends Person {
  constructor(name, jobTitle) {
    super(name);
    this.jobTitle = jobTitle;
  }
  sayHello() {
    console.log("hello, I'm", this.name, "a", this.jobTitle);
  }
}

const agwurn = new Employee("agwurn", "Developer");
agwurn.sayHello(); // hello, I'm agwurn a Developer
```

同理，我們可以新增子類別的方法，而這個方法不存在父類別。

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log("hello, I'm", this.name);
  }
}

class Employee extends Person {
  constructor(name, jobTitle) {
    super(name);
    this.jobTitle = jobTitle;
  }
  sayJobTitle() { // 專屬 Employee 的方法
    console.log("I'm a", this.jobTitle);
  }
}

const agwurn = new Employee("agwurn", "Developer");
agwurn.sayJobTitle(); // I'm a Developer

const harry = new Person("Harry");
harry.sayJobTitle(); // ❌ TypeError: harry.sayJobTitle is not a function
```

## 私有變數 Private Variable

以往沒有真正的 private variable，都是用 `_` 寫在變數前面來讓自己知道這是個私有變數，實質上外部還是存取得到。直到 ES10（2019）之後引入了 `#`，達成真正的私有變數。

```jsx
class Bank {
  #name = "agwurnBank";
  getBankName(){
    return this.#name
  }
}

const myBank = new Bank()

console.log(myBank.getBankName()) // "agwurnBank"
console.log(myBank.#name) // SyntaxError: Private field '#name' must be declared in an enclosing class
```

宣告方式是直接寫上 `#name` 就好，若我們需要 constructor 來自訂變數：

```jsx
class Bank {
  #money; // 一定要先宣告才能用
  constructor(money) {
    this.#money = money;
  }
  getMoney() {
    return this.#money;
  }
  setMoney(newMoney) {
    this.#money = newMoney;
  }
}

const myBank = new Bank(100);

console.log(myBank.getMoney()); // 100
myBank.setMoney(120); 
console.log(myBank.getMoney()); // 120

console.log(myBank.#money); // SyntaxError: Private field '#money' must be declared in an enclosing class
```

## 總結

- class 是 ES6 引入的語法糖，讓建構函式或繼承變得更好寫。
- class 像是個包含各種基礎設定的藍圖，我們用這個藍圖，可以建造多個共用 class 特質的 instance。
- class 使用 `constructor` 來初始化一些參數
- class 直接在 constructor 底下宣告其他 method，這些 method 會放到 prototype 裡，讓多個 instance 共用。
- class 用 `extend` 來繼承，並在 constructor 裡用 `super()` 把父類別的 constructor 繼承下來。
- 子類別可以宣告他自己的 method，不存在父類別裡，若名稱跟父類別重疊，則會直接 override
- ES10 之後 class 有私有變數，使用 `#` 來宣告，且一定要先在 constructor 上面宣告才能用。

---

- [https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes)
- [https://chat.openai.com/](https://chat.openai.com/)