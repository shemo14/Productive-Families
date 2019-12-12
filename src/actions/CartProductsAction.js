import axios from "axios";
import CONST from "../consts";



export const getCartProducts = (lang, provider_id , token) => {
    return (dispatch) => {
        CartProducts(lang, provider_id, token, dispatch)
    }
};

export const deleteCart = (lang , provider_id, cart_id, token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'carts/delete',
            method: 'POST',
            data: {lang , cart_id},
            headers: {Authorization: token}
        }).then(response => {
            CartProducts(lang , provider_id , token , dispatch)
        })

    }
};

const CartProducts = (lang , provider_id , token , dispatch ) => {
    axios({
        url: CONST.url + 'carts/products',
        method: 'POST',
        data: {lang , provider_id},
        headers: {Authorization: token}
    }).then(response => {
        dispatch({type:'getCartProducts', payload: response.data})
    })
};
