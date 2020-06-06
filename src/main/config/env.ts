export default {
  mongoURL:
    process.env.MONGO_URL ??
    'mongodb://jeffersonrt:MongoExpress2020!@localhost:27017/clean-node-api',
  port: process.env.PORT ?? 5050
}
