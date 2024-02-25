import { BaseError } from './base-error.js'

export class BusinessError extends BaseError {
  constructor(errorMessage) {
    super({
      name: 'BusinessError',
      message: errorMessage
    })
  }
}