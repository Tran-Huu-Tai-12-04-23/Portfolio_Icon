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
    case contantActions.SET_FONT_WEIGHT: {
      return {
        ...state,
        font_weight: action.payload,
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
    case contantActions.SET_BORDER_SIZE: {
      return {
        ...state,
        border_size: action.payload,
      };
    }
    case contantActions.SET_ALIGN_CENTER: {
      return {
        ...state,
        align_center: action.payload,
      };
    }
    case contantActions.SET_UPPER_CASE_LETTER: {
      return {
        ...state,
        upper_case_letter: action.payload,
      };
    }
    case contantActions.SET_FULL_WIDTH: {
      return {
        ...state,
        full_width: action.payload,
      };
    }
    case contantActions.SET_PREV_LEFT: {
      return {
        ...state,
        prev_left: action.payload,
      };
    }
    case contantActions.SET_PREV_RIGHT: {
      return {
        ...state,
        prev_right: action.payload,
      };
    }
    case contantActions.SET_PREV_WIDTH: {
      return {
        ...state,
        prev_width: action.payload,
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
