import NotImplementedException from "../not-implemented-exception.mjs"

export class ViewFactory {
  // If the class use ViewFactory, it needs to implement `createTable` method.
  // Otherwise, we will throw an error
  createTable() {
    throw new NotImplementedException(this.createTable.name)
  }
}
