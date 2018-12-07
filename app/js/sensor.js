var Readable = require('stream').Readable;
var util = require('util');
var five = require('johnny-five');

util.inherits(MyStream, Readable);
  
function MyStream(opt) {  
  Readable.call(this, opt);
}
  
MyStream.prototype._read = function() {};  
  
// hook in our stream
process.__defineGetter__('stdin', function() {  
  if (process.__stdin) return process.__stdin
    process.__stdin = new MyStream();
    return process.__stdin;
})


//ARDUINO VARAIBLES----------------
var board = new five.Board();


var humid;
var sun;
var temp;
var humidityDiv;
var lightDiv;
var tempDiv;

//LABEL VARIABLES-------------------
var humidityLabel;
var tempLabel;
var lightLabel;
//---------------------------------

if(window.location.href.indexOf("index") > -1 && window.innerWidth <= 600) {
  humid = document.querySelector("#humidBasic");
  sun = document.querySelector("#sunBasic");
  temp = document.querySelector("#tempBasic");
  humidityDiv = humid.querySelector("h3");
  lightDiv = sun.querySelector("h3");
  tempDiv = temp.querySelector("h3");
  
  //LABEL VARIABLES-------------------
  humidityLabel = humid.querySelector("h4");
  tempLabel = temp.querySelector("h4");
  lightLabel = sun.querySelector("h4");
} else {
  humid = document.querySelector("#humid");
  sun = document.querySelector("#sun");
  temp = document.querySelector("#temp");
  humidityDiv = humid.querySelector(".sensorData h3");
  lightDiv = sun.querySelector(".sensorData");
  tempDiv = temp.querySelector(".sensorData");

  //LABEL VARIABLES-------------------
  humidityLabel = humid.querySelector(".sensorLabel");
  tempLabel = temp.querySelector(".sensorLabel");
  lightLabel = sun.querySelector(".sensorLabel");
}
//--------------------------------

 
function createRemap(inMin, inMax, outMin, outMax) { 
  return function remaper(x) { 
    return Math.round((x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin); 
  }; 
}

//CHARTS JS GLOBAL VARIABLES-------------------
var myHumidityChart = document.getElementById('myHumidityChart').getContext('2d');
// Global options
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = '#777';
//-------


  
board.on("ready", function() {
    
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 500
  });
  
  //TEMP CONDITIONALS FOR LABELS
  temperature.on("change", function() {
    tempDiv.innerHTML = this.celsius + "°"; 
    var value = this.celsius;
    if (value >= 30) {
    	tempDiv.style.borderColor = "#B21C05";
      tempLabel.innerHTML = "HIGH";
    } else if(value > 5) {
      tempDiv.style.borderColor = "#BEDA71";
      tempLabel.innerHTML = "GOOD";
    } else {
      tempDiv.style.borderColor = "#01DAF3";
      tempLabel.innerHTML = "LOW";
    }
  });
  //-----------------------------
  
  var humid = new five.Sensor({
    pin: "A1",
    freq: 500
  });
  
  humid.on("change", function() {
    var sensorInfo = this.value;
    var remap = createRemap(200, 1023, 100, 0);
    humidityDiv.innerHTML = remap(sensorInfo) + "%"; //Testing puposes
    var value = remap(sensorInfo);

    //HUMIDITY CONDITIONALS FOR LABELS
    if (value >= 90) {
      humidityLabel.innerHTML = "HIGH";
    } else if(value > 15) {
      humidityLabel.innerHTML = "GOOD";
    } else {
      humidityLabel.innerHTML = "LOW";
    }
    //--------------------------------

    var massPopChart = new Chart(myHumidityChart, {
      type:'doughnut',
        data:{
          labels:['Humidity'],
          datasets:[{
            
            data: [value,100- value],
            backgroundColor:['#00e6ff'],
            hoverBorderWidth:3,
            hoverBorderColor: '#000',
            borderWidth:[1,0]
          }]
          },
          options:{
            
            legend:{
              display: false
            },
            layout:{
              padding:{
                left:0,
                right:0,
                bottom:0,
                top:50
              }
            },
            tooltips:{
              enable: false
            },

            animation: {
              animationScale: false
            },

            cutoutPercentage:80
          }

        });
    });
  
    // Create a new `photoresistor` hardware instance.
    var photoresistor = new five.Sensor({
      pin: "A2",
      freq: 500
    });

    // Inject the `sensor` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
      pot: photoresistor
    });
    
    photoresistor.on("change", function() {
      var sensorInfo = this.value;
      var remap = createRemap(0, 1023, 100, 0);
      lightDiv.innerHTML = remap(sensorInfo) + "<span> lm</span>";
      value = 98;

      //LIGHT CONDITIONALS FOR LABELS
      if (value >= 95) {
        lightLabel.innerHTML = "HIGH";
      } else if(value > 40) {
        lightLabel.innerHTML = "GOOD";
      } else {
        lightLabel.innerHTML = "LOW";
      }
      //--------------------------------

    });
  });
  
  //0 - 1023