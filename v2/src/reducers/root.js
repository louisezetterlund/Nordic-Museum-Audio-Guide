import { combineReducers } from "redux";

import { beacon } from "./beacon";
import { closeTourStops } from "./closeTourStops";
import { allTourStops } from "./allTourStops";
import { bottomPlayer } from "./bottomPlayer";
import { accessibility } from "./accessibility";
import { device } from "./device";
import { searchByNumber } from "./searchByNumber";
import { calendarEvents } from "./calendarEvents"; //Added by KTH project 2020

const rootReducer = combineReducers({
  beacon,
  closeTourStops,
  allTourStops,
  bottomPlayer,
  accessibility,
  device,
  searchByNumber,
  calendarEvents //Added by KTH project 2020
});

export default rootReducer;
