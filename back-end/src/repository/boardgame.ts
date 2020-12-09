import IBoardgameRepository from "../interface/boardgame_repository";
import Boardgame from "../model/boardgame";
import Mongo from "mongodb"
class BoardgameRepository implements IBoardgameRepository {
    database: Mongo.Db;

    constructor(database: Mongo.Db) {
        this.database = database;
    }

    async FindBoardgames(id?:number, name?:string, page?:number):Promise<[Boardgame[],number]> {
        return[[],0];
    }
}

export default BoardgameRepository