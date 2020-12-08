import {Box} from 'grommet';
import React, { useState } from 'react';
import Total from './checkout_total';
import Payment from './checkout_payment';
import Complete from './checkout_complete';

const CheckOut = () => {
    const [step, setStep]  = useState(0)
    const updateStep = (nextStep) => setStep(nextStep)

    return(
        <Box pad="medium">
             
            {step === 0 && <Total updateStep={updateStep}/>}
            {step === 1 && <Payment updateStep={updateStep}/>}
            {step === 2 && <Complete updateStep={updateStep}/>}
        </Box>
    )
}

export default CheckOut