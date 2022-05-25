# Call Stack and Memory Heap

From https://medium.com/@allansendagi/javascript-fundamentals-call-stack-and-memory-heap-401eb8713204:

```
The Javascript Engine does a lot of work for us. But the biggest thing is reading our code and executing it. The two main important things in this step are:

1. We need a place to store and write information — data for our app(variables, objects, etc..)
2. We need to keep track of what's happening to our code line by line.

This is where a call stack and a Memory heap comes in. We need the memory heap as a place to store and write information because at the end of the day all programs just read and write operations — that is to allocate, use and release memory.
```

In resume:

*Call Stack*: helps us keep track of where we are in the code so that we can run the code in order.

*Memory heap*: a place to store and write information because at the end of day all programs just read and write operations-that its to allocate, use and release memory.

## Stack Overflow

It happens when we call functions nested inside each, other over and over again. If we just keep adding functions to the stack without popping them off, we will have a stack overflow.

Eg.:

```
function inception() {
  inception()
}

inception()
```

## Garbage Collection and Memory Leaks

### Garbage Collection
From https://medium.com/@allansendagi/javascript-fundamentals-call-stack-and-memory-heap-401eb8713204:


```
Javascript is a garbage-collected language. This means that if Javascript allocates memory, let's say within a function we create an object and that object gets stored somewhere in our memory heap, automatically when we finish calling that object and if we don't need that object anymore, and there is no reference to it in our program, Javascript is going to clean it up for us.

So, automatically Javascript frees this memory or to put literally — it collects our garbage.
```

## Memory Leaks

### 3 common memory Leaks

#### Global Variables

```
var a = 1;
var b = 1;
var c = 1;
```

Here if I just keep adding these variables to my memory, all our memory is will eventually get used up because we are just using up memory. Imagine if these were deeply nested objects, we will be using up a lot of memory.

#### Event Listeners

```
var element = document.getElementById(‘button’)
element.addeventListener(‘click’, onClick)
```

This is a common way to leak memory because you can just keep adding event listeners and you don't remove them when you no longer need them. They will stay in the background and before you know, you have a memory leak.


### setInterval()

If we put objects inside a setInterval(), they will never be garbage collected unless we remove the setInterval itself.

```
setInterval( () => { //referencing objects })
```

So something to keep in mind is that memory is limited. When it comes to a call stack and memory Heap, those are two places is where javascript runs and stores memory. So we have to be careful not to have memory leaks or stack overflow if we are to have efficient code.

#### Javascript is a single-threaded Programming language (synchronous)

This means that only one set of instructions is executed at any single time. It’s not doing multiple things. The best way to check if a language is single-threaded is if it has one call stack. We push and pop functions off the stack one by one. And so Javascript is synchronous — only one thing can happen at a time.



Refs:

- https://medium.com/@allansendagi/javascript-fundamentals-call-stack-and-memory-heap-401eb8713204 - this is the better
- https://levelup.gitconnected.com/understanding-call-stack-and-heap-memory-in-js-e34bf8d3c3a4
- https://www.mattzeunert.com/2017/03/29/v8-object-size.html
- https://developer.mozilla.org/en-US/docs/Glossary/Primitive