import {Box, TextInput, Form, Button, FormField, Heading, TextArea} from 'grommet';
import React, { useContext, useState } from 'react';
import { store } from '../store/store';
import {PostTransaction} from '../data/transaction';
import { useHistory } from "react-router-dom";

const PaymentForm = ({updateStep, grandTotalData}) => {
    const globalState = useContext(store);
    const {state, dispatch} = globalState
    const history = useHistory();

    const initState = {
        name:undefined,
        expiry_date:undefined,
        card_number:"4111111111111111",
        security_code:undefined,
    }

    const [form, setForm] = useState(initState)

    const validateCardNumber = (value, allValue) => {
        const re = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)
       return re.test(value)? undefined: "Invalid card number"
    }

    const validateExpiryDate = (value, allValue) => {
        const re = new RegExp(/^\d{2}\/\d{2}$/);
        return re.test(value)? undefined: "Invalid expiry date"    
    }

    const onSubmit = async (value) => {
        const total = grandTotalData === undefined? 0:grandTotalData[grandTotalData.length-1].total;
        const items = state.cart.items.map((item) => ({name:item.name, quantity:item.quantity, id:item.id}))
        const transaction = {
            total,
            address: value.address,
            expiryDate: value.expiry_date,
            cardNumber: value.card_number,
            items
        }
        const result = await PostTransaction(transaction);
        if(result.status === 201){
            dispatch({type:"RESET"})
            updateStep(2)
        }
        else{
            history.push("/error")
        }
    }
    return(
        <Box  
        justify="end" 
        background={{color:"white", opacity:"strong"}} 
        pad="medium" 
        animation="slideLeft"
        fill={true} 
        round="medium"
        >
            <Heading level="3"> 
                You're Almost There!
            </Heading>
            <Form
            value={form}
            onChange={value => setForm(value)}
            onReset={() => setForm(initState)}
            onSubmit={({ value }) => (onSubmit(value))}
            >
                    <FormField 
                    name="name" 
                    htmlfor="name" 
                    required
                    label="Name on Card"
                    >
                        <TextInput 
                        id="name" 
                        name="name" 
                        />
                    </FormField>
                    <FormField 
                    name="card_number"
                    htmlfor="card_number"
                    label="Card Number"
                    validate={validateCardNumber}
                    >
                        <TextInput 
                        id="card_number" 
                        name="card_number"  
                        />
                    </FormField>
                    <FormField 
                    name="expiry_date"
                    required
                    htmlfor="expiry_date" 
                    label="Expiry Date"
                    validate={validateExpiryDate}
                    >
                        <TextInput
                        id="expiry_date" 
                        name="expiry_date" 
                        placeholder="MM/yy" 
                        />
                    </FormField>
                    <FormField 
                    name="security_code" 
                    htmlfor="security_code" 
                    required
                    label="Security Code"
                    >
                        <TextInput
                            id="security_code"
                            name="security_code"
                        />                
                    </FormField>
                    <FormField 
                    name="address" 
                    htmlfor="address" 
                    required
                    label="Address"
                    >
                        <TextArea
                            id="address"
                            name="address"
                        />                
                    </FormField>
                    <Button 
                    type="submit"
                    secondary 
                    color="#344966"
                    style={{
                        marginLeft: "auto", 
                        marginRight: "auto", 
                        display:"block", 
                        backgroundColor:"white"
                    }} 
                    label="Process"
                    />
            </Form>
        </Box>
    )
}

export default PaymentForm