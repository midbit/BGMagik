
import {Box, Button, Text} from 'grommet';
import {Previous, Next} from 'grommet-icons'
import GameCard from "./home_game_card";
import React, { useContext } from 'react';
import { store } from '../store/store';

const Home = () => {
    const globalState = useContext(store);
    const {state} = globalState
    const items = state.items
    const maxPage = state.page.maxPage
    const currentPage = state.page.currentPage
    return(
    <div>
        <Box
                direction="row"
                pad="large"
                gap="medium"
                justify="center"
                wrap={true}
            >
            {items.length == 0? 
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
                    name={item.name}/>
                )
            }
        </Box>
        <Box
            direction="row"
            gap="large"
            justify="center"
        >
            <Button disabled={currentPage === 1} secondary icon={<Previous size="medium" />}/>
            <Text> {currentPage}/ {maxPage} </Text>
            <Button  disabled={currentPage === maxPage} secondary icon={<Next size="medium"/>}/>
        </Box>
    </div>
    )
}

export default Home