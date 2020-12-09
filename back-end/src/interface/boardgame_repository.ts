import Boardgame from "../model/boardgame";

interface IBoardgameRepository {
    FindBoardgames(id?:number, name?:string, page?:number):Boardgame[]
}

export default IBoardgameRepository