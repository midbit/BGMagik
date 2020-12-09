import ServerBuilder from "./server";
import ITransactionRepository from "../interface/transaction_repository";
import IBoardgameRepository from "../interface/boardgame_repository";

describe('Testing the server request/responde', () => {

  describe('Testing Find Boardgame Path', () => {
    it('Should send status 200 with boardgames in the body (limit 20)', async () => {

    });
  
    it('Should send status 401 for negative page count', async () => {
    });
    
    it('Should send status 500 if lower layer throw MongoError', async () => {
    });

    it('Should send status 401 if lower layer throw RepositoryError', async () => {
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