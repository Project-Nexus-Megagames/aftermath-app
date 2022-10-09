import { combineReducers } from "redux";
import auth from "./entities/auth";
import characters from "./entities/characters";
import gamestate from "./entities/gamestate";

export default combineReducers({
  auth,
  characters,
  gamestate,
});
