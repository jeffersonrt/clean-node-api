import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
  save: (data: SaveResultModel) => Promise<SurveyResultModel>
}
