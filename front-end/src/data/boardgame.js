import axios from "axios";
import {BOARDGAME_BY_ID_URL} from "../configuration/url";
export const GetBoardGames = async (url, name,page) => {
    try {
        const result = await axios.get(url,{
            params: {
                name,
                page
            }
        })
        const boardgames = result.data.items.map((datum) => {
            if(datum.id !== undefined && datum.name !== undefined && datum.price !== undefined) {
                const url = datum.image_url === undefined?"https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg":datum.image_url;
                const minPlayer = datum.minPlayer === undefined? "?": datum.minPlayer;
                const maxPlayer = datum.maxPlayer === undefined? "?": datum.maxPlayer;
                const rating = datum.rating === undefined? "?": datum.rating;
                const quantity = datum.quantity === undefined? 0: datum.quantity;
                const mechanic = datum.mechanic === undefined? []: datum.mechanic;
                const category = datum.category === undefined? []: datum.category;
                return {
                    name:datum.name,
                    id:datum.id,
                    image_url: url,
                    minPlayer,
                    maxPlayer,
                    rating,
                    quantity,
                    mechanic,
                    category,
                    price:datum.price
                }
            }
            return undefined
        })
        return {items:boardgames.filter(game => game !== undefined),maxPage:result.data.maxPage, url:result.request.responseURL} 
    } 
    catch (error) {
        throw error;
    }
}

export const GetBoardgame = async (id) => {
    try {
    const response = await axios.get(BOARDGAME_BY_ID_URL(id))
    const result = response.data
    let returnedBoardgame = undefined
    if(result.id !== undefined && result.name !== undefined && result.price !== undefined) {
        const url = result.image_url === undefined?"https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg":result.image_url;
        const minPlayer = result.minPlayer === undefined? "?": result.minPlayer;
        const maxPlayer = result.maxPlayer === undefined? "?": result.maxPlayer;
        const rating = result.rating === undefined? "?": result.rating;
        const quantity = result.quantity === undefined? 0: result.quantity;
        const mechanic = result.mechanic === undefined? []: result.mechanic;
        const category = result.category === undefined? []: result.category;
        returnedBoardgame = {
            name:result.name,
            id:result.id,
            image_url: url,
            minPlayer,
            maxPlayer,
            rating,
            quantity,
            mechanic,
            category,
            price:result.price
        };
    }
    return returnedBoardgame;
    } 
    catch (error) {
        throw error;
    }
}