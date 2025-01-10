# JavaScript

## Basic 1

- `"use strict";`:
  JavaScript's strict mode is a way to opt in to a restricted variant of JavaScript, thereby implicitly opting-out of "sloppy mode". Strict mode isn't just a subset: it intentionally has different semantics from normal code. Browsers not supporting strict mode will run strict mode code with different behavior from browsers that do, so don't rely on strict mode without feature-testing for support for the relevant aspects of strict mode. Strict mode code and non-strict mode code can coexist, so scripts can opt into strict mode incrementally.

Strict mode makes several changes to normal JavaScript semantics:

1. Eliminates some JavaScript silent errors by changing them to throw errors.
2. Fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
3. Prohibits some syntax likely to be defined in future versions of ECMAScript.
   > "Can't have "with" in strict mode".

```js
// Non-strict code...

(function () {
  "use strict";

  // Define your library strictly...
})();

// Non-strict code...
```

More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

### Code examples

- jQuery example:

```js
(function ($) {
  "use strict";

  //Your code using jQuery
})(jQuery);
```

- Vanilla JS example:

```js
void function () {
  "use strict";

  //Your code
};
```

- Creating libraries in multiple javascript files:

```js
var MyLibraryName = MyLibraryName || {};

MyLibraryName.invalidElements = (function ($) {
  "use strict";

  var _nameClass = "myLibraryInvalidElement"; //Private Property

  var _getnameClass = function () {
    //Private Method
    // Do private stuff, or build internal.
    return _nameClass;
  };
  var _getElementsByClass = function () {
    return $("." + _getnameClass());
  };

  return {
    version: "1.0.0", //constant
    getElementsByClass: _getElementsByClass,
  };
})(jQuery);

//Extend namespace in other files...
//MyLibraryName.otherfunction = (function(){ ... })();

MyLibraryName.invalidElements.getElementsByClass();
```

### Functions

Every function receives two additional parameters: this and arguments...

```js
function demo(name, year) {
  return arguments;
}

demo("Nicholls", 1991); // => ["Nicholls", 1991]
demo("Anonymous"); // => ["Anonymous"]
```

### Exceptions

```js
throw {
  name: "TypeError", //Type of the exception
  message: "Horribleee human!", //Descriptive message
  //Add more properties...
};
```

```js
var tryCatch = function (fn) {
  try {
    fn.apply(this, Array.prototype.slice.call(arguments, 1));
  } catch (ex) {
    /* eat please */
  }
};

tryCatch(demo, "Juan", 1991);
```

### Code Conventions

- Google JavaScript Style Guide: https://google.github.io/styleguide/jsguide.html
- Google TypeScript Style Guide: https://google.github.io/styleguide/tsguide.html
- Airbnb JavaScript Style Guide: https://github.com/airbnb/javascript
- JavaScript Standard Style: https://standardjs.com/

## Basic 2

### Prototypal Inheritance:

The prototype is the basis of inheritance in JavaScriptl, and is used to create new objects that inherit properties and methods from other objects.

```js
var Cat = function (name, age) {
  this.name = name;
  this.age = age;
};
var Siamese = function (color, colorEyes, name, age) {
  Cat.call(this, name, age);
  this.color = color;
  this.color_eyes = colorEyes;
};

Siamese.prototype = Object.create(Cat.prototype);
Siamese.prototype.constructor = Siamese;

var cat = new Siamese("black", "green", "Little cat", 2);

Cat.prototype.run = function () {
  console.log(this.name + " is running!!");
};

cat.run(); // => "Little cat is running!!"
```

### Regular Expressions

It was borrowed from Perl, and is a powerful tool for working with strings.
A regular expression is a pattern of characters. The pattern is used for searching and replacing characters in strings, e.g:

```js
var str = "Hello World";
var regex = /World/;
str.match(regex); // => ["World"]
```

