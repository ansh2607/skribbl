// ACTION TYPES
const CANVAS_DRAW = "canvas/draw";
const START_POS_X = "canvas/start/x";
const START_POS_Y = "canvas/start/y";
const CANVAS_ERASE = "canvas/erase";

// ACTIONS
export const setDrawing = (value) => {
  return {
    type: CANVAS_DRAW,
    payload: value,
  };
};

export const setStartX = (value) => {
  return {
    type: START_POS_X,
    payload: value,
  };
};

export const setStartY = (value) => {
  return {
    type: START_POS_Y,
    payload: value,
  };
};

export const setErase = (value) => {
  return {
    type: CANVAS_ERASE,
    payload: value,
  };
};

// REDUCER
export default function reducer(
  state = { drawing: false, erase: false, startX: 0, startY: 0 },
  action
) {
  switch (action.type) {
    case CANVAS_DRAW: {
      return {
        ...state,
        drawing: action.payload,
      };
    }
    case START_POS_X: {
      return {
        ...state,
        startX: action.payload,
      };
    }
    case START_POS_Y: {
      return {
        ...state,
        startY: action.payload,
      };
    }
    case CANVAS_ERASE: {
      return {
        ...state,
        erase: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
