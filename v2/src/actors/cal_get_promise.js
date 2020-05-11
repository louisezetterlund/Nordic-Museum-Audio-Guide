//Calendar functionality.
//Added by KTH project 2020

//Parses ics
function processResult(lines, dayOnly) {
  var today = new Date();
  var date_now_f =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  var veventFound = false;
  var found_min_one = false;
  var events = []; /*initalize JS object */
  var events_i = 0; /*COUNTER */

  for (i = 0; i < lines.length; i++) {
    //Finds beginning of vevent.
    if (lines[i].includes("BEGIN:VEVENT")) {
      veventFound = true;
      events[events_i] = { date: "", time: "", title: "", desc: "", URL: "" };
    }

    if (lines[i].includes("DTSTART") && veventFound) {
      var date_raw = lines[i].split(":");
      var date_tot = date_raw[1].replace("\r", "").split("T");
      var date_f =
        date_tot[0].slice(0, 4) +
        "-" +
        date_tot[0].slice(4, 6) +
        "-" +
        date_tot[0].slice(6, 8);

      events[events_i]["date"] = date_f;

      if (lines[i].length == 46) {
        var time_f = date_tot[1].slice(0, 2) + ":" + date_tot[1].slice(2, 4);
        events[events_i]["time"] = time_f;
      }
    } else if (lines[i].includes("SUMMARY") && veventFound) {
      var title = lines[i].split(":");
      events[events_i]["title"] = title[1].replace("\r", "");
    } else if (lines[i].includes("DESCRIPTION") && veventFound) {
      var desc = lines[i].split("DESCRIPTION:");
      events[events_i]["desc"] = desc[1];
    } else if (lines[i].includes("URL;TYPE=URI") && veventFound) {
      var URL = lines[i].split("URL;TYPE=URI:");
      events[events_i]["URL"] = URL[1].replace("\r", "");
    } else if (lines[i].includes("END:VEVENT") && veventFound) {
      if (dayOnly && events[events_i]["date"] != date_now_f) {
        veventFound = false;
      } else {
        events_i++;
        veventFound = false;
        if (found_min_one == false) found_min_one = true;
      }
    }
  }

  if (found_min_one) {
    var final = events;
  } else {
    var final = [{ date: "", time: "NO_EVENTS", title: "", desc: "", URL: "" }];
  }

  return final;
}

export const getCalStr = function(debugMode, dayOnly, broken) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    url = debugMode
      ? "https://www.calendarlabs.com/ical-calendar/ics/71/Sweden_Holidays.ics" // Dummy URL
      : "https://www.nordiskamuseet.se/calendar/ical/ical/calendar-nordiska-museet.ics"; // Museum URL

    if (broken) url = "This is not a proper URL";

    request.open("GET", url, true);
    request.send(null);

    request.onreadystatechange = function() {
      //checks if response is ready. Takes time.
      setTimeout(function() {
        reject("TEST ERROR"), 1000;
      });

      if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader("Content-Type");

        if (type.indexOf("text") !== 1) {
          var to_split = request.responseText;
          var lines = to_split.split("\n");
          lines.forEach(element => element.replace("\n", "\\n"));
          //this is where we process the data given by request.
          final = processResult(lines, dayOnly);
          resolve(final);
          // END OF: if (type.indexOf("text") !== 1)
        }
        // END OF: if (request.readyState === 4 && request.status === 200)
      } else console.log("got after response ready");
    };
  });
};
