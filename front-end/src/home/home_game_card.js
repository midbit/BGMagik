import {Card, CardHeader, CardBody, CardFooter, Button, Text, Box, Grid} from 'grommet';
import {Add, Star, User, Money, Inbox, Info} from 'grommet-icons'
import React, { useContext } from 'react';
import { store } from '../store/store';

const GameCard = ({id, name, minPlayer, maxPlayer, rating, price, quantity}) => {
    const globalState = useContext(store);
    const {dispatch} = globalState

    const addItem = (id,name,price) => {
        dispatch({type: "ADD_ITEM", payload:{id,name,price}})
        dispatch({type: "REMOVE_QUANTITY", payload:{id}})
    }
    
    return(
        <Card  
            animation="slideRight"          
            responsive={true}    
            background="light-1"
            width="medium"
            style={{marginTop:"30px"}}
        >
            <CardHeader 
                pad="medium"
                justify="center"
                background='brand'
                style={{color:"white"}}
            >
                {name}
            </CardHeader>
            <CardBody 
                pad="medium"
                responsive={true}
                direction="column"
                flex="grow"
            >
                <Box height="small" background="url(//v2.grommet.io/assets/Wilderpeople_Ricky.jpg)"/>
                    
                <Grid 
                rows={["xxsmall", "xxsmall"]} 
                columns={["1/2", "1/2"]} 
                gap="small"
                fill={true} 
                height="small"
                style={{textAlign: "center"}}
                areas={
                    [
                        {name:"rating", start: [0,0], end: [0,0]},
                        {name:"player", start: [1,0], end: [1,0]},
                        {name:"price", start: [1,1], end: [1,1]},
                        {name:"quantity", start: [0,1], end: [0,1]},
                    ]
                }>
                    <Box
                    height="xsmall"
                    gridArea="rating" 
                    fill={true}
                    justify="center"
                    direction="row"
                    pad="small"
                    >
                        <Star color="yellow" style={{marginRight: "5px"}}/> 
                        <Text> {rating} </Text>
                    </Box>
                    <Box 
                    height="xsmall"
                    gridArea="player" 
                    fill={true}
                    justify="center"
                    direction="row"
                    pad="small"

                    >
                        <User color="grey" style={{marginRight:"5px"}}/>
                        <Text> {minPlayer} - {maxPlayer} people </Text>
                    </Box>
                    <Box 
                    height="xsmall"
                    gridArea="price" 
                    fill={true}
                    justify="center"
                    direction="row"
                    pad="small"

                    >
                        <Money color="green" style={{marginRight:"5px"}}/>
                        <Text> {price} Baht </Text>
                    </Box>
                    <Box
                    height="xsmall" 
                    gridArea="quantity" 
                    fill={true}
                    justify="center"
                    direction="row"
                    pad="small"
                    >
                        <Inbox color="brown" style={{marginRight: "5px"}}/>
                        <Text> {quantity} Left </Text>
                    </Box>
                </Grid>
            </CardBody>
            <CardFooter 
            pad="small" 
            justify="center"
            background="light-2"
            direction="row"
            >   
                <Button
                icon={<Info size="medium"/>}
                size="xsmall"
                secondary
                label="Detail"
                alignSelf="center"
                />
                <Button
                style={{color:"white"}}
                icon={<Add color="white"/>}
                size="xsmall"
                primary
                label="Buy"
                disabled={quantity <= 0}
                alignSelf="center"
                onClick={() => addItem(id,name,price)}
                />
            </CardFooter>
        </Card>
    )
}

export default GameCard