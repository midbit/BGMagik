require('dotenv').config()

export const MONGO_HOST = process.env.MONGO_HOST === undefined? "127.0.0.1":process.env.MONGO_HOST; 
export const MONGO_PORT = process.env.MONGO_PORT === undefined? "27017":process.env.MONGO_PORT;
export const PORT = process.env.PORT === undefined? "8080":process.env.PORT;
export const MONGO_DATABASE = process.env.MONGO_DATABASE;
