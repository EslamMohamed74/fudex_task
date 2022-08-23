import { FETCH_PRODUCTS, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, INCREMENT_CART_ITEM_QUANTITY, DECREMENT_CART_ITEM_QUANTITY } from '../actions/ActionTypes';
const initialState = {
    products: [],
    cart: []
};


const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state, products: action.payload }

        case ADD_PRODUCT_TO_CART:
            return { ...state, cart: action.payload }

        case REMOVE_PRODUCT_FROM_CART:
            return { ...state, cart: action.payload }

        case INCREMENT_CART_ITEM_QUANTITY:
            return { ...state, cart: action.payload }

        case DECREMENT_CART_ITEM_QUANTITY:
            return { ...state, cart: action.payload }
        default:
            return state;

    }
};

export default shopReducer;
