// ACTION TYPES
const CANVAS_DRAW = "canvas/draw";
const START_POS_X = "canvas/start/x";
const START_POS_Y = "canvas/start/y";
const CANVAS_ERASE = "canvas/erase";
const PEN_COLOR = "pen/color";
const BACKGROUND_COLOR = "background/color";
const LINE_WIDTH = "line/width";

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

export const setPenColor = (color) => {
  return {
    type: PEN_COLOR,
    payload: color,
  };
};

export const setBackgroundColor = (color) => {
  return {
    type: BACKGROUND_COLOR,
    payload: color,
  };
};

export const setLineWidth = (width) => {
  return {
    type: LINE_WIDTH,
    payload: width,
  };
};

// REDUCER
export default function reducer(
  state = {
    drawing: false,
    erase: false,
    startX: 0,
    startY: 0,
    penColor: "rgb(0, 0, 0)",
    backgroundColor: "rgb(255, 255, 255)",
    lineWidth: 1,
  },
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
    case PEN_COLOR: {
      return {
        ...state,
        penColor: action.payload,
      };
    }
    case BACKGROUND_COLOR: {
      return {
        ...state,
        backgroundColor: action.payload,
      };
    }
    case LINE_WIDTH: {
      return {
        ...state,
        lineWidth: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
