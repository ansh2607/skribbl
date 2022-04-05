import { createStore, combineReducers } from "redux";
import GameReducer from "./GameStore";
import CanvasReducer from "./CanvasStore";
import PlayerReducer from "./PlayerStore";

const reducer = combineReducers({
  GameStore: GameReducer,
  CanvasStore: CanvasReducer,
  PlayerStore: PlayerReducer,
});

const store = createStore(reducer);
export default store;
