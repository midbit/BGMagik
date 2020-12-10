import ServerBuilder from "./server";
import TransactionRepositoryMockBuilder from "../mock/transaction_repository";
import BoardgameRepositoryMockBuilder from "../mock/boardgame_repository";
import { FastifyInstance } from "fastify";
import BoardgameData from "../fixture/boardgame";
import TransactionData from "../fixture/transaction";
import ITransactionRepository from "../interface/transaction_repository";

describe('Testing the server request/responde', () => {
  let boardgameRepositoryMockBuilder: BoardgameRepositoryMockBuilder;
  let transactionRepositoryMockBuilder: TransactionRepositoryMockBuilder;
  let server:FastifyInstance

  describe('Testing Find Boardgame Path', () => {

    it('Should send status 200 with boardgames in the body (limit 20)', async () => {
      boardgameRepositoryMockBuilder = new BoardgameRepositoryMockBuilder();
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder(TransactionData.address, TransactionData.total, TransactionData.items);
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
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder(TransactionData.address, TransactionData.total, TransactionData.items);
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
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder(TransactionData.address, TransactionData.total, TransactionData.items);
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
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder(TransactionData.address, TransactionData.total, TransactionData.items);
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
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder(TransactionData.address, TransactionData.total, TransactionData.items);
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
    let transactionRepository: ITransactionRepository;

    beforeEach(() => {
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder(TransactionData.address, TransactionData.total, TransactionData.items);
      transactionRepository =transactionRepositoryMockBuilder.Build();
    });    

    it('Should send status 200 with 1 boardgame', async () => {
      boardgameRepositoryMockBuilder = new BoardgameRepositoryMockBuilder();
      let boardgameRepository = boardgameRepositoryMockBuilder.Build();
      server = ServerBuilder(boardgameRepository, transactionRepository);
      const response = await server.inject({
        method:"GET",
        url:"/boardgames/1",
      });
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(JSON.stringify(BoardgameData.slice(0,1)[0]));
    });
  
    it('Should send status 404 if boardgame not found', async () => {
      boardgameRepositoryMockBuilder = new BoardgameRepositoryMockBuilder();
      boardgameRepositoryMockBuilder.MakeEmpty();
      let boardgameRepository = boardgameRepositoryMockBuilder.Build();
      server = ServerBuilder(boardgameRepository, transactionRepository);
      const response = await server.inject({
        method:"GET",
        url:"/boardgames/30",
      });
      expect(response.statusCode).toEqual(404);
    });
    
    it('Should send status 401 if id is not a number', async () => {
      boardgameRepositoryMockBuilder = new BoardgameRepositoryMockBuilder();
      let boardgameRepository = boardgameRepositoryMockBuilder.Build();
      server = ServerBuilder(boardgameRepository, transactionRepository);
      const response = await server.inject({
        method:"GET",
        url:"/boardgames/dsdfds",
      });
      expect(response.statusCode).toEqual(401);
    });
    
    it('Should send status 500 if lower layer throw MongoError', async () => {
      boardgameRepositoryMockBuilder = new BoardgameRepositoryMockBuilder();
      boardgameRepositoryMockBuilder.MakeThrowMongoError();
      const boardgameRepository = boardgameRepositoryMockBuilder.Build()
      server = ServerBuilder(boardgameRepository, transactionRepository);
      const response = await server.inject({
        method:"GET",
        url:"/boardgames/1",
      });
      expect(response.statusCode).toEqual(500);
    });
  })

  describe('Testing Post Transaction', () => {

    beforeEach(() => {
      boardgameRepositoryMockBuilder = new BoardgameRepositoryMockBuilder();
      transactionRepositoryMockBuilder = new TransactionRepositoryMockBuilder(TransactionData.address, TransactionData.total, TransactionData.items);
      const transactionRepository =transactionRepositoryMockBuilder.Build();
      const boardgameRepository = boardgameRepositoryMockBuilder.Build();
      server = ServerBuilder(boardgameRepository, transactionRepository);    
    });    

    it('Should send status 201 with transaction in body', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: TransactionData.items,
          total: TransactionData.total,
          address: TransactionData.address,
          cardNumber: "4111111111111111",
          expiryDate: "11/22",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(201);
      const parsedResult = JSON.parse(response.body);
      expect(parsedResult.items).toEqual(TransactionData.items);
      expect(parsedResult.address).toEqual(TransactionData.address);
      expect(parsedResult.total).toEqual(TransactionData.total);
    });
  
    it('Should send status 401 if total is negative', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: TransactionData.items,
          total: -100,
          address: TransactionData.address,
          cardNumber: "4111111111111111",
          expiryDate: "11/22",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });
    
    it('Should send status 401 if items array is empty', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: [],
          total: TransactionData.total,
          address: TransactionData.address,
          cardNumber: "4111111111111111",
          expiryDate: "11/22",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });

    it('Should send status 401 if address is empty', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: TransactionData.items,
          total: TransactionData.total,
          address: undefined,
          cardNumber: "4111111111111111",
          expiryDate: "11/22",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });

    it('Should send status 401 if quantity is empty', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: [{id:3, name:"BG1"}],
          address: TransactionData.address,
          cardNumber: "4111111111111111",
          expiryDate: "11/22",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });

    it('Should send status 401 if quantity is negative', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: [{id:3, name:"BG1", quantity: -3}],
          address: TransactionData.address,
          cardNumber: "4111111111111111",
          expiryDate: "11/22",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });

    it('Should send status 401 if expiry date is empty', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: [{id:3, name:"BG1"}],
          total: TransactionData.total,
          address: TransactionData.address,
          cardNumber: "4111111111111111",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });

    it('Should send status 401 if card number is empty', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: [{id:3, name:"BG1"}],
          total: TransactionData.total,
          address: TransactionData.address,
          expiryDate: "11/22",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });

    it('Should send status 401 if items quantity is empty', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: [{id:3, name:"BG1"}],
          total: TransactionData.total,
          address: TransactionData.address,
          cardNumber: "4111111111111111",
          expiryDate: "11/22",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });

    it('Should send status 401 if items id is empty', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: [{quantity:40, name:"BG1"}],
          total: TransactionData.total,
          address: TransactionData.address,
          cardNumber: "4111111111111111",
          expiryDate: "11/22",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });

    it('Should send status 401 if items name is empty', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: [{quantity:40, id:30}],
          total: TransactionData.total,
          address: TransactionData.address,
          cardNumber: "4111111111111111",
          expiryDate: "11/22",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });

    it('Should send status 401 if expiry date is invalid', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: TransactionData.items,
          total: TransactionData.total,
          address: TransactionData.address,
          cardNumber: "4111111111111111",
          expiryDate: "33ss2",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });

    it('Should send status 401 if card number is invalid', async () => {
      const response = await server.inject({
        method:"POST",
        url:"/transaction",
        payload:{
          items: TransactionData.items,
          total: TransactionData.total,
          address: TransactionData.address,
          cardNumber: "ACDFESDF",
          expiryDate: "11/22",
          securityCode: "sss"
        }
      });
      expect(response.statusCode).toEqual(401);
    });
  })
  
});