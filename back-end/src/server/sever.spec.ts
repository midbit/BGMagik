import ServerBuilder from "./server";
import TransactionRepositoryMockBuilder from "../mock/transaction_repository";
import BoardgameRepositoryMockBuilder from "../mock/boardgame_repository";
import { FastifyInstance } from "fastify";
import BoardgameData from "../fixture/boardgame";
import TransactionData from "../fixture/transaction";

describe('Testing the server request/responde', () => {

  describe('Testing Find Boardgame Path', () => {
    let boardgameRepositoryMockBuilder: BoardgameRepositoryMockBuilder;
    let transactionRepositoryMockBuilder: TransactionRepositoryMockBuilder;
    let server:FastifyInstance

    it('Should send status 200 with boardgames in the body (limit 20)', async () => {
      boardgameRepositoryMockBuilder = new BoardgameRepositoryMockBuilder();
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder();
      const boardgameRepository = boardgameRepositoryMockBuilder.Build();
      const transactionRepository = transactionRepositoryMockBuilder.Build();
      server = ServerBuilder(boardgameRepository, transactionRepository);
      const response = await server.inject({
        method:"GET",
        url:"/boardgames",
        query:{page:"1"}

      });
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(JSON.stringify({items:BoardgameData.slice(0,20), maxPage: 2}));
    });
  
    it('Should send status 401 for negative page count', async () => {
      boardgameRepositoryMockBuilder = new BoardgameRepositoryMockBuilder();
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder();
      const boardgameRepository = boardgameRepositoryMockBuilder.Build();
      const transactionRepository = transactionRepositoryMockBuilder.Build();
      server = ServerBuilder(boardgameRepository, transactionRepository);
      const response = await server.inject({
        method:"GET",
        url:"/boardgames",
        query:{page:"-1"}
      });
      expect(response.statusCode).toEqual(401);
    });

    it('Should send status 401 for string page count', async () => {
      boardgameRepositoryMockBuilder = new BoardgameRepositoryMockBuilder();
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder();
      const boardgameRepository = boardgameRepositoryMockBuilder.Build();
      const transactionRepository = transactionRepositoryMockBuilder.Build();
      server = ServerBuilder(boardgameRepository, transactionRepository);
      const response = await server.inject({
        method:"GET",
        url:"/boardgames",
        query:{page:"SWAGGIE"}
      });
      expect(response.statusCode).toEqual(401);
    });
    
    it('Should send status 500 if lower layer throw MongoError', async () => {
      boardgameRepositoryMockBuilder = new BoardgameRepositoryMockBuilder();
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder();
      boardgameRepositoryMockBuilder.MakeThrowMongoError();
      const boardgameRepository = boardgameRepositoryMockBuilder.Build()
      const transactionRepository = transactionRepositoryMockBuilder.Build();
      server = ServerBuilder(boardgameRepository, transactionRepository);
      const response = await server.inject({
        method:"GET",
        url:"/boardgames",
      });
      expect(response.statusCode).toEqual(500);
    });

    it('Should send status 401 if lower layer throw RepositoryError', async () => {
      boardgameRepositoryMockBuilder = new BoardgameRepositoryMockBuilder();
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder();
      boardgameRepositoryMockBuilder.MakeThrowRepositoryError();
      const boardgameRepository = boardgameRepositoryMockBuilder.Build()
      const transactionRepository = transactionRepositoryMockBuilder.Build();
      server = ServerBuilder(boardgameRepository, transactionRepository);
      const response = await server.inject({
        method:"GET",
        url:"/boardgames",
      });
      expect(response.statusCode).toEqual(401);
    });
  })
  describe('Testing Find One Boardgame Path', () => {
    it('Should send status 200 with 1 boardgame', async () => {

    });
  
    it('Should send status 404 if boardgame not found', async () => {
    });
    
    it('Should send status 404 if id is not a number', async () => {

    });

    it('Should send status 500 if lower layer throw MongoError', async () => {

    });
  })
  describe('Testing Post Transaction', () => {
    it('Should send status 201 with transaction in body', async () => {

    });
  
    it('Should send status 401 if total is negative', async () => {
    });
    
    it('Should send status 401 if items array is empty', async () => {

    });
    
    it('Should send status 401 if address is empty', async () => {

    });

    it('Should send status 500 if lower layer throw MongoError', async () => {

    });
    it('Should send status 401 if lower layer throw RepositoryError', async () => {

    });
  })
  
});