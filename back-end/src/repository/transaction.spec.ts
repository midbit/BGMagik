import TransactionRepository from "./transaction";
import Transaction, {ItemQuantity} from "../model/transaction";
import TransactionData from "../fixture/transaction";
import { Collection } from "mongodb";
const {MongoClient} = require('mongodb');

describe('Testing reading functioality of the TransactionRepository Class', () => {

  let transactionRepository: TransactionRepository;
  let transactionConnection:Collection;
  let connection:any;
  let db:any;
  let transaction:Transaction;
  let address = TransactionData.address;
  let total = TransactionData.total;
  let items = TransactionData.items;
 

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db("test");
    transactionConnection = await db.collection("transaction");
    transactionRepository = new TransactionRepository(db);
    transaction = {...TransactionData};
    
  });

  afterAll(async () => {
    console.log("Done Test Case");
    await connection.close();
  });

  it('should be able to write the Transaction', async () => {
    const result = await transactionRepository.SaveTransaction(address,total,items);
    expect(result.address).toEqual(address);
    expect(result.items).toEqual(items);
    expect(result.total).toEqual(total);
    expect(result.id).toBeDefined();

  });

  it('should throw an error for empty items', async () => {
    await expect(transactionRepository.SaveTransaction(address,total,[])).rejects.toThrow();
  });
  
  it('should throw an error for negative total', async () => {
    await expect(transactionRepository.SaveTransaction(address,-1,items)).rejects.toThrow();
  });
  
});