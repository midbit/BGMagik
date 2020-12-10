
export class ItemQuantity {
    id:number;
    name:string;
    quantity:number;

    constructor(id:number,name:string,quantity:number) {
        this.id = id;
        this.name = name;
        this.quantity = quantity
    }

}

class Transaction {
    id:string
    address:string
    total: number
    items:ItemQuantity[]

    constructor(id:string, address: string, total:number, items:ItemQuantity[]) {
        this.id = id;
        this.address = address;
        this.items = [...items];
        this.total = total;
    } 
}

export default Transaction