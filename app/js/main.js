var Readable = require('stream').Readable  
var util = require('util')  
var five = require('johnny-five')

util.inherits(MyStream, Readable)  
function MyStream(opt) {  
  Readable.call(this, opt)
}
MyStream.prototype._read = function() {};  
// hook in our stream
process.__defineGetter__('stdin', function() {  
  if (process.__stdin) return process.__stdin
  process.__stdin = new MyStream()
  return process.__stdin
})

var board = new five.Board();
var valueDiv = document.querySelector("#plantValue");

function createRemap(inMin, inMax, outMin, outMax) { 
	return function remaper(x) { 
		return Math.round((x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin); 
	}; 
}

board.on("ready", function() {
	var sensor = new five.Sensor({
		pin: "A0",
		freq: 250, //Emit data every 250 ms
		threshold: 2
	});

	sensor.on("change", function() {
		var sensorInfo = this.value;
		var sensorTest = createRemap(200, 1023, 100, 0);
		valueDiv.innerHTML = sensorTest(sensorInfo);
	});
});