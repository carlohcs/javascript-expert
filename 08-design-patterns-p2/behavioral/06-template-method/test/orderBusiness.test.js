import { expect, describe, it, jest } from '@jest/globals'
import { OrderBusiness } from '../src/business/orderBusiness'
import { Order } from '../src/entities/order'
import { NotImplementedException } from '../src/util/exceptions'

describe('OrderBusiness', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('execution OrderBusiness without Template Method', () => {
    const order = new Order({
      customerId: 1,
      amount: 1000,
      products: [
        {
          description: 'Ferrari',
          value: 1000
        }
      ]
    });

    const orderBusiness = new OrderBusiness();

    // all devs should obrigatory remember all methods from this class
    // if someone forgot to do it, can break the system
    const isValid = orderBusiness._validateRequiredFields(order);
    expect(isValid).toBeTruthy();

    const result = orderBusiness._create(order);
    expect(result).toBeTruthy();
  })
  it('execution OrderBusiness with Template Method', () => {
    const order = new Order({
      customerId: 1,
      amount: 1000,
      products: [
        {
          description: 'Ferrari',
          value: 1000
        }
      ]
    });

    const orderBusiness = new OrderBusiness();
    const calledValidationFn = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name)
    const calledCreateFn = jest.spyOn(orderBusiness, orderBusiness._create.name)
    // with Template Method, the sequence of steps is always executed
    // avoiding duplication

    const result = orderBusiness.create(order);
    expect(result).toBeTruthy()
    expect(calledValidationFn).toHaveBeenCalled();
    expect(calledCreateFn).toHaveBeenCalled();
  })
})
