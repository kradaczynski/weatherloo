export default (state = null, action) => {
   if (action.type === 'SET_CITY') {
      return action.payload;
   } else {
      return state;
   }
}