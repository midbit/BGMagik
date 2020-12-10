
import {Box, Button,Text, Image, Heading} from 'grommet';
import React, { useContext, useEffect, useState} from 'react';
import { store } from '../store/store';
import {GetBoardgame} from '../data/boardgame';
import {useParams} from "react-router-dom";
import {Add, Star, User, Money, Inbox, Info} from 'grommet-icons'

const Detail = () => {
    const { id } = useParams();
    const globalState = useContext(store);
    const {dispatch} = globalState
    const [boardgame, setBoardgame] = useState({
        name:"",
        id:"",
        image_url: "",
        minPlayer: "?",
        maxPlayer: "?",
        rating:"?",
        quantity:"https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg",
        mechanic:[],
        category:[],
        price:"?"
    });

    const addItem = (id,name,price) => {
        const quantity = boardgame.quantity - 1
        setBoardgame({...boardgame, quantity})
        dispatch({type: "ADD_ITEM", payload:{id,name,price}})
        dispatch({type: "REMOVE_QUANTITY", payload:{id,name,price}})
    }
    
    useEffect(() => {
        const loadData = async () => {
            const data = await GetBoardgame(id);
            setBoardgame(data)
        }
        loadData()
      },[]
    );

    return(
    <Box align="center">
        <Heading level="2">{boardgame.name}</Heading>
        <Box
        direction="row"
        pad="large"
        gap="large"
        justify="center"
        align="center"
        wrap={true}
        >
            <Box wrap gap="small" justify="center" pad="small">
                <Image
                    style={{width:"300px", height:"300px"}}
                    src={boardgame.image_url}
                />
            </Box>
            <Box 
            width="medium" 
            align="center" 
            background="white" 
            round="medium" 
            elevation="small" 
            pad="small">
                <Box 
                fill={true}
                justify="center"
                direction="row"
                pad="small"
                >
                    <Star color="yellow" style={{marginRight:"5px"}}/>
                    <Text> {boardgame.rating} </Text>
                </Box>
                <Box 
                wrap
                justify="center"
                direction="row"
                gap="small"
                pad="small"
                >
                    {boardgame.mechanic.map((mechanic, index) => 
                    <div
                    key={index}
                    style={{
                        backgroundColor:"#85ccc4", 
                        padding:"10px",
                        borderRadius:"30px",
                        color:"white",
                        marginTop:"5px"
                    }}
                    > 
                        {mechanic}
                        </div>
                    )}
                </Box>
                    <Box 
                    justify="center"
                    gap="small"
                    direction="row"
                    wrap
                    pad="small"
                    >
                      {boardgame.category.map((category,index) => 
                        <div
                        key={index}
                        style={{
                            backgroundColor:"#e3978d", 
                            padding:"10px",
                            borderRadius:"30px",
                            color:"white",
                            marginTop:"5px"
                        }}
                        > 
                            {category}
                        </div>
                        )}
                    </Box>
                    <Box 
                    height="xsmall"
                    fill={true}
                    justify="center"
                    direction="row"
                    pad="small"
                    >
                        <User color="grey" style={{marginRight:"5px"}}/>
                        <Text> {boardgame.minPlayer} - {boardgame.maxPlayer} </Text>
                    </Box>
                    <Box 
                    height="xsmall"
                    fill={true}
                    justify="center"
                    direction="row"
                    pad="small"

                    >
                        <Inbox color="brown" style={{marginRight:"5px"}}/>
                        <Text> {boardgame.quantity} </Text>
                    </Box>
                    <Box 
                    height="xsmall"
                    fill={true}
                    justify="center"
                    direction="row"
                    pad="small"
                    >
                        <Money color="green" style={{marginRight:"5px"}}/>
                        <Text> {boardgame.price} Baht </Text>
                    </Box>
                    <Box 
                    height="xsmall"
                    fill={true}
                    justify="center"
                    direction="row"
                    pad="small"
                    >
                        <Button
                        style={{color:"white"}}
                        icon={<Add color="white"/>}
                        size="small"
                        primary
                        label="Buy"
                        disabled={boardgame.quantity <= 0}
                        alignSelf="center"
                        onClick={() => addItem(boardgame.id,boardgame.name,boardgame.price)}
                        />
                </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Detail