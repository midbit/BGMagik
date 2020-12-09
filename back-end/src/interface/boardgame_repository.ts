import Boardgame from "../model/boardgame";

interface IBoardgameRepository {
    FindBoardgames(id?:number, name?:string, page?:number):Promise<[Boardgame[],number]>
}

export default IBoardgameRepository