class Boardgame {
    id: number
    rating?: number
    name: string
    minPlayer?: number
    maxPlayer?: number
    price?: number
    quantity?: number
    category?:string[]
    mechanic?:string[]

    constructor(
        id:number, 
        name: string,
        rating?:number, 
        minPlayer?:number, 
        maxPlayer?:number, 
        price?:number, 
        quantity?:number, 
        category?:string[], 
        mechanic?:string[]
    ) { 
       this.id = id;
       this.name = name;
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