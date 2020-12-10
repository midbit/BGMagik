import {Box, Button, DataTable, Text, Heading} from 'grommet';
import React, { useContext} from 'react';
import { store } from '../store/store';
import {FormTrash} from 'grommet-icons';

const TotalPayment = ({updateStep, grandTotalData}) => {
    const globalState = useContext(store);
    const {state, dispatch} = globalState;

    const removeItem = (id) => {
        dispatch({type:"REMOVE_ITEM", payload:{id}})
        dispatch({type:"ADD_QUANTITY", payload:{id}})

    }
    return(
        <Box pad="medium" animation="slideLeft"> 
            <Heading level="3"> Check Out</Heading>
            <Box 
            background="white"
            pad="medium"
            round="small"
            elevation="small"
            >
                <DataTable
                    columns={[
                        {
                            property: 'name',
                            header: <Text>Item</Text>,
                            primary: true,
                            render: datum => {
                             if(datum.id === undefined) {
                                return datum.name
                             }
                             else {
                                 return(
                                <Box direction="row" wrap justify="left" gap="small" align="center">
                                    <Text> {datum.name}</Text>
                                    <Button 
                                    icon={<FormTrash/>}
                                    onClick={() => removeItem(datum.id)}
                                    />
                                 </Box>
                                )
                             } 
                            },
                        },
                        {
                            property: 'quantity',
                            header: 'Quantity',
                        },
                        {
                            property: 'total',
                            header: 'Total',
                        }
                    ]}
                    data={grandTotalData}
                />
            </Box>
            <Button 
            secondary 
            color="#344966"
            style={{
                marginLeft: "auto", 
                marginRight: "auto", 
                marginTop:"30px",
                display:"block", 
                backgroundColor:"white"
            }} 
            onClick={() => updateStep(1)}
            label="Proceed"
            disabled={state.cart.items.length === 0}
            />
        </Box>
    )
}

export default TotalPayment