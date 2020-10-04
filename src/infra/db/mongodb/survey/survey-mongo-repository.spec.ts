import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { Collection } from 'mongodb'
import { AccountModel } from '@/domain/models/account'
import { mockAddSurveyParams } from '@/domain/test'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

const makeAccount = async (): Promise<AccountModel> => {
  const response = await accountCollection.insertOne({
    id: 'any_name',
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password'
  })
  return MongoHelper.map(response.ops[0])
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    accountCollection = await MongoHelper.getCollection('accounts')

    await surveyCollection.deleteMany({})
    await surveyResultCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddSurveyParams())

      const question = await surveyCollection.findOne({ question: 'any_question' })
      expect(question).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all on success', async () => {
      const account = await makeAccount()

      const result = await surveyCollection.insertMany([
        mockAddSurveyParams(),
        mockAddSurveyParams('other')
      ])

      const survey = result.ops[0]

      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const sut = makeSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toBe('other_question')
      expect(surveys[1].didAnswer).toBe(false)
    })

    test('Should load an empty list', async () => {
      const account = await makeAccount()
      const sut = makeSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load by id on success', async () => {
      const response = await surveyCollection.insertOne(
        {
          question: 'any_question',
          answers: [{
            image: 'any_image',
            answer: 'any_answer'
          }],
          date: new Date()
        }
      )

      const sut = makeSut()
      const survey = await sut.loadById(response.ops[0]._id)
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })
})
