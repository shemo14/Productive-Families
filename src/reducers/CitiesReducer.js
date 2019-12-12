<<<<<<< HEAD
const INITIAL_STATE = { cities : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCities':{
            return {
                cities        : action.payload.data,
                loader      : action.payload.key === 1 ? false : true
            };
        }

=======
const INITIAL_STATE = { city : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'city':{
            return ({...state, city : action.payload.data, loader : action.payload.key === 1 ? false : true });
        }
>>>>>>> 81cafbcdb3df75e56f775b4301ba31311981fb0c
        default:
            return state;
    }
};
