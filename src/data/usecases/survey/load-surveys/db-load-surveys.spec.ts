import MockDate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository } from './db-load-surveys-protocols'
import { throwError, mockSurveyModels } from '@/domain/test'
import { mockLoadSurveysRepository } from '@/data/test'

const mockAccountId = (): string => 'any_id'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const spyLoadAll = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load(mockAccountId())
    expect(spyLoadAll).toBeCalledWith(mockAccountId())
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load(mockAccountId())
    expect(surveys).toEqual(mockSurveyModels())
  })

  test('Should throw LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(mockAccountId())
    await expect(promise).rejects.toThrow()
  })
})
