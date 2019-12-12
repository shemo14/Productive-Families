import axios from "axios";
import CONST from "../consts";



export const getNotifications = (lang , token) => {
    return (dispatch) => {
        Notifications(lang, token, dispatch)
    }
};

export const deleteNotifications = (lang , notify_id, token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'delete-notification',
            method: 'POST',
            data: {lang , notify_id},
            headers: {Authorization: token}
        }).then(response => {
            Notifications(lang , token , dispatch)
        })

    }
};

const Notifications = (lang , token , dispatch ) => {
    axios({
        url: CONST.url + 'notifications',
        method: 'POST',
        data: {lang },
        headers: {Authorization: token}
    }).then(response => {
        dispatch({type:'getNotifications', payload: response.data})
    })
};