- [JavaScript RegExp Reference](https://www.w3schools.com/jsref/jsref_obj_regexp.asp)
  The RegExp Object is a regular expression with added Properties and Methods.

```js
// Modifiers
let pattern = /w3schools/i; // case insensitive
let pattern = /w3schools/g; // global
let pattern = /w3schools/m; // multiline
let pattern = /w3schools/gim; // case insensitive, global, multiline
```

- Common Regular Expressions:

```js
//Validate Numbers
var pattern = /^\d+$/;
pattern.test("Juan")   // => false

//Validate Emails
var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
pattern.test("john.smith@gmail.com")  // => tr4e
//But the grammar specified in RFC 5322 is too complicated for primitive regular expressions

//Validate Date (MM/DD/YYYY)/(MM-DD-YYYY)/(MM.DD.YYYY)/(MM DD YYYY)
/^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/

//Validate HTML tag
/^<([a-z]+)([^<]+)*(?:>(.*)</1>|s+/>)$/

//Validate URL
/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
```

### OOP (Object Oriented Programming)

Thanks to ECMAScript's prototype-based nature, JavaScript inherits this powerful object-oriented programming capability, making it a fully-featured OOP language despite its different approach from traditional class-based languages.
A prototype is an abstract object, with the ability of containing other objects with different types of data; variables (numbers, string, logical values, etc), arrays, functions and also other set of objects.

#### Classes vs Prototypes

A prototype is an abstract object that can contain:

- Properties (variables)
  - Numbers
  - Strings
  - Boolean values
- Arrays
- Functions (methods)
- Nested objects

```js
// Define a prototype object
const Person = {
  // Properties
  name: "",
  age: 0,

  // Methods
  greet: function () {
    return `Hello, my name is ${this.name}`;
  },

  setAge: function (newAge) {
    this.age = newAge;
  },
};
```

#### Creating the object

We use a function to create an object, that's the constructor and also the way to identify the object.

There are two ways to define a constructor function in JavaScript. Let's use the traditional "Cat" example (because let's face it - if a tutorial about OOP doesn't include a Cat class, is it even worth reading? 😺).

- Method 1: Function Declaration

```javascript
function Cat(name, age) {
  this.name = name;
  this.age = age;
}
```

- Method 2: Function Expression

```javascript
const Cat = function (name, age) {
  this.name = name;
  this.age = age;
};
```

Both methods are functionally equivalent, though they have subtle differences in hoisting behavior. The constructor function serves two purposes:

1. It acts as the blueprint for creating new objects
2. It identifies the object type in the system

> 💡 **Note**: While both approaches work, the choice between them often comes down to coding style and specific use cases. Function declarations are hoisted, while function expressions are not.

#### Properties of the object

Properties are variables stored within the object, defined in the constructor function using the `this` keyword. These properties receive their values through parameters passed when creating a new instance of the object.

```js
const Cat = function (name, color, age) {
  this.name = name;
  this.color = color;
  this.age = age;
};
```

While JavaScript is loosely typed, we can implement strict data typing for better control:

```js
const Cat = function (name, color, age) {
  // Convert inputs to specific types
  this.name = String(name);
  this.color = String(color);
  this.age = Number(age);

  // Data validation
  if (isNaN(this.age)) {
    throw new Error("Age must be a number");
  }
};

// Creating a new instance
const michi = new Cat("Michifu", "blue", 2);
// Property access syntax:
// objectInstance.propertyName
```

> 💡 **Best Practice**: While JavaScript is flexible with data types, implementing type checking can prevent bugs and improve code reliability.

#### Methods of the object

Methods are functions stored within objects that define their behavior. There are several ways to implement methods in JavaScript objects.

- Method 1: External Function Binding
  This approach connects an external function to the object as a method.

```javascript
// Constructor
const Cat = function (name, color, age) {
  this.name = name;
  this.color = color;
  this.age = age;

  // Bind external function as method
  this.eat = eatExternal;
};

// External function definition
function eatExternal() {
  return `${this.name} caught and ate a mouse`;
}

// Usage example
const michi = new Cat("Michifu", "blue", 2);
console.log(michi.eat()); // "Michifu caught and ate a mouse"
```

- Method 2: Internal Function Definition

```javascript
const Cat = function (name, color, age) {
  this.name = name;
  this.color = color;
  this.age = age;

  // Method defined within constructor
  this.eat = function () {
    return `${this.name} caught and ate a mouse`;
  };
};
```

- Method 3: Prototype Extension (Recommended)

```javascript
const Cat = function (name, color, age) {
  this.name = name;
  this.color = color;
  this.age = age;
};

// Add method to prototype
Cat.prototype.eat = function () {
  return `${this.name} caught and ate a mouse`;
};
```

> 💡 **Best Practice**: The prototype extension method (Method 3) is generally preferred as it's more memory-efficient. Methods added to the prototype are shared across all instances rather than being recreated for each object.

#### Inheritance

One of the most powerful features of OOP is the ability to inherit methods and properties from other objects. In JavaScript, this is achieved through prototypes.

```js
// Parent constructor
const Cat = function () {
  this.eyes = 2;
  this.legs = 4;
};

// Child constructor
const Siamese = function () {
  this.color = "white";
  this.eyeColor = "blue";
};

// Inherit from Cat
Siamese.prototype = new Cat();

// Usage example
const kitty = new Siamese();
console.log(kitty.eyes); // Output: 2
console.log(kitty.color); // Output: "white"
```

Using modern JavaScript, we can implement inheritance more cleanly:

```javascript
class Cat {
  constructor() {
    this.eyes = 2;
    this.legs = 4;
  }

  meow() {
    return "Meow!";
  }
}

class Siamese extends Cat {
  constructor() {
    super(); // Call parent constructor
    this.color = "white";
    this.eyeColor = "blue";
  }
}
```

> 💡 **Best Practice**: While prototype inheritance is fundamental to JavaScript, modern class syntax (introduced in ES6) provides a cleaner and more familiar way to implement inheritance patterns.

#### Private Methods and Properties

In JavaScript, we can create private members using closure scope within the constructor function. These members are only accessible within the object's internal scope.

```js
const Cat = function (name) {
  // Public property
  this.name = name;

  // Private property
  const litterBoxFrequency = "moderate";

  // Private method
  function useLitterBox(frequency) {
    return `${name} uses the litter box with ${frequency} frequency`;
  }

  // Public method accessing private members
  this.checkLitterHabits = function () {
    return useLitterBox(litterBoxFrequency);
  };
};
```

Modern Private Fields (ES2022+)

```javascript
class Cat {
  #litterBoxFrequency = "moderate"; // Private field

  constructor(name) {
    this.name = name;
  }

  #useLitterBox() {
    // Private method
    return `${this.name} uses the litter box with ${
      this.#litterBoxFrequency
    } frequency`;
  }

  checkLitterHabits() {
    return this.#useLitterBox();
  }
}
```

> 💡 **Best Practice**: For modern applications, use private class fields (`#`) when possible. Fall back to closure-based privacy for broader browser support.

- Access Control Example

```js
const Cat = function (name) {
  let energy = 100; // Private property

  // Getter
  this.getEnergy = function () {
    return energy;
  };

  // Setter with validation
  this.setEnergy = function (value) {
    if (value >= 0 && value <= 100) {
      energy = value;
    } else {
      throw new Error("Energy must be between 0 and 100");
    }
  };
};
```

#### Extending Native Objects with Prototypes

JavaScript allows you to extend built-in objects (like Array, String, etc.) by adding methods to their prototypes. While powerful, this technique should be used cautiously.

```js
// Adding a custom method to Array prototype
Array.prototype.countOccurrences = function (searchElement) {
  return this.reduce(
    (count, element) => (element === searchElement ? count + 1 : count),
    0
  );
};

// Usage example
const members = ["Alice", "Bob", "Alice", "Charlie", "Alice"];
console.log(members.countOccurrences("Alice")); // Output: 3
```

Also we can add methods to built-in objects using the `Object.defineProperty()` method:

```js
Object.defineProperty(Array.prototype, "countOccurrences", {
  value: function (searchElement) {
    return this.reduce(
      (count, element) => (element === searchElement ? count + 1 : count),
      0
    );
  },
  writable: true,
  configurable: true,
});
```

> 💡 **Best Practice**: While extending native objects with prototypes is powerful, it should be used with caution. It's best to avoid adding methods to built-in objects unless absolutely necessary.

### Constructor Chaining with `call`

Constructor chaining allows you to inherit properties from a parent constructor while adding new properties in the child constructor. This is achieved using the `call` method.

```js
const Shop = (function () {
  // Base Customer constructor
  function Customer(name) {
    this.name = name;
  }

  // Base Customer methods
  Customer.prototype.greet = function () {
    return `${this.name} says hi!`;
  };

  // VIP Customer constructor
  function VipCustomer(name, discountPercentage) {
    // Chain to parent constructor
    Customer.call(this, name);
    this.discountPercentage = discountPercentage;
  }

  // Set up inheritance
  VipCustomer.prototype = Object.create(Customer.prototype);
  VipCustomer.prototype.constructor = VipCustomer;

  // Add VIP-specific methods
  VipCustomer.prototype.getDiscount = function () {
    return `${this.name} gets ${this.discountPercentage}% discount`;
  };

  return {
    Customer,
    VipCustomer,
  };
})();
```

Usage example:

```js
const customer = new Shop.Customer("John");
console.log(customer.greet()); // "John says hi!"

const vipCustomer = new Shop.VipCustomer("Jane", 20);
console.log(vipCustomer.getDiscount()); // "Jane gets 20% discount"
```

> 💡 **Best Practice**: Constructor chaining is a powerful technique that allows you to create complex object hierarchies with ease.

Consider using ES6 classes for clearer syntax:

```javascript
class Customer {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `${this.name} says hi!`;
  }
}

class VipCustomer extends Customer {
  constructor(name, discountPercentage) {
    super(name);
    this.discountPercentage = discountPercentage;
  }

  getDiscount() {
    return `${this.name} gets ${this.discountPercentage}% discount`;
  }
}
```

**Classes** in JS are a simple sugar syntax over the prototype-based OO pattern.

### Immediate Functions (IIFE)

Immediately-invoked function expression (IIFE) is a common pattern in JavaScript that allows you to execute code as soon as it is defined. It is often used to create a scope for variables and prevent naming conflicts.

```js
(function () {
  // Your code here
})();
```

The IIFE pattern is useful when you want to create a self-contained unit of code that can be used in different contexts without polluting the global namespace.

## Basic 3

### Let + Const

Modern JavaScript uses `let` and `const` instead of `var` for better scoping control and immutability. These declarations are block-scoped, meaning they only exist within their containing block.

- `let`: Allows reassignment
- `const`: Creates read-only references
- Both are block-scoped (unlike `var` which is function-scoped)

```js
function scopeExample() {
  {
    let x; // Declare x in this block
    {
      // New block creates new scope
      const x = "sneaky"; // OK: Different scope than outer x
      // x = "foo";          // Error: Assignment to constant variable
    }
    // let x = "inner";        // Error: x already declared in this scope
  }
  let x = "outer"; // OK: Different scope
}
```

### Arrow Functions

Arrow functions are a concise syntax for creating functions. They have a shorter syntax and lexically bind the `this` value, which can be useful in certain situations.

```js
const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

const arr = [1, 2, 3, 4, 5];
const evens = arr.map((num, index) => add(num, index));
const arrMultiplied = arr.map((num) => multiply(num, 2));

// Anonymous functions are useful when this is not needed
const evens = arr.map(function (num, index) {
  // the scope of `this` is not the parent scope, different from arrow functions
  return add(num, index);
});
```

> 💡 **Memory Best Practice**:
>
> - Use arrow functions for callbacks that need parent scope
> - Define arrow functions outside loops to prevent recreation
> - Use method syntax for object methods to maintain proper `this` binding

### Classes

Classes provide a clean, modern syntax for object-oriented programming in JavaScript, offering inheritance, encapsulation, and polymorphism.

```js
// Superclass
class Person {
  #privateField = 'private';  // Private field
  static species = 'Human';   // Static field

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  describe() {
    return `${this.name} is ${this.age} years old`;
  }
  get getYears() {
    return this.age;
  }
  set increaseAge() {
    this.age++;
  }

  // Static method
  static createAdult(name) {
    return new Person(name, 18);
  }
}

// Subclass
class Employee extends Person {
  #salary;  // Private field
  constructor(name, age, role, salary) {
    // Must call super() before using 'this'
    super(name, age);

    this.role = role;
    this.#salary = salary;
  }
  // Override parent method
  describe() {
    // Call parent's describe method
    const baseDescription = super.describe();
    return `${baseDescription} and works as ${this.role}`;
  }

  // New method specific to Employee
  getSalaryInfo() {
    return `${this.name}'s salary is ${this.#salary}`;
  }
}

