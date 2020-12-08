import {Box, TextInput, Form, Button, FormField, Select, Heading} from 'grommet';
import React, { useState } from 'react';

const AdvanceSearch = () => {
    const initState = {
        name:'',
        player_amount:0,
        rating_above:0,
        type:'All'  
    }
    const [form, setForm] = useState(initState)
    const validateNumber = (value, allValue) => {
       return value >= 0? undefined: "This field need to be greater than 0"
    }
    return(
        <Box 
        pad="large" 
        background="#344966"
        >
        <Box  
        justify="end" 
        background={{color:"white", opacity:"strong"}} 
        pad="medium" 
        fill={true} 
        round="medium"
        >
            <Heading level="3"> 
                Looking For Something? 
             </Heading>
            <Form
            value={form}
            onChange={value => setForm(value)}
            onReset={() => setForm(initState)}
            onSubmit={({ value }) => (console.log(value))}
            >
                    <FormField 
                    name="name" 
                    htmlfor="name" 
                    label="Name"
                    >
                        <TextInput 
                        id="name" 
                        name="name" 
                        />
                    </FormField>
                    <FormField 
                    name="player_amount"
                    htmlfor="player_amount"
                    label="Amount of Players"
                    type="number"
                    validate={validateNumber}
                    >
                        <TextInput 
                        id="player_amount" 
                        name="player_amount" 
                        placeholder="0" 
                        />
                    </FormField>
                    <FormField 
                    name="rating_above"
                    htmlfor="rating_above" 
                    type="number"
                    label="Rating Above"
                    validate={validateNumber}
                    >
                        <TextInput
                        id="rating_above" 
                        name="rating_above" 
                        placeholder="0" 
                        />
                    </FormField>
                    <FormField 
                    name="type" 
                    htmlfor="type" 
                    label="Type"
                    >
                        <Select
                            id="type"
                            name="type"
                            options={['All', 'Strategy', 'Party']}
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
                    label="Submit"
                    />
            </Form>
        </Box>
        </Box>
    )
}

export default AdvanceSearch