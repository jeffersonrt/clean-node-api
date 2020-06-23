import { ValidationComposite } from './validation-composite'
import { Validation } from './validation'
import { MissingParamError } from '../../errors'

describe('Validate Composite', () => {
  test('Should return and error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
