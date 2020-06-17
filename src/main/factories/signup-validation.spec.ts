import { makeSignUpValidation } from './signup-validation'
import { Validation } from '../../presentation/helpers/validation/validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validation/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validation/validation-composite'

jest.mock('../../presentation/helpers/validation/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all  validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
