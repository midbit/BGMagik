import {Nav, Anchor, TextInput, Box} from 'grommet';
import {Basket,Search} from "grommet-icons";
import { useHistory } from "react-router-dom";
import React, { useContext } from 'react';
import { store } from '../store/store';

const NavBar = () => {
    const globalState = useContext(store);
    const {state} = globalState
    const CountQuantity = () => {
      var quantity = 0
      state.cart.items.forEach(item => {
        quantity += item.quantity
      });
      return quantity
    }
    const quantity = CountQuantity()
    const history = useHistory();
    return(
      <Nav direction="row" background="brand" justify="between" align="center" pad="medium">
          <Anchor color="white" onClick={() => history.push("/")}> BGMagik </Anchor>
          <TextInput icon={<Search/>} size="small" style={{backgroundColor:"white"}}/>
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