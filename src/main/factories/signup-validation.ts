import { ValidationComposite } from '../../presentation/helpers/validation/validation-composite'
import { Validation } from '../../presentation/helpers/validation/validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validation/required-field-validation'
import { CompareFieldValidation } from '../../presentation/helpers/validation/compare-field-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new CompareFieldValidation('password', 'passwordConfirmation')
  )
  return new ValidationComposite(validations)
}
