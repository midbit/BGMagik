import BoardgameRepository from "./boardgame";
import Boardgame from "../model/boardgame";

const {MongoClient} = require('mongodb');

describe('Testing reading functioality of the BoardgameRepository Class', () => {

  let boardgameRepository: BoardgameRepository;
  let connection:any;
  let db:any;
  const bg1 = new Boardgame(1,"bg1", 3.2,1,5,300,1,["A","B","C"], ["D,E,F"]);
  const bg2 =  new Boardgame(2,"bg2",3.2,1,5,300,1,["Hand","Luck","Strategy"], ["Nature"]);
  const bg3 =  new Boardgame(3,"bg3",3.2,1,5,300,1,["Dice","Bluff"], ["Vegas"]);
  const bg4 = new  Boardgame(4,"bg4",3.2,1,5,300,1,["Negotiate","Draft"], ["Medieval","Military"]);
  const bg5 = new  Boardgame(5,"bg5",3.2,1,5,300,2,["Negotiate","Fight"], ["Space","Urban"]);
  const bg6 = new Boardgame(6,"bg6", 3.2,1,5,300,1,["A","B","C"], ["D,E,F"]);
  const bg7 =  new Boardgame(7,"bg7",3.2,1,5,300,1,["Hand","Luck","Strategy"], ["Nature"]);
  const bg8 =  new Boardgame(8,"bg8",3.2,1,5,300,1,["Dice","Bluff"], ["Vegas"]);
  const bg9 = new  Boardgame(9,"bg9",3.2,1,5,300,1,["Negotiate","Draft"], ["Medieval","Military"]);
  const bg10 = new  Boardgame(10,"bg10",3.2,1,5,300,2,["Negotiate","Fight"], ["Space","Urban"]);
  const bg11 = new Boardgame(11,"bg11", 3.2,1,5,300,1,["A","B","C"], ["D,E,F"]);
  const bg12 =  new Boardgame(12,"bg12",3.2,1,5,300,1,["Hand","Luck","Strategy"], ["Nature"]);
  const bg13 =  new Boardgame(13,"bg13",3.2,1,5,300,1,["Dice","Bluff"], ["Vegas"]);
  const bg14 = new  Boardgame(14,"bg14",3.2,1,5,300,1,["Negotiate","Draft"], ["Medieval","Military"]);
  const bg15 = new  Boardgame(15,"bg15",3.2,1,5,300,2,["Negotiate","Fight"], ["Space","Urban"]);
  const bg16 = new Boardgame(16,"bg16", 3.2,1,5,300,1,["A","B","C"], ["D,E,F"]);
  const bg17 =  new Boardgame(17,"bg17",3.2,1,5,300,1,["Hand","Luck","Strategy"], ["Nature"]);
  const bg18 =  new Boardgame(18,"bg18",3.2,1,5,300,1,["Dice","Bluff"], ["Vegas"]);
  const bg19 = new  Boardgame(19,"bg19",3.2,1,5,300,1,["Negotiate","Draft"], ["Medieval","Military"]);
  const bg20 = new  Boardgame(20,"bg20",3.2,1,5,300,2,["Negotiate","Fight"], ["Space","Urban"]);
  const bg21 = new  Boardgame(21,"bg21",3.2,1,5,300,2,["Negotiate","Fight"], ["Space","Urban"]);


  const boardgames = [bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8,bg9,bg10,bg11,bg12,bg13,bg14,bg15,bg16,bg17,bg18,bg19,bg20, bg21]
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db("test");
    const boardgamesConnection = await db.collection("boardgame")
    await boardgamesConnection.insertMany([...boardgames]);
    boardgameRepository = new BoardgameRepository(db);
  });

  afterAll(async () => {
    console.log("Done Test Case")
    await connection.close();
  });

  it('should be able to read all of the result with the limit of 20', async () => {
    const [result, maxPage] = await boardgameRepository.FindBoardgames()
    expect(maxPage).toEqual(2);
    expect(result).toEqual(boardgames.slice(0,20))
  });

  it('should be able to read skip the first 20 document and return the rest with the limit of 20', async () => {
    const [result, maxPage] = await boardgameRepository.FindBoardgames(undefined,undefined,2)
    expect(result).toEqual(boardgames.slice(20,21));
    expect(maxPage).toEqual(2);
  });
  
  it('should return an empty array when the page exceed its overall length', async () => {
    const [result, maxPage] = await boardgameRepository.FindBoardgames(undefined,undefined,3)
    expect(result).toEqual([]);
    expect(maxPage).toEqual(2);
  });
  
  it('should return an array of boardgame with the name contained', async () => {
    const [result, maxPage] = await boardgameRepository.FindBoardgames(undefined,"bg",undefined)
    expect(result).toEqual(boardgames.slice(0,20));
    expect(maxPage).toEqual(2);
  });
  it('should return an array of boardgame with the designated id', async () => {
    const [result, maxPage] = await boardgameRepository.FindBoardgames(1,undefined,undefined)
    expect(result).toEqual(boardgames.slice(0,1));
    expect(maxPage).toEqual(1);
  });

  
  it('should return an empty array if the name is not contained in the database', async () => {
    const [result, maxPage] = await boardgameRepository.FindBoardgames(undefined,"a",undefined)
    expect(result).toEqual([]);
    expect(maxPage).toEqual(0);
  });
  
  it('should raise an error if page is a negative number', async () => {
    await expect(boardgameRepository.FindBoardgames(undefined, undefined, -1))
    .rejects
    .toThrow();
  });
});