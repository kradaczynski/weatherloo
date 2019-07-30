export default (state = null, action) => {
   switch (action.type) {
      case 'ADD_ERROR':
         return action.payload;
      case 'LOAD_CURRENT':
         return null;
      case 'LOAD_FIVEDAY':
         return null;
      case 'REMOVE_ERROR':
         return null;
      default:
         return state;
   }
}