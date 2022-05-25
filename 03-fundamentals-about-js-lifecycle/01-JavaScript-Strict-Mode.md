# JavaScript Stric Mode

Prefer to use 'strict-mode' in your applications. It prevents the "weird behaviors" from JavaScript.

- Started in ECMAScript version 5.
- Not supported by Explorer 9 and lower.
- You can use strict mode in all your programs. It helps you to write cleaner code, like preventing you from using undeclared variables.


## Why Strict Mode?

- Strict mode makes it easier to write "secure" JavaScript.
- Strict mode changes previously accepted "bad syntax" into real errors.
- As an example, in normal JavaScript, mistyping a variable name creates a new global variable. In strict mode, this will throw an error, making it impossible to accidentally create a global variable.
- In normal JavaScript, a developer will not receive any error feedback assigning values to non-writable properties.
- In strict mode, any assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object, will throw an error.
- Strict mode fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that’s not strict mode.
- Strict mode makes it easier to write “secure” JavaScript.



## Watch Out!
The "use strict" directive is only recognized at the beginning of a script or a function.

```
// Whole-script strict mode syntax
'use strict';
 let v = "strict mode script!";
```

```
function strict() {

  // Function-level strict mode syntax
  'use strict';

  function nested() { return 'Javascript on GeeksforGeeks'; }

  return "strict mode function!  " + nested();
}
function notStrict() { return "non strict function"; }
```

Refs:

- https://www.w3schools.com/js/js_strict.asp
- https://www.geeksforgeeks.org/strict-mode-javascript/

