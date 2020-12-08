import {Box, Paragraph, Button, Heading} from 'grommet';

const CompletePage = () => {

    return(
        <Box pad="medium"> 
            <Heading> Transaction Complete </Heading>
            <Paragraph> 
                Your payment is complete : )
            </Paragraph>
            <Button label="Done"/>
        </Box>
    )
}

export default CompletePage