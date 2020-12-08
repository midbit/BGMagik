import {Box, TextInput, Button } from 'grommet';

const searchbar = () => (
    <div style={{
        width:"80%", 
        minWidth: "250px", 
        display: "block", 
        marginLeft: "auto", 
        marginRight: "auto",
        marginTop: "20px"
        }}>
        <Box
            direction="row"
            align="center"
            fill="horizontal"
            gap="medium"
        >
            <TextInput
                placeholder="Search Boardgame"
            />
            <Button size="xsmall" secondary={true} label="Advance Search"/>
        </Box>
    </div>
)

export default searchbar