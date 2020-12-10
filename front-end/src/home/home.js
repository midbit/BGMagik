
import {Box, Button, Text} from 'grommet';
import {Previous, Next} from 'grommet-icons'
import GameCard from "./home_game_card";
import React, { useContext, useEffect } from 'react';
import { store } from '../store/store';
import {GetBoardGames} from '../data/boardgame';
import {BOARDGAMES_URL} from "../configuration/url";

const Home = () => {
    const globalState = useContext(store);
    const {state} = globalState
    const items = state.items
    const maxPage = state.page.maxPage
    const currentPage = state.page.currentPage
    const {dispatch} = globalState

    const incrementPage = async () => {
        dispatch({type:"INCREMET_PAGE"});
        const data = await GetBoardGames(state.page.currentUrl,undefined, state.page.currentPage+1);
        dispatch({type:"SET_ITEMS", payload:[...data.items]});
        window.scrollTo(0,0);
    }

    const decrementPage = async () => {
        dispatch({type:"DECREMENT_PAGE"});
        const data = await GetBoardGames(state.page.currentUrl,undefined, state.page.currentPage-1);
        dispatch({type:"SET_ITEMS", payload:[...data.items]});
        window.scrollTo(0,0);
    }
    useEffect(() => {
        const loadData = async () => {
            const data = await GetBoardGames(BOARDGAMES_URL());
            dispatch({type:"SET_ITEMS", payload:[...data.items]})
            dispatch({type:"SET_MAX_PAGE", payload:data.maxPage})
            dispatch({type:"CHANGE_URL", payload:data.url})
        }
        loadData()
      },[]);
    
    return(
    <div>
        <Box
                direction="row"
                pad="large"
                gap="medium"
                justify="center"
                wrap={true}
            >
            {items.length === 0? 
                <Text> There Seem To Be No Items </Text>:
                items.map((item) => 
                    <GameCard  
                    key={item.id} 
                    id={item.id}
                    rating={item.rating} 
                    minPlayer={item.minPlayer} 
                    maxPlayer={item.maxPlayer} 
                    price={item.price} 
                    quantity={item.quantity} 
                    name={item.name}
                    image_url={item.image_url}
                    />
                )
            }
        </Box>
        <Box
            direction="row"
            gap="large"
            justify="center"
        >
            <Button disabled={currentPage === 1} onClick={() => decrementPage()}secondary icon={<Previous size="medium" />}/>
            <Text> {currentPage}/ {maxPage} </Text>
            <Button  disabled={currentPage >= maxPage} onClick={() => incrementPage()} secondary icon={<Next size="medium"/>}/>
        </Box>
    </div>
    )
}

export default Home