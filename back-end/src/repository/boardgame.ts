import IBoardgameRepository from "../interface/boardgame_repository";
import Boardgame from "../model/boardgame";

class BoardgameRepository implements IBoardgameRepository {

    constructor() {

    }

    FindBoardgames(id?:number, name?:string, page?:number):Boardgame[] {

        return[];
    }
}

export default BoardgameRepository