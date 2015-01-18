var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port
//var gpio_pins = tessel.port['GPIO'].pin;//Shortcut to reach tessel pins
var myPin = gpio.digital[0]; // on GPIO, can be gpio.digital[0] through 5 or gpio.pin['G3'] through ‘G6’
// Turn on the pin
var pin = gpio.pwm[0]; // G4 this port holds the PWM
var count = 4,i=0,baseNoise=0,k;
var resonantCheck = [];
var soundInputPin = gpio.pin['A2'];//assign the A2 pin to a variable
gpio.pwmFrequency(10000);    // set the PWM frequncy to 10kHz
var pinState = soundInputPin.read();

setInterval(function () {
  pin.pwmDutyCycle(++count%50/50);  // 50 steps from zero to 1 
  //console.log(count%50/50);
  //console.log(pinState);
  pinState = soundInputPin.read();
  if( (count%50/50) < .5){ //there is no vibration at this point
  	baseNoise += pinState;
  	k = 1;	
  } else if(k = 1){
  	baseNoise = baseNoise/25;
  }
  if( (count%50/50) >= .5){
  	i++;
	resonantCheck[i] = pinState - baseNoise;
	console.log(resonantCheck[i]);
  }
}, 500);
//while(1){
//	pin.output(1); // setting ‘true’ has the same effect
//}
