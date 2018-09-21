import document from "document";
import { HeartRateSensor } from "heart-rate";
import { vibration } from "haptics";
// Fetch UI elements we will need to change
var bolts = [document.getElementById("one"), document.getElementById("two"), document.getElementById("three"), document.getElementById("four")];

// Create a new instance of the Barometer
var hrm = new HeartRateSensor();

// Update the lavel with each reading from the sensor
hrm.onreading = () => {
  var b = getBoltsLit(50, 200,hrm.heartRate);
  for(var i = 0; i < b; i++){
    bolts[i].href = "images/full.png"
  }
    for(var i = b; i < bolts.length; i++){
    bolts[i].href = "images/empty.png"
  }
  
  if(b >= 4) vibration.start("ring"); 
}


// Begin monitoring the sensor
hrm.start();

function getBoltsLit(thresholdLow, thresholdHigh, HR){
  var scale = (thresholdHigh - thresholdLow)/4; 
  if(HR <= thresholdLow) return 0; 
  var boltsLit = Math.floor((HR-thresholdLow) /scale); 
  if(boltsLit < 4)   return boltsLit;
  return 4; 
}
