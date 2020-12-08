import React, {createContext, useReducer} from 'react';

const initialState = {
    cart:{
        items:[]
    },
    items:[
        {
            id:1,
            name:"Boardgame 1",
            rating:4.3,
            minPlayer:3,
            maxPlayer:10,
            price:300,
            quantity:20
        }
    ],
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
            const currentItemListAfterRemove = state.items.map(item => {
                if(removedItem.id === item.id)
                {
                    const newQuantity = item.quantity + 1;
                    return {...item, quantity: newQuantity}
                }
                return {...item}
             })
            const itemList = state.cart.items.map(item => {
                if(item.id === removedItem.id)
                {
                    const removedItemQuantity = item.quantity - 1
                    return {...item, quantity: removedItemQuantity};
                }
                return {...item};
            }).filter(item => item.quantity > 0);
            return {...state, items:[...currentItemListAfterRemove], cart:{...state.cart, items:itemList}};

        case 'ADD_ITEM':
            const addedItem = {...action.payload}
            const currentItemList = state.items.map(item => {
                if(addedItem.id === item.id)
                {
                    const newQuantity = item.quantity - 1;
                    return {...item, quantity: newQuantity}
                }
                return {...item}
             })
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
                return {...state, items: [...currentItemList], cart: {...state.cart, items: [...addItemList]}};
            }
            else {
                return {...state, items: [...currentItemList], cart: {...state.cart, items: [...state.cart.items, {...addedItem, quantity:1}]}};
            }
            
            

        case 'INCREMET_PAGE':
            const incrementPage =+ state.page.currentPage;
            return {...state, page:{...state.page, currentPage:incrementPage}}

        case 'DECREMENT_PAGE':
            const decretmentPage =-  state.page.currentPage;
            return {...state, page:{...state.page, currentPage:decretmentPage}}

        case 'CHANGE_URL':
            return {...state, page:{...state.page, currentUrl:action.payload}}

        default:
            return {...state}
    };
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }