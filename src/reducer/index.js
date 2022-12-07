import { contantActions } from "~/Contansts";

const reducer = (state, action) => {
  switch (action.type) {
    case contantActions.SET_BACKGROUND_COLOR: {
      console.log(`Setting background color ${action.payload}`);
      break;
    }
    default:
      throw new Error("Invalid action type");
  }
};

export default reducer;
