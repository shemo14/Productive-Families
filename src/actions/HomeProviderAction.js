import axios from "axios";
import CONST from "../consts";

export const homeProvider = ( lang , sub_category_id, token) => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'provider/products',
            method      : 'POST',
            data        : { lang , sub_category_id },
            headers     : { Authorization: token }
        }).then(response => {
            dispatch({type: 'homeProvider', payload : response.data.data});
        });
    }

};
