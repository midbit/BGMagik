import Boardgame from "./boardgame";

class Transaction {
    id:string
    address:string
    total: number
    items:[Boardgame]

    constructor(id:string, address: string, total:number, items:[Boardgame], ) {
        this.id = id;
        this.address = address;
        this.items = [...items];
        this.total = total;
    }
}

export default Transaction