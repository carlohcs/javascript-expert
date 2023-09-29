import { NotImplementedException } from "../../util/exceptions.js"

export class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name)
  }

  _create(data) {
    throw new NotImplementedException(this._create.name)
  }

  // Martin Fowler pattern:
  // ensure a flow of methods,
  // defining a sequence to be executed
  // this create is an effective implementation of Template Method

  // validate data
  // save in db
  create(data) {
    const isValid = this._validateRequiredFields(data)

    if (!isValid) {
      throw new Error("Invalid data!")
    }

    return this._create(data)
  }
}
