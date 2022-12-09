import { contantActions } from "~/Contansts";

const reducer = (state, action) => {
  switch (action.type) {
    case contantActions.SET_COLOR: {
      return {
        ...state,
        color: action.payload,
      };
    }
    case contantActions.SET_BACKGROUND_COLOR: {
      return {
        ...state,
        background_color: action.payload,
      };
    }
    case contantActions.SET_FONT_SIZE: {
      return {
        ...state,
        font_size: action.payload,
      };
    }
    case contantActions.SET_FONT_FAMILY: {
      return {
        ...state,
        font_family: action.payload,
      };
    }
    case contantActions.SET_BORDER_RADIUS: {
      return {
        ...state,
        border_radius: action.payload,
      };
    }
    case contantActions.SET_BORDER_STYLE: {
      return {
        ...state,
        border_style: action.payload,
      };
    }
    case contantActions.SET_BORDER_COLOR: {
      return {
        ...state,
        border_color: action.payload,
      };
    }
    case contantActions.SET_ID_ITEM: {
      return {
        ...state,
        id_item_slected: action.payload,
      };
    }
    default:
      throw new Error("Invalid action type");
  }
};

export default reducer;
