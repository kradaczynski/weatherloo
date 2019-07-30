export default (state = {}, action) => {
    if (action.type === 'LOAD_CURRENT') {
        return action.payload;
    } else {
        return state;
    }
}