// Creating instances
const person = new Person("John", 30);
const employee = new Employee("Jane", 25, "Developer", 50000);

// Using methods
console.log(person.describe());
// "John is 30 years old"

console.log(employee.describe());
// "Jane is 25 years old and works as Developer"

// Static method usage
const adult = Person.createAdult("Bob");
```

> 💡 **Best Practices**:
>
> - Always call `super()` first in constructor
> - Use private fields (`#`) for encapsulation
> - Consider composition over inheritance, also when using OOP in JS
> - Use static methods for utility functions

### Arrow Functions with Classes

This is the old way of caching the `this` value in inner functions:

```js
function Car() {
  var self = this; //locally assign this
  self.speed = 0;

  setInterval(function goFaster() {
    //this has a different scope
    self.speed += 5;
    console.log("now going: " + self.speed);
  }, 1000);
}

var car = new Car();
```

Let's use arrow functions to simplify the code:

```js
function Car() {
  this.speed = 0;

  setInterval(() => {
    this.speed += 5; // no need to use `self`, arrow functions have lexical scope
    console.log("now going: " + this.speed);
  }, 1000);
}
```

### Template Strings/Literals

Template strings provide an elegant way to create strings with embedded expressions and maintain formatting. They use backticks "`" instead of quotes.

```js
const name = "John",
  place = "New York";
const modern = `Hello ${name}, welcome to ${place}!`;

// Template string way
const multiline = `
  Line 1
  Line 2
  Line 3
