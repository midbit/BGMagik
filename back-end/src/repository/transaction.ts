import ITransactionRepository from "../interface/transaction_repository";
import Transaction, {ItemQuantity} from "../model/transaction";
import RepositoryError from "../error/repository";
import Mongo from "mongodb";
import { v4 as uuidv4 } from 'uuid';

class TransactionRepository implements ITransactionRepository {
    database: Mongo.Db;
    COLLECTION:string = "transaction";

    constructor(database: Mongo.Db) {
        this.database = database;
    }

    private GenerateTransactionId():string {
        return uuidv4();
    }
    
    async SaveTransaction(address:string, total:number, items:ItemQuantity[]):Promise<Transaction> {
        if(items.length <= 0 || total < 0) {
            throw new RepositoryError("Invalid Input Parameter")
        }
        const id = this.GenerateTransactionId()
        try{
            const _id = await (await this.database.collection(this.COLLECTION).insertOne({id, address,total,items})).insertedId;
            const result = await this.database.collection(this.COLLECTION).findOne({_id});
            return new Transaction(result.id, result.address, result.total, result.items);
        }
        catch(err){
            throw err;
        }
    }

    
}

export default TransactionRepository;