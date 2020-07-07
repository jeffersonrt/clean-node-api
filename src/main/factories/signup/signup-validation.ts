import { ValidationComposite } from '../../../presentation/helpers/validation/validation-composite'
import { Validation } from '../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validation/required-field-validation'
import { CompareFieldValidation } from '../../../presentation/helpers/validation/compare-field-validation'
import { EmailValidation } from '../../../presentation/helpers/validation/email-validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new CompareFieldValidation('password', 'passwordConfirmation')
  )
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
