import ITransactionRepository from '../interface/transaction_repository';
import Transaction from '../model/transaction';
import { MongoError } from 'mongodb';
import RepositoryError from '../error/repository';

class TransactionRepositoryMockBuilder {
    transactionRepository:ITransactionRepository
    constructor() {
        this.transactionRepository = {
            async SaveTransaction(address,total,item):Promise<Transaction> {
                return new Transaction("13", address, total, item);
            }
        }
    }

    MakeThrowMongoError() {
        this.transactionRepository = {
            async SaveTransaction(address,total,item):Promise<Transaction> {
                throw new MongoError("This is a mongo error");
            }
        }
    }

    MakeThrowRepositoryError() {
        this.transactionRepository = {
            async SaveTransaction(address,total,item):Promise<Transaction> {
                throw new RepositoryError("This is a repo error");
            }
        }
    }

    Build():ITransactionRepository {
        return this.transactionRepository
    }
}

export default TransactionRepositoryMockBuilder;