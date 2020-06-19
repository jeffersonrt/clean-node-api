import { makeSignUpValidation } from './signup-validation'
import { Validation } from '../../presentation/helpers/validation/validation'
import { ValidationComposite } from '../../presentation/helpers/validation/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validation/required-field-validation'
import { CompareFieldValidation } from '../../presentation/helpers/validation/compare-field-validation'
jest.mock('../../presentation/helpers/validation/validation-composite')

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

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
