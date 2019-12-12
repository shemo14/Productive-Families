import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";
import { AsyncStorage } from 'react-native';

export const favorite = ( lang , product_id , token ) => {

    return (dispatch) => {

        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url         : CONST.url + 'products/set-fav',
                method      : 'POST',
                headers     : token != null ? { Authorization: token } : null,
                data        : { lang, product_id, device_id }
            }).then(response => {
                dispatch({type: 'favorite', payload: response.data});
                Toast.show({
                    text        : response.data.msg,
                    type        : "danger",
                    duration    : 3000,
                    textStyle       : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center'
                    }
                });
            });
        });

    }

};
