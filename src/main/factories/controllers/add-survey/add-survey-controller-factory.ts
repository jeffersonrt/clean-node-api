import { makeSurveyValidation } from './add-survey-validation-factory'
import { Controller } from '../../../../presentation/protocols'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'

export const makeSurveyController = (): Controller => {
  const surveyController = new AddSurveyController(makeSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(surveyController)
}
