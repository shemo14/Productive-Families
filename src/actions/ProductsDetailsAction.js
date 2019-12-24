import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";

export const productDetails = (lang, product_id, token) => {
	return (dispatch) => {
		AsyncStorage.getItem('deviceID').then(device_id => {
			axios({
				url: CONST.url + 'products/details',
				method: 'POST',
				headers: token != null ? {Authorization: token} : null,
				data: {lang, product_id}
			}).then(response => {
				dispatch({type: 'productDetails', payload: response.data.data});

				console.log('payload ===', response.data.data);
			});
		});
	}

};
