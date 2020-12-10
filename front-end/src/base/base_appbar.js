import {Nav, Anchor, TextInput, Box} from 'grommet';
import {Basket,Search} from "grommet-icons";
import { useHistory } from "react-router-dom";
import React, { useContext, useState } from 'react';
import { store } from '../store/store';
import {BOARDGAMES_URL} from "../configuration/url";
import {GetBoardGames} from '../data/boardgame';
import { useLocation } from 'react-router-dom'

const NavBar = () => {
    const globalState = useContext(store);
    const {state, dispatch} = globalState
    const [text, setText] = useState("")
    const location = useLocation();
    const history = useHistory();

    const searchBoardgame = async (event) => {
      if(event.key === "Enter")
      {
        const data = await GetBoardGames(BOARDGAMES_URL(),text);
        dispatch({type:"SET_ITEMS", payload:[...data.items]})
        dispatch({type:"SET_MAX_PAGE", payload:data.maxPage});
        dispatch({type:"CHANGE_URL", payload:data.url});
      }
    }

    const CountQuantity = () => {
      var quantity = 0
      state.cart.items.forEach(item => {
        quantity += item.quantity
      });
      return quantity
    }
    
    const quantity = CountQuantity()
    
    return(
      <Nav direction="row" background="brand" justify="between" align="center" pad="medium">
          <Anchor color="white" onClick={() => history.push("/")}> BGMagik </Anchor>
          <TextInput 
          icon={<Search/>} 
          size="small" 
          style={{backgroundColor:"white"}}
          value={text}
          onKeyPress={searchBoardgame}
          disabled={location.pathname !== "/"}
          onChange={(event) => setText(event.target.value)}
          />
          <Box align="center" onClick={() => history.push("/checkout")}>
              <Basket color="white" />        
              <span 
              style={{
                marginTop:"3px", 
                backgroundColor: 
                "#BFCC94", 
                borderRadius: "50%", 
                padding:"2px", 
                fontSize:"14px", 
                color:"white"
              }}> 
                {quantity} 
              </span>
          </Box>
      </Nav>
    )
}
export default NavBar