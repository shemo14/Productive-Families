<<<<<<< HEAD
const INITIAL_STATE = { orderDetails : [], loader : true };
=======
const INITIAL_STATE = { orderDetails : null, loader : true };
>>>>>>> 2b7ec57139087ccf839c386e597d2f93d56a6157

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOrderDetails':{
            return {
                orderDetails        : action.payload.data,
                loader      : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
};
