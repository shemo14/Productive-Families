import axios from "axios";
import CONST from "../consts";

export const productDetails = ( lang , product_id ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'products/details',
            method      : 'POST',
            data        : { lang , product_id }
        }).then(response => {
            dispatch({type: 'productDetails', payload : response.data.data});

            console.log('payload ===', response.data.data);
        });
    }

};
