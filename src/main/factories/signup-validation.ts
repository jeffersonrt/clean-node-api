import { ValidationComposite } from '../../presentation/helpers/validation/validation-composite'
import { Validation } from '../../presentation/helpers/validation/validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validation/required-field-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
