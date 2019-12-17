import axios from "axios";
import CONST from "../consts";

export const homeDelegate = ( lang , status, token) => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'delegate/orders',
            method      : 'POST',
            data        : { lang , status },
            headers     : { Authorization: token }
        }).then(response => {
            dispatch({type: 'homeDelegate', payload : response.data});
        });
    }

};
