import axios from "axios";
import CONST from "../consts";

export const providerProduct = ( lang , provider_id , sub_category_id, ) => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'providers/products',
            method      : 'POST',
            data        : { lang , provider_id , sub_category_id }
        }).then(response => {
            dispatch({type: 'providerProduct', payload : response.data.data});
        });
    }

};
