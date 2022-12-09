import { contantActions } from "~/Contansts";
export const setBackgroundColor = (payload) => {
  return {
    type: contantActions.SET_BACKGROUND_COLOR,
    payload,
  };
};
export const setTop = (payload) => {
  return {
    type: contantActions.SET_TOP,
    payload,
  };
};
export const setLeft = (payload) => {
  return {
    type: contantActions.SET_LEFT,
    payload,
  };
};
export const setBorderColor = (payload) => {
  return {
    type: contantActions.SET_BORDER_COLOR,
    payload,
  };
};
export const setMargin = (payload) => {
  return {
    type: contantActions.SET_MAGRIN,
    payload,
  };
};
export const setPadding = (payload) => {
  return {
    type: contantActions.SET_PADDING,
    payload,
  };
};
export const setHeight = (payload) => {
  return {
    type: contantActions.SET_HEIGHT,
    payload,
  };
};
export const setWidth = (payload) => {
  return {
    type: contantActions.SET_WIDTH,
    payload,
  };
};
export const setColor = (payload) => {
  return {
    type: contantActions.SET_COLOR,
    payload,
  };
};
export const setFontSize = (payload) => {
  return {
    type: contantActions.SET_FONT_SIZE,
    payload,
  };
};
export const setFontFamily = (payload) => {
  return {
    type: contantActions.SET_FONT_FAMILY,
    payload,
  };
};
export const setIdIemSlected = (payload) => {
  return {
    type: contantActions.SET_ID_ITEM,
    payload,
  };
};
