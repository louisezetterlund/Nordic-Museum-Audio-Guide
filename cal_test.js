var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://www.nordiskamuseet.se/calendar/ical/ical/calendar-nordiska-museet.ics",
      true
    );
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader("Content-Type");
        if (type.indexOf("text") !== 1) {
          var lines = request.responseText.split("\n");
          var events = {}; /*initalize DICTIONARY */
          var events_i = 0; /*COUNTER */
          for (i = 0; i < lines.length; i++) {
            if (lines[i].includes('DTSTART')) {
              var date_time = lines[i].split(":");
              var date_time = date_time[1].replace('\r','').split("T")
              var date_f = date_time[0].slice(0,4) + '-' + date_time[0].slice(4,6) + '-' + date_time[0].slice(6,8);
              var time_f = date_time[1].slice(0,2) + ':' + date_time[1].slice(2,4);
              events[events_i] = {date: date_f, time: time_f};
              //events[events_i] = {};
            }
            else if (lines[i].includes('SUMMARY')) {
              var title = lines[i].split(":");
              events[events_i]["title"] = title[1].replace('\r','');
            }
            else if (lines[i].includes('DESCRIPTION')) {
              var desc = lines[i].split(":");
              events[events_i]["desc"] = desc[1].replace('\r','');
            }
            else if (lines[i].includes('URL;TYPE=URI')) {
              var URL = lines[i].split("URL;TYPE=URI:");
              events[events_i]["URL"] = URL[1].replace('\r','');
            }
            else if (lines[i].includes('END:VEVENT')) {
              events_i++;
            }
          }
          console.log(events);
        }
      }
    };