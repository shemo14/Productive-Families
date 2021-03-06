const INITIAL_STATE = { cartProducts : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCartProducts':{
            return {
                cartProducts        : action.payload.data,
                loader      : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
};
