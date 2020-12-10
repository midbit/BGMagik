import axios from "axios";
import {TRANSACTION_URL} from '../configuration/url';
export const PostTransaction = async (data) => {
    try {
            const result = await axios.post(TRANSACTION_URL(),{...data})
            return result 
    } 
    catch (error) {
        throw error;
    }
}