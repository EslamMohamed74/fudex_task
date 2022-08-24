import {
  FETCH_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  INCREMENT_CART_ITEM_QUANTITY,
  DECREMENT_CART_ITEM_QUANTITY,
  CLEAR_CART,
} from "./ActionTypes";
import productsApi from '../../apis/productsApi'

export const fetchProducts = () => async dispatch => {
    const response = await productsApi.get('');
    dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data
    })
};


export const addProductToCart = product => (dispatch, getState) => {
    let updatedCart = [...getState().shop.cart];
    let updatedItemIndex = updatedCart.findIndex(item => item.id === product.id);

    if (updatedItemIndex < 0) {
        updatedCart.push({ ...product, quantity: 1 });
    } else {
        const updatedItem = {
            ...updatedCart[updatedItemIndex]
        };
        updatedItem.quantity++;
        updatedCart[updatedItemIndex] = updatedItem;
    }
    dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: updatedCart
    })
};

export const removeProductToCart = (productId) => (dispatch, getState) => {
    let updatedCart = [...getState().shop.cart.filter(item => item.id !== productId)];

    dispatch({
        type: REMOVE_PRODUCT_FROM_CART,
        payload: updatedCart
    })
};

export const incrementCartQuantity = (productId) => (dispatch, getState) => {

    let updatedCart = [...getState().shop.cart];
    let updatedItemIndex = updatedCart.findIndex(
        item => item.id === productId
    );

    const decrementedItem = {
        ...updatedCart[updatedItemIndex]
    };
    
    decrementedItem.quantity++;

    updatedCart[updatedItemIndex] = decrementedItem;

    dispatch({
        type: INCREMENT_CART_ITEM_QUANTITY,
        payload: updatedCart
    })
};

export const decrementCartQuantity = (productId) => (dispatch, getState) => {
    let updatedCart = [...getState().shop.cart];
    let updatedItemIndex = updatedCart.findIndex(
        item => item.id === productId
    );

    const decrementedItem = {
        ...updatedCart[updatedItemIndex]
    };
    
    if(decrementedItem.quantity !== 1) {
        decrementedItem.quantity--;
    }

    updatedCart[updatedItemIndex] = decrementedItem;
    dispatch({
        type: DECREMENT_CART_ITEM_QUANTITY,
        payload: updatedCart
    })

};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
    payload: [],
  });
};