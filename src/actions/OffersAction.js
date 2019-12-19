import axios from "axios";
import CONST from "../consts";


export const offers = (lang) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'offers',
            method      : 'POST',
            data        : { lang },
        }).then(response => {
            dispatch({type: 'offers', payload: response.data})
        })

    }
};
