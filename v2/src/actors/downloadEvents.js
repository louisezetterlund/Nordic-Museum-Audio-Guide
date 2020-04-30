import { updateEvents } from "../actions/device";
require("../containers/cal_get_promise.js")();

class DownloadEventsActor {
  constructor(store) {
    this._store = store;
    this._dispatch = store.dispatch;

    // const tenMins = 1000 * 60 * 10;
    const tenMins = 1000;
    var count = 0;

    setInterval(async () => {
      const currentTime = new Date();
      const currentTimeStr = await currentTime.toISOString();
      ++count;

      /*       fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'GET',
      //Request Type
        })
          .then(response => response.json())
          //If response is in json then in success
          .then(responseJson => {
            //Success
            alert(JSON.stringify(responseJson));
            console.log(responseJson);
          })
          //If response is not in json then in error
          .catch(error => {
            //Error
            alert(JSON.stringify(error));
            console.error(error);
          });
      }
 */
      resultstr = await getCalStr(false, true);

      this._dispatch(
        updateEvents({
          //Download and store the current dates events
          //as an array of strings

          ["test"]: ["football", resultstr[0]["date"]]
        })
      );
    }, tenMins);
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
