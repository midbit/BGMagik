class Boardgame {
    id: number
    rating?: number
    name?: string
    minPlayer?: number
    maxPlayer?: number
    price?: number
    quantity?: number
    category?:[string]
    mechanic?:[string]

    constructor(
        id:number, 
        rating?:number, 
        minPlayer?:number, 
        maxPlayer?:number, 
        price?:number, 
        quantity?:number, 
        category?:[string], 
        mechanic?:[string]
    ) { 
       this.id = id;
       this.rating = rating;
       this.minPlayer = minPlayer;
       this.maxPlayer = maxPlayer;
       this.price = price;
       this.quantity = quantity;
       this.category = category;
       this.mechanic = mechanic;
    }
}

export default Boardgame;