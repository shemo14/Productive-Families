const INITIAL_STATE = { city : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'city':{
            return ({...state, city : action.payload.data, loader : action.payload.key === 1 ? false : true });
        }
        default:
            return state;
    }
};
