
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
var humidityDiv = document.querySelector("#humidValue");
var lightDiv = document.querySelector("#lightValue");
var tempDiv = document.querySelector("#tempValue");
//---------------------------------

//STYLE VARIABLES-----------------
var tempCircle = document.querySelector("#tempCircle");
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
  
  tempDiv.innerHTML = "numbers";
  lightDiv.innerHTML = "numbers";
  humidityDiv.innerHTML = "numbers";
    
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 500
  });
  
  temperature.on("change", function() {
    tempDiv.innerHTML = this.celsius; //Testing purposes
    var value = 15; //0sting purposes
    console.log("WORKS");
    console.log(tempCircle);
    if (value >= 30) {
      tempCircle.style.borderColor = "#B21C05";
    } else if(value <= 5) {
      tempCircle.style.borderColor = "#01DAF3";
    } 
  });
  
  var humid = new five.Sensor({
    pin: "A1",
    freq: 500
  });
  
  humid.on("change", function() {
    var sensorInfo = this.value;
    var remap = createRemap(200, 1023, 100, 0);
    humidityDiv.innerHTML = remap(sensorInfo); //Testing puposes
    var value = remap(sensorInfo);
    var massPopChart = new Chart(myHumidityChart, {
      type:'doughnut',
        data:{
          labels:['Humidity'],
          datasets:[{
            label: 'Humidity',
            data: [value,100- value],
            backgroundColor:['#00e6ff'],
            hoverBorderWidth:3,
            hoverBorderColor: '#000',
            borderWidth:[1,0]
          }]
          },
          options:{
            title: {
              display: true,
              text: 'Humidity',
              fontSize: 25
            },
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
          lightDiv.innerHTML = remap(sensorInfo);
    });
  });
  
  //0 - 1023