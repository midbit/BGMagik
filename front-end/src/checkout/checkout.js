import React, { useContext, useMemo, useState } from 'react';
import {Box} from 'grommet';
import Total from './checkout_total';
import Payment from './checkout_payment';
import Complete from './checkout_complete';
import { store } from '../store/store';

const CheckOut = () => {
    const [step, setStep]  = useState(0)
    const globalState = useContext(store);
    const {state} = globalState;
    const items = state.cart.items;

    const updateStep = (nextStep) => setStep(nextStep)
    const generateGrandTotalData = (items) => {
        var total = 0
        const checkData = items.map(item => {
            const totalItem = item.quantity * item.price;
            total = total + totalItem;
            return {...item, total:totalItem};
        })
        const vat = Math.round(total * 0.07);
        const grandTotal = vat + total;
        return [...checkData, {name:"Vat",quantity:"", total:vat},{name:"Total",quantity:"", total:grandTotal}];
    }

    const grandTotalData = useMemo(() => generateGrandTotalData(items), [items])

    return(
        <Box pad="medium">
             
            {step === 0 && <Total updateStep={updateStep} grandTotalData={grandTotalData}/>}
            {step === 1 && <Payment updateStep={updateStep} grandTotalData={grandTotalData}/>}
            {step === 2 && <Complete updateStep={updateStep}/>}
        </Box>
    )
}

export default CheckOut