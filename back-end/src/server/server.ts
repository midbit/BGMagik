import IBoardgameRepository from "../interface/boardgame_repository";
import ITransactionRepository from "../interface/transaction_repository";
import fastify, { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import Boardgame from "../model/boardgame";

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

    Find(request:FastifyRequest, reply:FastifyReply): void {
        reply.send("pong")
    }

    WriteTransaction(request:FastifyRequest, reply:FastifyReply): void {

    }

}

const buildServer = (boardgameRepository:IBoardgameRepository, transactionRepository:ITransactionRepository):FastifyInstance => {
    const server = new Server(boardgameRepository,transactionRepository);
    const fastifyServer:FastifyInstance = fastify();
    fastifyServer.get<{Querystring:IQuery}>('/boardgames', server.Find);
    fastifyServer.post<{Body:IWriteTransactionBody}>('/transaction', server.WriteTransaction);
    fastifyServer.get<{Params:IRouteParameter}>('/boardgame/:id', server.FindOneById);
    return fastifyServer;
}


export default buildServer;

