const INITIAL_STATE = { loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'forgetPass':{
            return {
                loader           : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
};