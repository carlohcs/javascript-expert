## Factory vs Facade

Factory -> Factory pattern is like a factory that produces specific parts on demand;

Facade -> Facade pattern is like a person who knows the parts well and assembles them for you, without you having to worry about the construction details.


### FACTORY

```
class Robot {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, I am ${this.name}!`);
  }
}

class RobotFactory {
  createRobot(name) {
    return new Robot(name);
  }
}

// Usage of Factory pattern
const factory = new RobotFactory();
const robot = factory.createRobot("Robbie");
robot.greet();
```

### FACADE

```
class Head {
  attach() {
    console.log("Head attached.");
  }
}

class Arms {
  attach() {
    console.log("Arms attached.");
  }
}

class Legs {
  attach() {
    console.log("Legs attached.");
  }
}

class RobotFacade {
  constructor() {
    this.head = new Head();
    this.arms = new Arms();
    this.legs = new Legs();
  }

  assembleRobot() {
    this.head.attach();
    this.arms.attach();
    this.legs.attach();
  }
}

// Usage of Facade pattern
const facade = new RobotFacade();
facade.assembleRobot();
```