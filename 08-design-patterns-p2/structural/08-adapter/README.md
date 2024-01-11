# README

## Adapter

> A real world analogy always helps with the understanding of a design pattern. The best example for the adapter pattern is based around AC power adapters. Say you're visiting Europe from the US, with your laptop, which expects a US power supply. To get your laptop plugged in, you're going to need to get a power adapter that accepts your US plug and allows it to plug in to the European power outlet. The AC adapter knows how to deal with both sides, acting as a middleman - this is the adapter pattern.

> It remembers the Strategy pattern. What's the difference between then? 

> Strategy is used to have different algorithm solutions (instead of running an if -> function, you create a strategy for each if)

> Adapter serves to maintain compatibility between functions, standardizing the signature between them. 

> That is, you can use the 2 together: Imagine you need to create a Logs strategy:
If it is a purchase log, call log01 if it is a new customer log02

> Log01 has the signature log01.logar and log02 has the signature log02.write

> you create an adapter to standardize log naming. Now log01Adapter.write and log02Adapter.write

> So in your strategies being sales and customer registration, you have two different algorithms that use a log class and the strategy does not necessarily need to know what the log implementation is, just the signature, which is .write (since all adapters have the same signature)


Ref:

https://dzone.com/articles/design-patterns-uncovered-0

https://refactoring.guru/design-patterns/adapter