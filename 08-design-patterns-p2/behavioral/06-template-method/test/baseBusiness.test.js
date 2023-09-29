import { expect, describe, it, jest } from '@jest/globals'
import { BaseBusiness } from '../src/business/base/baseBusiness'
import { NotImplementedException } from '../src/util/exceptions'

describe('BaseBusiness', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('throws an error when child class doesnt implement _validateRequiredFields function', () => {
    class ConcreteClass extends BaseBusiness {}

    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedException(
      concreteClass._validateRequiredFields.name
    )

    expect(() => concreteClass.create({})).toThrowError(validationError)
  })

  it('throws an error when _validateRequiredFields returns false', () => {
    const VALIDATION_DOESNT_SUCCEDED = false;
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEDED);
    }

    const concreteClass = new ConcreteClass()
    const validationError = new Error('Invalid data!')

    expect(() => concreteClass.create({})).toThrowError(validationError)
  })

  it('throws an error when child class doesnt implement _create function', () => {
    const VALIDATION_SUCCEDED = true;
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEDED);
    }

    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedException(concreteClass._create.name)

    expect(() => concreteClass.create({})).toThrowError(validationError)
  })

  it('calls _create and _validateRequiredFields on create', () => {
    const VALIDATION_SUCCEDED = true;
    const CREATE_SUCCEDED = true;
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEDED);
      _create = jest.fn().mockReturnValue(CREATE_SUCCEDED);
    }

    const concreteClass = new ConcreteClass()
    const createFromBaseClass = jest.spyOn(BaseBusiness.prototype, BaseBusiness.prototype.create.name);
    const result = concreteClass.create({});

    expect(result).toBeTruthy()
    expect(createFromBaseClass).toHaveBeenCalled();
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled();
    expect(concreteClass._create).toHaveBeenCalled();
  })
})
