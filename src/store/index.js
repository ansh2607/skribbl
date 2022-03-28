import { createStore, combineReducers } from "redux";
import GameReducder from "./GameStore";
import CanvasReduces from "./CanvasStore";

const reducer = combineReducers({
  GameStore: GameReducder,
  CanvasStore: CanvasReduces,
});

const store = createStore(reducer);
export default store;
