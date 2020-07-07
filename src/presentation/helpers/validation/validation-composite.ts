import { Validation } from '../../protocols/validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]

  constructor (validation: Validation[]) {
    this.validations = validation
  }

  validate (input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
