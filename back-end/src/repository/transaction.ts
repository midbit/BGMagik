import ITransactionRepository from "../interface/transaction_repository";
import Transaction from "../model/transaction";
import Boardgame from "../model/boardgame";

import Mongo from "mongodb";

class TransactionRepository implements ITransactionRepository {
    database: Mongo.Db;

    constructor(database: Mongo.Db) {
        this.database = database;
    }
    async SaveTransaction(address:string, total:number, items:Boardgame[]):Promise<Transaction> {
        
        return {id:"sdfsdf", address: "ddsfdaf", items:[], total:0};
    }

    
}

export default TransactionRepository;