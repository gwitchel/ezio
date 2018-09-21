import clock from "clock";
import document from "document";
import clock from "clock";

clock.granularity = "minutes"; // seconds, minutes, hours

let myClock = document.getElementById("myClock");

clock.ontick = function(evt) {
  // Output the date object
  console.log(evt.date.toString());
    myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                      ("0" + evt.date.getMinutes()).slice(-2);
};

