const JOIN_GAME = "room/join";
const GAME_STATE = "room/state";
const ROUNDS = "room/settings/rounds";
const TIME = "room/settings/time";
const ADD_PLAYER = "room/player/add";
const REMOVE_PLAYER = "room/player/remove";

export const joinGame = (id) => {
  return {
    type: JOIN_GAME,
    payload: id,
  };
};

export const changeGameState = (state) => {
  return {
    type: GAME_STATE,
    payload: state,
  };
};

export const setRounds = (number) => {
  return {
    type: ROUNDS,
    payload: number,
  };
};

export const setTime = (time) => {
  return {
    type: TIME,
    payload: time,
  };
};

export const addPlayer = (player) => {
  return {
    type: ADD_PLAYER,
    payload: player,
  };
};

export const removePlayer = (player) => {
  return {
    type: REMOVE_PLAYER,
    payload: player,
  };
};

// REDUCER
export default function reducer(
  state = {
    socket: null,
    roomId: null,
    gameState: "connecting",
    rounds: 1,
    time: 60,
    players: {},
  },
  action
) {
  switch (action.type) {
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
    case ROUNDS: {
      return {
        ...state,
        rounds: action.payload,
      };
    }
    case TIME: {
      return {
        ...state,
        time: action.payload,
      };
    }
    case ADD_PLAYER: {
      const id = action.payload.id;
      return {
        ...state,
        players: {
          ...state.players,
          [id]: action.payload,
        },
      };
    }
    case REMOVE_PLAYER: {
      const allPlayers = state.players;
      const id = action.payload.id;
      delete allPlayers[id];
      return {
        ...state,
        players: allPlayers,
      };
    }
    default: {
      return state;
    }
  }
}
