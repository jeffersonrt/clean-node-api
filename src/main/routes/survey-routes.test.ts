import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('account')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Post /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question 1',
          answers: [
            {
              image: 'image-1.jpg',
              answer: 'Answer 1'
            }
          ]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'jeff',
        email: 'hi@jeff.com',
        password: '123',
        role: 'admin'
      })

      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)

      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question 1',
          answers: [
            {
              image: 'image-1.jpg',
              answer: 'Answer 1'
            }
          ]
        })
        .expect(403)
    })
  })
})
