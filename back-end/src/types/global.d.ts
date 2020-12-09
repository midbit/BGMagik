import { MongoClient } from 'mongodb';

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: MongoClient;
    }
  }
}