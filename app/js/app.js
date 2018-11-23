
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
  
  var board = new five.Board();
  var humidityDiv = document.querySelector("#humidValue");
  var lightDiv = document.querySelector("#lightValue");
  var tempDiv = document.querySelector("#tempValue");
  
  function createRemap(inMin, inMax, outMin, outMax) { 
    return function remaper(x) { 
      return Math.round((x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin); 
    }; 
  }
  
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
      tempDiv.innerHTML = this.celsius;
    });
  
    var humid = new five.Sensor({
      pin: "A1",
      freq: 500
    });
  
    humid.on("change", function() {
          var sensorInfo = this.value;
          var remap = createRemap(200, 1023, 100, 0);
          humidityDiv.innerHTML = remap(sensorInfo);
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
          var remap = createRemap(0, 1023, 100000, 0);
          lightDiv.innerHTML = remap(sensorInfo);
    });
  });
  
  //0 - 1023