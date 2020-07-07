import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../../presentation/helpers/validation/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helpers/validation/required-field-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { CompareFieldValidation } from '../../../presentation/helpers/validation/compare-field-validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { EmailValidation } from '../../../presentation/helpers/validation/email-validation'

jest.mock('../../../presentation/helpers/validation/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all  validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(
      new CompareFieldValidation('password', 'passwordConfirmation')
    )

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
