const INITIAL_STATE = { register : [] , loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'register':{
            return {
                register    : action.payload,
                loader      : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
};