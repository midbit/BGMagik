import Transaction, {ItemQuantity} from "../model/transaction";


interface ITransactionRepository {
    SaveTransaction(address:string, total:number, items:ItemQuantity[]):Promise<Transaction>
}

export default ITransactionRepository