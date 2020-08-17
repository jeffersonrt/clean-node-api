import MockDate from 'mockdate'
import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, SurveyModel } from './load-surveys-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'

const makeFakeSurveys = (): SurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }
])

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysStub()
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStubs: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStubs = makeLoadSurveys()
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

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStubs } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStubs, 'load')
    await sut.handle({})
    expect(loadSpy).toBeCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.handle({})
    expect(httResponse).toEqual(ok(makeFakeSurveys()))
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStubs } = makeSut()
    jest.spyOn(loadSurveysStubs, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httResponse = await sut.handle({})
    expect(httResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStubs } = makeSut()
    jest.spyOn(loadSurveysStubs, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httResponse = await sut.handle({})
    expect(httResponse).toEqual(noContent())
  })
})
