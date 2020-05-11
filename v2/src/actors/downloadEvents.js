import { updateEvents } from "../actions/device";
import { getCalStr } from "./cal_get_promise";

//Calendar functionality
//Added by KTH project 2020

//File connects to URL and downloads calendar file and sends it to state

class DownloadEventsActor {
  constructor(store) {
    this._store = store;
    this._dispatch = store.dispatch;

    const period = 1000 * 60 * 10; //Update period. 10min = 1000ms * 60 * 10

    getCal(this._dispatch); //Calls function once at startup

    setInterval(async () => {
      //Calls function every 10 minutes
      getCal(this._dispatch);
    }, period);
  }
}

let _downloadEventsActor;
export const downloadEventsActor = store => {
  if (_downloadEventsActor) {
    return _downloadEventsActor;
  }

  _downloadEventsActor = new DownloadEventsActor(store);
  return _downloadEventsActor;
};

async function getCal(dispatch) {
  debugM = false; //Selects URL to use. False = Nordiska. True = dummy
  dayOnly = true; //Display only today's events
  broken = false;
  server_connected = true;

  try {
    resultstr = await getCalStr(debugM, dayOnly, broken); //Gets calendar from URL
  } catch (e) {
    console.log("e: ", +e);
    server_connected = false;
  }

  if (server_connected) {
    var i = 0;
    for (i = 0; i < resultstr.length; i++) {
      var isEmpty = false;

      //Checks if we got any events
      if (resultstr[0].time == "NO_EVENTS") isEmpty = true;
      if (isEmpty) {
        dispatch(
          updateEvents({
            [i]: ["There are no listed events today."]
          })
        );
      } else {
        //If we have events, we format them a bit and send them on
        if (resultstr[i].time != "")
          timedate = resultstr[i].date + " - " + resultstr[i].time;
        else timedate = resultstr[i].date;
        var title = "\n# " + resultstr[i].title; //Adds # for markdown title formatting
        var desc = resultstr[i].desc;
        var url = resultstr[i].URL;
        dispatch(
          updateEvents({
            [i]: [title, timedate, desc, url]
          })
        );
      }
    }
  } else {
    dispatch(
      updateEvents({
        //If connection fails
        [0]: ["Cannot reach server. The device is most likely offline."]
      })
    );
  }
}
