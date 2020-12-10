import IBoardgameRepository from "../interface/boardgame_repository";
import ITransactionRepository from "../interface/transaction_repository";
import {ValidateCardNumber, ValidateTransaction, ValidateQuery, ValidateExpiryDate, ValidateItemQuantity, ValidateRouteParams} from "./validate";
import fastify, { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';

import {ItemQuantity} from "../model/transaction";
import RepositoryError from "../error/repository";
import { MongoError } from "mongodb";

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
    items: ItemQuantity[]
    expiryDate: string
    cardNumber: string
}

const buildServer = (boardgameRepository:IBoardgameRepository, transactionRepository:ITransactionRepository):FastifyInstance => {
    const fastifyServer:FastifyInstance = fastify();
    fastifyServer.register(require('fastify-cors'), { 

    })
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
    fastifyServer.get<{Params:IRouteParameter}>(
        '/boardgames/:id', 
        {
            preValidation: ValidateRouteParams
        },
        async (request:FastifyRequest, reply:FastifyReply) => {
            try {
                const {id}:any = request.params;
                const [boardgames] = await boardgameRepository.FindBoardgames(parseInt(id));
                if(boardgames.length === 0) {
                    reply.status(404);
                    reply.send();
                }
                reply.send(JSON.stringify(boardgames[0]));
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

    fastifyServer.post<{Body:IWriteTransactionBody}>(
        '/transaction',
        {
            preValidation: [ValidateTransaction,ValidateCardNumber, ValidateExpiryDate, ValidateItemQuantity]
        },
        async (request:FastifyRequest, reply:FastifyReply) => {
            const {items,address,total,cardNumber,expirtyDate}:any  = request.body;
            const transaction = await transactionRepository.SaveTransaction(address,total,items);
            reply.status(201);
            reply.send(JSON.stringify(transaction));
        });
    return fastifyServer;
}


export default buildServer;

