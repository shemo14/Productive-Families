import axios from "axios";
import CONST from "../consts";


export const getCancelOrder = (lang , order_id , cancel_reason , token , props) => {
    return (dispatch) => {

        axios({
            url         : CONST.url + 'user/cancel-order',
            method      : 'POST',
            data        : { lang , order_id , cancel_reason  },
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getCancelOrder', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('MyOrders')
            }
        })

    }
};
