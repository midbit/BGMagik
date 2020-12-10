import {MONGO_HOST, MONGO_PORT, MONGO_DATABASE} from "../configuration/configuration";
import { MongoClient, Db } from "mongodb";
import { connected } from "process";

const mongoBuilder = async (): Promise<[Db, () => void]> => {
    const uri =  `mongodb://${MONGO_HOST}:${MONGO_PORT}`
    const mongoClient =  await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected at " + MONGO_DATABASE)
    return [mongoClient.db(MONGO_DATABASE), () => {mongoClient.close()}];
}

export default mongoBuilder;