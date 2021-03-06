class Boardgame {
    id: number
    _id?: any
    rating?: number
    name: string
    minPlayer?: number
    maxPlayer?: number
    price?: number
    quantity?: number
    category?:string[]
    mechanic?:string[]
    image_url?:string
    constructor(
        id:number, 
        name: string,
        rating?:number, 
        minPlayer?:number, 
        maxPlayer?:number, 
        price?:number, 
        quantity?:number, 
        category?:string[], 
        mechanic?:string[],
        image_url?: string,
        _id?: any
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
            this.image_url = image_url;
            this._id = _id;
        }
}

export default Boardgame;