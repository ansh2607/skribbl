const CONNECT_SOCKET = "socket/connect";
const JOIN_GAME = "room/join";
const GAME_STATE = "room/state";

export const joinGame = (id) => {
  return {
    type: JOIN_GAME,
    payload: id,
  };
};

export const connectSocket = (socket) => {
  return {
    type: CONNECT_SOCKET,
    payload: socket,
  };
};

export const changeGameState = (state) => {
  return {
    type: GAME_STATE,
    payload: state,
  };
};

// REDUCER
export default function reducer(
  state = { socket: null, roomId: null, gameState: "none" },
  action
) {
  switch (action.type) {
    case CONNECT_SOCKET: {
      return {
        ...state,
        socket: action.payload,
      };
    }
    case GAME_STATE: {
      return {
        ...state,
        gameState: action.payload,
      };
    }
    case JOIN_GAME: {
      return {
        ...state,
        roomId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
