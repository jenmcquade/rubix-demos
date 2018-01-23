// Import Actions
import { TOGGLE_MENU } from './CubeActions';

// Initial State
const initialState = {

};

const CubeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {

      };

    default:
      return state;
  }
};

// Export Reducer
export default CubeReducer;
