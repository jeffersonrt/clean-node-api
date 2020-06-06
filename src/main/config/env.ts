export default {
  mongoURL:
    process.env.MONGO_URL ??
    'mongodb://jeff:123@localhost:27017/clean-node-api',
  port: process.env.PORT ?? 5050
}
