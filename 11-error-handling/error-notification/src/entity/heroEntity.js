import { NotificationContext } from "../notification-context.js"

export class HeroEntity extends NotificationContext {
  constructor({ name, age }) {
    super()

    this.name = name
    this.age = age
  }

  isValid() {
    if (this?.age < 28) {
      this.addNotification("age must be higher than 28")
    }

    if (this.name?.length < 4) {
      this.addNotification("name length must be higher than 4")
    }

    return !this.hasNotifications()
  }

  toString() {
    return `Hero Name: ${this.name}\nHero Age: ${this.age}`
  }
}
