import IBoardgameRepository from "../interface/boardgame_repository";
import ITransactionRepository from "../interface/transaction_repository";
import fastify, { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import Boardgame from "../model/boardgame";
import { MongoError } from "mongodb";
import RepositoryError from "../error/repository";
import { isUndefined } from "util";

interface IRouteParameter {
    id: number
}

interface IQuery {
    page: number
    name?:string
}

interface IWriteTransactionBody {
    address: string
    total: number
    items: Boardgame[]
}

function ValidateQuery(request:FastifyRequest, reply:FastifyReply, done:any):void {
    const {page}:any = request.query
    if(!isUndefined(page)) {
        let page_number = parseInt(page);  
        if(isNaN(page_number) || page_number <= 0)
        {
            reply.status(401);
            reply.send("Invalid page number");
        }
    }
    done(undefined);
}

class Server {
    boardgameRepository: IBoardgameRepository
    transactionRepository: ITransactionRepository

    constructor(boardgameRepository:IBoardgameRepository, transactionRepository:ITransactionRepository){
        this.boardgameRepository = boardgameRepository;
        this.transactionRepository = transactionRepository;
    }

    FindOneById(request:FastifyRequest, reply:FastifyReply): void {
        const {id}:any =  request.params;
        reply.send(id)
    }

    async Find(request:FastifyRequest, reply:FastifyReply) {
        const {name,page}:any = request.query;
        const [boardgames, count] = await this.boardgameRepository.FindBoardgames(undefined,name,page);
        reply.send({...boardgames});
    }

    WriteTransaction(request:FastifyRequest, reply:FastifyReply): void {

    }

}

const buildServer = (boardgameRepository:IBoardgameRepository, transactionRepository:ITransactionRepository):FastifyInstance => {
    const server = new Server(boardgameRepository,transactionRepository);
    const fastifyServer:FastifyInstance = fastify();

    fastifyServer.get<{Querystring:IQuery}>(
        '/boardgames', 
        {
            preValidation: ValidateQuery,
        }, 
        async (request:FastifyRequest, reply:FastifyReply) => {
            const {name,page}:any = request.query;
            try {
                const [boardgames, maxPage] = await boardgameRepository.FindBoardgames(undefined,name,page);
                reply.send(JSON.stringify({items:[...boardgames], maxPage}));
            }
            catch (e) {
                if(e instanceof MongoError) {
                    reply.status(500);
                    reply.send("Something is wrong with the server please try again later.");
                }
                if(e instanceof RepositoryError) {
                    reply.status(401);
                    reply.send("Invalid input.");
                }
            } 
    });

    fastifyServer.post<{Body:IWriteTransactionBody}>('/transaction', server.WriteTransaction);
    fastifyServer.get<{Params:IRouteParameter}>('/boardgames/:id',  server.FindOneById);
    return fastifyServer;
}


export default buildServer;