`;
```

#### Tagged Templates

Tagged templates are a more advanced feature that allows you to create custom string interpolation functions. They provide a way to define custom delimiters and control the behavior of the interpolation.

```js
const highlight = (strings, ...values) =>
  strings.reduce(
    (result, str, i) =>
      `${result}${str}${
        values[i] ? `<span class="highlight">${values[i]}</span>` : ""
      }`,
    ""
  );

const name = "Alice";
const status = "active";
const html = highlight`User ${name} is ${status}`;
// output: "User <span class="highlight">Alice</span> is <span class="highlight">active</span>"
```

> 💡 **Best Practices**:
>
> - Use template strings for complex string interpolation
> - Maintain proper indentation in multiline strings
> - Consider tagged templates for advanced string processing
> - Escape backticks when needed using backslash (\`)

#### String.raw

`String.raw` is a built-in tag function that returns the raw string form of template literals, where backslashes are not processed.

```js
const name = "Alice";
const html = String.raw`User <span class="highlight">${name}</span> is active`;
// output: "User <span class="highlight">Alice</span> is active"
```

> 💡 **Best Practices**:
>
> - Use `String.raw` for raw template literals

### Default, Rest and Spread

Default parameters allow you to specify default values for function parameters. Rest parameters allow you to capture an arbitrary number of arguments into an array. Spread parameters allow you to expand an array into individual arguments.

```js
function greet(name, greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

function average(numbers) {
  const total = sum(...numbers);
  return total / numbers.length;
}

const numbers = [1, 2, 3, 4, 5];
console.log(sum(...numbers)); // Output: 15
console.log(average(numbers)); // Output: 3
```

### Modules

Modules allow you to split your code into separate files, making it more maintainable and reusable. ES6 introduced a standardized module format with `import` and `export` statements.

- libs.js

```js
// Named exports
export const sqrt = Math.sqrt;

export function square(x) {
  return x * x;
}

export function diag(x, y) {
  return sqrt(square(x) + square(y));
}

// Default export (optional)
export default {
  sqrt,
  square,
  diag,
};
```

- main.js

```js
import { sqrt, square, diag } from "./libs.js";

// Import all as namespace
import * as MathLib from "./lib.js";

// Import default export
import MathUtils from "./lib.js";

console.log(sqrt(16)); // Output: 4
console.log(square(3)); // Output: 9
console.log(diag(3, 4)); // Output: 5
```

> 💡 **Best Practice**: Use modules to encapsulate related functionality and promote code reusability.

- lib/math.js

```js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;
```

- app.js

```js
import * as math from "lib/math";
alert("2π = " + math.sum(math.pi, math.pi));
```

### Asynchronous Programming

JavaScript is a single-threaded language, which means it can only execute one task at a time. However, it's possible to write asynchronous code using callbacks, promises, or async/await.

#### Promises

Promises represent the eventual completion (or failure) of an asynchronous operation. They can be in one of three states:

- Pending: Initial state
- Fulfilled: Operation completed successfully
- Rejected: Operation failed

```js
const promise = new Promise((resolve, reject) => {
  // Async operation here
  if (success) {
    resolve(value);
  } else {
    reject(error);
  }
});
```

#### Promise Methods

- Promise.race(): Returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with the value or reason from that promise.

```js
Promise.race([
  fetch("https://api.example.com/data1"),
  fetch("https://api.example.com/data2"),
])
  .then((response) => {
    // Handle response
  })
  .catch((error) => {
    // Handle error
  });
```

- Promise.all(): Returns a promise that resolves when all of the promises in the iterable argument have resolved, or rejects with the reason of the first promise that rejects.

```js
Promise.all([
  fetch("https://api.example.com/data1"),
  fetch("https://api.example.com/data2"),
])
  .then((responses) => {
    // Handle responses
  })
  .catch((error) => {
    // Handle error
  });
```

- Promise.resolve(): Returns a promise that resolves to the given value.

```js
Promise.resolve(value)
  .then((value) => {
    // Handle value
  })
  .catch((error) => {
    // Handle error
  });
```

- Promise.reject(): Returns a promise that rejects to the given reason.

```js
Promise.reject(reason)
  .then((value) => {
    // Handle value
  })
  .catch((error) => {
    // Handle error
  });
```

#### Creating Promises

```js
const p1 = new Promise((resolve) => setTimeout(() => resolve("one"), 400));

const p2 = new Promise((resolve) => setTimeout(() => resolve("two"), 200));

Promise.race([p1, p2])
  .then((value) => console.log(value)) // "two"
  .catch((error) => console.error(error));
```

> 💡 **Best Practice**: Use async/await for cleaner code, but understand Promises for better error handling and race conditions.

```javascript
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
```

**Async/Await** is just a syntactic sugar over Promises, so it's important to understand how Promises work before using async/await.

#### Callback Hell

We use promises to avoid the callback hell for deferred object controls operation:

- Callback hell:

```js
step1(function (value1) {
  step2(value1, function (value2) {
    step3(value2, function (value3) {
      step4(value3, function (value4) {
        // Do something with value4
      });
    });
  });
});
```

- Promise way:

```js
step1()
  .then((value1) => step2(value1))
  .then((value2) => step3(value2))
  .then((value3) => step4(value3))
  .then((value4) => {
    // Do something with value4
  })
  .catch((error) => {
    // Handle error
  });
```

> 💡 **Best Practice**: Use promises to avoid callback hell and improve code readability.

## Architecture 1

### Method Invocation Pattern

In JavaScript, method invocation refers to calling a function that is a property of an object (a method) using dot notation or bracket notation.

```js
const person = {
  name: "John",
  age: 30,
  // When a function is stored as a property of an object, we call it a "method"
  greet: function () {
    // "this" refers to the current object, allowing access to its properties
    return `Hello, my name is ${this.name}`;
  },
};

// Method invocation
person.greet();
```

> 💡 **Best Practice**: Use method invocation pattern for object methods.

### Function Invocation Pattern

The Function Invocation Pattern occurs when a function is called without an owner object.

```js
person.sayGoodbye = function () {
  const helper = () => `Goodbye, ${this.name}!`;
  return helper(); // Invoke helper as a function
};

// Function invocation
person.sayGoodbye();
```

> 💡 **Best Practice**: The function invocation pattern is useful when you need utility functions that don't depend on an object's context. However, be cautious when using it inside methods, as it will lose the object's `this` binding. In such cases, either store `this` in a variable or use arrow functions.

### Constructor Invocation Pattern

A function that is called with the `new` prefix acts as a constructor. Constructor functions are written in PascalCase (starting with a capital letter) to indicate they should be used with `new`.

```js
// Create a constructor function called Quo.
// It makes an object with a status property.
const Quo = function (string) {
  this.status = string;
};
// Give all instances of Quo a public method called getStatus.
Quo.prototype.getStatus = function () {
  return this.status;
};
// Make an instance of Quo.
const myQuo = new Quo("confused");
document.writeln(myQuo.getStatus()); // confused
```

> 💡 **Best Practice**: Always use the `new` prefix when calling constructor functions. By convention, constructor functions start with a capital letter to remind us to use `new`. If you forget `new`, `this` will bind to the global object, potentially causing problems.

### Apply Invocation Pattern

The `apply` method allows us to call a function with a specified `this` value and arguments provided as an array. This pattern is particularly useful for method borrowing and applying functions with dynamic arguments.

```js
// Basic example: Sum numbers using apply
const numbers = [3, 4];
const add = function (x, y) {
  return x + y;
};

// First argument (null) is 'this' binding
// Second argument is array of parameters
const sum = add.apply(null, numbers); // 7

// Object that doesn't inherit from Quo
const statusObject = {
  status: "A-OK",
};

// Borrow getStatus method using apply
const status = Quo.prototype.getStatus.apply(statusObject); // "A-OK"
```

> 💡 **Best Practice**: Use the `apply` method when you need to call a function with a specified `this` value and arguments provided as an array. This pattern is particularly useful for method borrowing and applying functions with dynamic arguments.

### The Module Pattern

The Module Pattern provides structure and organization in JavaScript by combining several patterns to create self-contained, decoupled units of code. Unlike other languages with built-in module systems, JavaScript uses this pattern to achieve similar functionality.

```js
const awesomeNewModule = (function () {
  // Public API object
  const exports = {
    foo: 5,
  };

  // Add methods to public API
  exports.helloPeople = function () {
    console.log("Hello folks!");
  };

  // Return public interface
  return exports;
})();

awesomeNewModule.helloPeople(); // "Hello folks!"
console.log(awesomeNewModule.foo); // 5
```

- Submodule:

```js
var awesomeNewModule.sub = (function(exports) {
  // Add properties to exports
  exports.foo = 5;

  // Add methods to exports
  exports.helloPeople = function() {
    console.log("Hello folks!");
  };

  // Return modified exports
  return exports;
}(awesomeNewModule.sub || {}));  // Initialize if not exists
```

- Extend the module in multiple files:

```js
// File 1:
var awesomeNewModule = awesomeNewModule || {};
awesomeNewModule.sub = (function (exports) {
  // Add properties to exports
  exports.foo = 5;

  // Add methods to exports
  exports.helloPeople = function () {
    console.log("Hello folks!");
  };

  // Return modified exports
  return exports;
})(awesomeNewModule.sub || {}); // Initialize if not exists

// File 2:
var awesomeNewModule = awesomeNewModule || {};
awesomeNewModule.sub = (function (exports) {
  exports.bla = 10;

  exports.goodbyePeople = function () {
    console.log("Bye bye folks!");
  };

  return exports;
})(awesomeNewModule.sub || {});

// index.js:
awesomeNewModule.sub.helloPeople(); // "Hello folks!"
awesomeNewModule.sub.goodbyePeople(); // "Bye bye folks!"
```

- Creating a custom library:

```js
var App = App || {};
App.Models = (function (exports) {
  exports.User = function (name) {
    this.name = name;
  };

  exports.User.prototype.run = function () {
    console.log(this.name + " is running!");
  };

  return exports;
})(App.Models || {});
```

- Extending the library:

```js
var App = App || {};
App.Models = (function (exports) {
  exports.User.prototype.jump = function () {
    console.log(this.name + " is jumping!");
  };

  return exports;
})(App.Models || {});
```

## Architecture 2

### Constructor Pattern

It's a way to create and initialize objects using a special constructor function, providing a way to create multiple instances of similar objects with shared behavior through prototypes

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

Car.prototype.start = function () {
  console.log("The " + this.make + " " + this.model + " is starting.");
};

Car.prototype.stop = function () {
  console.log("The " + this.make + " " + this.model + " is stopping.");
};

const car1 = new Car("Toyota", "Camry", 2022);
const car2 = new Car("Honda", "Civic", 2022);

car1.start(); // "The Toyota Camry is starting."
car2.start(); // "The Honda Civic is starting."

car1.stop(); // "The Toyota Camry is stopping."
car2.stop(); // "The Honda Civic is stopping."
```

> 💡 **Best Practice**: Use the constructor pattern when you need to create and initialize objects with shared behavior through prototypes.

### Module Pattern

The Module Pattern is a design pattern that provides a way to create encapsulated code with private and public parts. Here's a structured explanation:

```js
const Logger = (function () {
  // Private members
  const logHistory = [];

  function formatMessage(message, type) {
    return `[${type.toUpperCase()}] ${message}`;
  }

  // Public API
  return {
    log: function (message) {
      const formattedMessage = formatMessage(message, "info");
      logHistory.push(formattedMessage);
      console.log(formattedMessage);
    },
    getHistory: function () {
      return [...logHistory];
    },
  };
})();
```

### Singleton Pattern

The Singleton Pattern ensures a class has only one instance and provides a global point of access to it.

```js
class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
    }
    return Logger.instance;
  }

  log(message) {
    console.log(message);
  }
}
```

### Observer Pattern

The Observer pattern defines a one-to-many dependency between objects. When one object (the subject/observable) changes state, all its dependents (observers) are notified and updated automatically. This pattern is commonly used in event handling systems.

```javascript
class Subject {
  constructor() {
    this.observers = new Set();
    this.state = null;
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }

  // Example method that changes the subject's state
  setState(state) {
    this.state = state;
    this.notify(this.state);
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} received update:`, data);
  }
}

// Usage
const subject = new Subject();
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.setState({ message: "Hello World" });
subject.unsubscribe(observer2);
subject.setState({ message: "Hello Again" }); // Only observer1 notified
```

> 💡 **Best Practice**: Use the Observer pattern when you need a one-to-many dependency between objects without making them tightly coupled. Ensure proper cleanup by unsubscribing observers when they're no longer needed to prevent memory leaks.


