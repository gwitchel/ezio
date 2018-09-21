import clock from "clock";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import * as ConfigFile from '../common/configFile';
import * as messaging from "messaging";
import { vibration } from "haptics";

const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
var colorGradient = ["#07378b","#0e3687","#153482","#1c337e","#233279","#293175","#303070","#372e6c","#3e2d67","#452c63","#4c2b5e","#532a5a","#5a2955","#612751","#68264c","#6e2548","#752443","#7c233f","#83213a","#8a2036"]


var hrm = new HeartRateSensor();


const NUM_OF_DEGREES = 360;
const NUM_OF_HOURS = 12;
const NUM_OF_MINUTES = 60;
const NUM_OF_SECONDS = 60;

const DEFAULT_COLOR = '#00BFFF';

// Fetch handles to UI elements
const arcSeconds = document.getElementById("arcSeconds");
const arcMinutes = document.getElementById("arcMinutes");
const arcHours = document.getElementById("arcHours");
const dayNumber = document.getElementById("dayNumber");
const dayName = document.getElementById("dayName");
const timeNum = document.getElementById("timeNum");

var currentClockColor = '#00BFFF'

// clock colors
let clockColor, clockTime;

// Initialize
init();
hrm.start();

// Update the clock every second
clock.granularity = "seconds";

hrm.onreading = () => {
  console.log(hrm.heartRate);
  currentClockColor = getColor(100, 130, hrm.heartRate);
}
// Update current time every second
clock.ontick = (evt) => {
  clockTime = evt.date;
  render(clockTime, clockColor);
}


function init() {
  clockTime = null;
  clockColor = DEFAULT_COLOR;
}

// Render clock face according to color and time
function render(time, color) {
  let hours = time.getHours() % 12;
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  
  let hoursOpacity = -0.4 + (hours/20);
  let minutesOpacity = -0.5 + (minutes/100);
  let secondsOpacity = -0.6 + (seconds/100);
  
  arcHours.sweepAngle = NUM_OF_DEGREES / NUM_OF_HOURS * (hours + minutes/NUM_OF_MINUTES);
  arcMinutes.sweepAngle = NUM_OF_DEGREES / NUM_OF_MINUTES * (minutes + seconds/NUM_OF_SECONDS);
  arcSeconds.sweepAngle = NUM_OF_DEGREES / NUM_OF_SECONDS * seconds;
  
  arcHours.style.fill = currentClockColor;
  arcMinutes.style.fill = currentClockColor;
  arcSeconds.style.fill = currentClockColor;
  
  dayNumber.text = zeroPad(time.getDate());
  dayName.text = days[time.getDay()];
  timeNum.text = hours + ":" + minutes;

}

function getColor(thresholdLow, thresholdHigh, HR){
  if(HR <= thresholdLow) return "#293890"; 
  if(HR >= thresholdHigh) return "#ba1f31"; 
  
  var scale = (thresholdHigh - thresholdLow); 
  console.log("scale:" + scale);
  var scaleFactor = 20/scale; 
  console.log("scalefac:" + scaleFactor);

  var color = colorGradient[Math.round((HR - thresholdLow) * scaleFactor)];
  //var color2 = colorGradient[Math.round(HR * scaleFactor + thresholdLow)];
  console.log();
  //color = rgbToHex(color);
  //color2 = rgbToHex(color2)
  return color; 
}

function rgbToHex(rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
};

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}