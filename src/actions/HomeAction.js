import axios from "axios";
import CONST from "../consts";

export const sliderHome = lang => {

    return (dispatch) => {
        axios({
            url         : CONST.url + 'banners',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'sliderHome', payload: response.data});
            console.log('data ==', response.data)
        });
    }

};
