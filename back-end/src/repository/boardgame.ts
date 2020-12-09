import IBoardgameRepository from "../interface/boardgame_repository";
import Boardgame from "../model/boardgame";
import Mongo from "mongodb";
import RepositoryError from "../error/repository";

class BoardgameRepository implements IBoardgameRepository {
    database: Mongo.Db;

    constructor(database: Mongo.Db) {
        this.database = database;
    }
    private async CalculateMaximumPage(cursor:Mongo.Cursor): Promise<number> {
        const documentLength = await cursor.count()
        const maximumPage = Math.ceil(documentLength/20);
        return maximumPage;
    }
    private QueryBuilder(id:any, name:any): any {
        var query:any = {}
        if(id !== undefined) {
            query["id"] = id
        }
        if(name !== undefined) {
            query["name"] =  {$regex: new RegExp('.*' + name.toLowerCase() + '.*' )}}
        return query
    }
    
    async FindBoardgames(id?:number, name?:string, page:number = 1):Promise<[Boardgame[],number]> {
        const query = this.QueryBuilder(id,name)
        try{
            if(page <= 0) {
                throw new RepositoryError("Invalid input parameter");
            }
            let boardgames:Boardgame[] = []
            let cursor = this.database.collection("boardgame").find(query)
            const maximumPage = await this.CalculateMaximumPage(cursor);
            const skip = (page-1)*20
            if(page > maximumPage) {
                return([[], maximumPage]);
            }
            await cursor.skip(skip).limit(20).forEach((game) => {
                boardgames.push(new Boardgame(
                    game.id,
                    game.name,
                    game.rating,
                    game.minPlayer,
                    game.maxPlayer,
                    game.price,
                    game.quantity,
                    game.category,
                    game.mechanic,
                    game._id
                ))
            })
            return[boardgames,maximumPage];
        }
        catch(err) {
            throw err;
        }
    }
}

export default BoardgameRepository