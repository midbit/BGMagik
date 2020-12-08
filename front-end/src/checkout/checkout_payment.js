import {Box, TextInput, Form, Button, FormField, Heading, TextArea} from 'grommet';
import React, { useState } from 'react';

const PaymentForm = ({updateStep}) => {
    const initState = {
        name:'',
        expiry_date:undefined,
        rating_above:0,
        type:'All'  
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

    const onSubmit = (value) => {
        console.log(value)
        updateStep(2)
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