import TransactionRepository from "./transaction";
import Boardgame from "../model/boardgame";
import Transaction from "../model/transaction";
import { Collection } from "mongodb";
const {MongoClient} = require('mongodb');

describe('Testing reading functioality of the TransactionRepository Class', () => {

  let transactionRepository: TransactionRepository;
  let transactionConnection:Collection
  let connection:any;
  let db:any;
  const bg1 = new Boardgame(1,"bg1", 3.2,1,5,300,1,["A","B","C"], ["D,E,F"]);
  const bg2 =  new Boardgame(2,"bg2",3.2,1,5,300,1,["Hand","Luck","Strategy"], ["Nature"]);
  const bg3 =  new Boardgame(3,"bg3",3.2,1,5,300,1,["Dice","Bluff"], ["Vegas"]);
  const bg4 = new  Boardgame(4,"bg4",3.2,1,5,300,1,["Negotiate","Draft"], ["Medieval","Military"]);
  const bg5 = new  Boardgame(5,"bg5",3.2,1,5,300,2,["Negotiate","Fight"], ["Space","Urban"]);
  const boardgames = [bg1,bg2,bg3,bg4,bg5];
  const address = "John Street";
  const total = 1500;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db("test");
    transactionConnection = await db.collection("transaction")
    transactionRepository = new TransactionRepository(db);
  });

  afterAll(async () => {
    console.log("Done Test Case")
    await connection.close();
  });

  it('should be able to write the Transaction', async () => {
    const result = await transactionRepository.SaveTransaction(address,total,boardgames)
    let transaction
    transactionConnection.find({}).forEach(trans => new Transaction(trans.id,trans.address,trans.total,trans.items) )
    expect(transaction).toEqual(result)
  });

  it('should throw an error for empty items', async () => {
    await expect(transactionRepository.SaveTransaction(address,total,[])).rejects.toThrow();
  });
  
  it('should throw an error for negative total', async () => {
    await expect(transactionRepository.SaveTransaction(address,-1,boardgames)).rejects.toThrow();
  });
  
});