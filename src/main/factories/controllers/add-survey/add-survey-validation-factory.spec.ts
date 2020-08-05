import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { makeSurveyValidation } from './add-survey-validation-factory'

jest.mock('../../../../validation/validators/validation-composite')

describe('AddSurveyValidation', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSurveyValidation()
    const validations: Validation[] = []
    const requiredFields = ['question', 'answers']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
