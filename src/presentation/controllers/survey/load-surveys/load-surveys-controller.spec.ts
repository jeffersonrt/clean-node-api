import MockDate from 'mockdate'
import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, HttpRequest } from './load-surveys-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { throwError, mockSurveyModels } from '@/domain/test'
import { mockLoadSurveys } from '@/presentation/test'

const mockRequest = (): HttpRequest => ({
  accountId: 'any_id'
})

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStubs: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStubs = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStubs)
  return {
    sut,
    loadSurveysStubs
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStubs } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStubs, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toBeCalledWith('any_id')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle(mockRequest())
    expect(httResponse).toEqual(ok(mockSurveyModels()))
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStubs } = makeSut()
    jest.spyOn(loadSurveysStubs, 'load').mockImplementationOnce(throwError)
    const httResponse = await sut.handle(mockRequest())
    expect(httResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStubs } = makeSut()
    jest.spyOn(loadSurveysStubs, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httResponse = await sut.handle(mockRequest())
    expect(httResponse).toEqual(noContent())
  })
})
