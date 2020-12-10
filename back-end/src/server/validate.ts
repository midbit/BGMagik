import { isUndefined } from "util";
import {ItemQuantity} from "../model/transaction";
import { FastifyReply, FastifyRequest } from 'fastify';

export function ValidateQuery(request:FastifyRequest, reply:FastifyReply, done:any):void {
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

export function ValidateRouteParams(request:FastifyRequest, reply:FastifyReply, done:any):void {
    const {id}:any = request.params
    let parsed_id = parseInt(id); 
    if(isNaN(parsed_id))
    {
        reply.status(401);
        reply.send("Invalid page number");
    }
    done(undefined);
}

export function ValidateTransaction(request:FastifyRequest, reply:FastifyReply, done:any):void {
    const {items, total, address, expiryDate, cardNumber}:any = request.body
    const parsedItem = items ?? [];
    const parsedTotal = parseInt(total);
    if(isNaN(parsedTotal) || parsedTotal <= 0 || parsedItem.length <= 0 || isUndefined(address) || isUndefined(expiryDate) || isUndefined(cardNumber)) {
        reply.status(401);
        reply.send("Invalid parameter.");
    }
    done(undefined)
}

export function ValidateExpiryDate(request:FastifyRequest, reply:FastifyReply, done:any) {
    const {expiryDate}:any = request.body
    const re = new RegExp(/^\d{2}\/\d{2}$/);
    if(!re.test(expiryDate)){
        reply.status(401);
        reply.send("Invalid parameter.");
    }
    done(undefined)
}

export function ValidateCardNumber(request:FastifyRequest, reply:FastifyReply, done:any) {
    const {cardNumber}:any = request.body
    const re = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)
    if(!re.test(cardNumber)){
        reply.status(401);
        reply.send("Invalid parameter.");
    }
    done(undefined)
}

export function ValidateItemQuantity(request:FastifyRequest, reply:FastifyReply, done:any) {
    const {items}:any = request.body
    const parsedItem = items ?? [];
    parsedItem.forEach((item:ItemQuantity) => {
        const quantity = item.quantity ?? 0;
        if(quantity <= 0 || isUndefined(item.id) || isUndefined(item.name)) {
            reply.status(401);
            reply.send("Invalid parameter.");
        }
    });
    done(undefined)
}