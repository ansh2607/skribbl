import { createStore, combineReducers } from "redux";
import GameReducder from "./GameStore";

const reducer = combineReducers({
  GameStore: GameReducder,
});

const store = createStore(reducer);
export default store;
