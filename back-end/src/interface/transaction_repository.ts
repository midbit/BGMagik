import Transaction from "../model/transaction";
import Boardgame from "../model/boardgame";


interface ITransactionRepository {
    SaveTransaction(address:string, total:number, items:Boardgame[]):Promise<Transaction>
}

export default ITransactionRepository