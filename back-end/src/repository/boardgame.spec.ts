import BoardgameRepository from "./boardgame";
import Boardgame from "../model/boardgame";
import boardgameData from "../fixture/boardgame";
const {MongoClient} = require('mongodb');

describe('Testing reading functioality of the BoardgameRepository Class', () => {

  let boardgameRepository: BoardgameRepository;
  let connection:any;
  let db:any;
  const boardgames = [...boardgameData];
  
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