import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";

export const addComment = ( lang , product_id , token, comment, rate ) => {

    return (dispatch) => {

        axios({
            url         : CONST.url + 'comments/store',
            method      : 'POST',
            headers     : token != null ? { Authorization: token } : null,
            data        : { lang, product_id, comment , rate}
        }).then(response => {
            dispatch({type: 'addComment', payload: response.data});
            Toast.show({
                text        : response.data.msg,
                type        : response.data.key === 1 ? "success" : "danger",
                duration    : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center'
                }
            });
        });

    }

};
