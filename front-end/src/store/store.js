import React, {createContext, useReducer} from 'react';

const initialState = {
    cart:{
        items:[]
    },
    items:[],
    page:{
        currentUrl: '',
        maxPage: 1,
        currentPage: 1
    }
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {

        case 'SET_ITEMS':
            return {...state, items:action.payload};

        case 'REMOVE_ITEM':
            const removedItem = {...action.payload}
            const itemList = state.cart.items.map(item => {
                if(item.id === removedItem.id)
                {
                    const removedItemQuantity = item.quantity - 1
                    return {...item, quantity: removedItemQuantity};
                }
                return {...item};
            }).filter(item => item.quantity > 0);
            return {...state, cart:{...state.cart, items:itemList}};

        case 'ADD_ITEM':
            const addedItem = {...action.payload}
            const isInList = state.cart.items.filter(item => item.id === addedItem.id).length > 0
            if(isInList) {
                const addItemList = state.cart.items.map(item => {
                    if(item.id === addedItem.id)
                    {
                        const addedQuantity = item.quantity + 1;
                        return {...item, quantity: addedQuantity};
                    }
                    return {...item};
                })
                return {...state, cart: {...state.cart, items: [...addItemList]}};
            }
            else {
                return {...state, cart: {...state.cart, items: [...state.cart.items, {...addedItem, quantity:1}]}};
            }
        
        case 'ADD_QUANTITY':
            const addedBrowseItem = {...action.payload}
            const addedBrowseItemList = state.items.map(item => {
                if(addedBrowseItem.id === item.id)
                {
                    const newQuantity = item.quantity + 1;
                    return {...item, quantity: newQuantity}
                }
                return {...item}
             })
             return{...state, items:[...addedBrowseItemList]}

        case 'REMOVE_QUANTITY':
            const removedBrowseItem = {...action.payload}
            const removedBrowseItemList = state.items.map(item => {
                if(removedBrowseItem.id === item.id)
                {
                    const newQuantity = item.quantity - 1;
                    return {...item, quantity: newQuantity}
                }
                return {...item}
            })
            return{...state, items:[...removedBrowseItemList]}

        case 'INCREMET_PAGE':
            const incrementPage = state.page.currentPage + 1;
            return {...state, page:{...state.page, currentPage:incrementPage}}

        case 'DECREMENT_PAGE':
            const decretmentPage = state.page.currentPage -  1;
            return {...state, page:{...state.page, currentPage:decretmentPage}}

        case 'CHANGE_URL':
            return {...state, page:{...state.page, currentUrl:action.payload}}
        
        case 'SET_MAX_PAGE':
            return {...state, page:{...state.page, maxPage:action.payload}}
        
        case 'RESET':
            return {...initialState}
        default:
            return {...state}
    };
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }