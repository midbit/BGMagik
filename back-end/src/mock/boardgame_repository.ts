import IBoardgameRepository from '../interface/boardgame_repository';
import Boardgame from '../model/boardgame';
import BoardgameData from '../fixture/boardgame';
import { MongoError } from 'mongodb';
import RepositoryError from '../error/repository';

class BoardgameRepositoryMockBuilder {
    boardgameRepository:IBoardgameRepository

    constructor() {
        this.boardgameRepository = {
           async FindBoardgames(id?:number, name?:string, page?:number):Promise<[Boardgame[], number]> {
                return [BoardgameData.slice(0,20), 2];
           }
        }
    }

    MakeThrowMongoError() {
        this.boardgameRepository = {
            async FindBoardgames(id?:number, name?:string, page?:number):Promise<[Boardgame[], number]> {
                throw new MongoError("This is a Mongo Error");
           }
        }
    }

    MakeThrowRepositoryError() {
        this.boardgameRepository = {
            async FindBoardgames(id?:number, name?:string, page?:number):Promise<[Boardgame[], number]> {
                throw new RepositoryError("This is a Repo Error");
           }
        }
    }

    Build():IBoardgameRepository {
        return this.boardgameRepository;
    }
}

export default BoardgameRepositoryMockBuilder;