# README

> Remember for errors like:

```
// process.on('uncaughtException') // for exceptions
// process.on('unhandledRejection') // for promises
```

```
Did you know: A lot of static code analyzers report throwing and catching generic Exceptions as a code smell.
```

they are based on contexts

## Remember

- Maybe use DDD instead of throwing errors:
  - https://medium.com/@roccolangeweg/domain-driven-challenges-how-to-handle-exceptions-9c115a8cb1c9
  - https://dev.to/jhonesgoncalves/domain-notification-em-nodejs-35mk
  - https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice#domain-events-and-notifications
  - and use flunt - https://github.com/jhonesgoncalves/flunt - or https://zod.dev/
- THROWN ERRORS IS NOT A GOOD APPROACH - IS NOT SCALABLE

## Refs:

- https://sematext.com/blog/node-js-error-handling/
- https://nodejs.org/api/process.html#process_exit_codes
- https://nodejs.org/api/process.html?ref=hackernoon.com#process_signal_events
- https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357
- https://www.gnu.org/software/libc/manual/html_node/Termination-Signals.html?ref=hackernoon.com
- https://nodejs.org/api/errors.html