export default (state = {}, action) => {
   if (action.type === 'LOAD_FIVEDAY') {
      return action.payload;
   } else {
      return state;
   }
}