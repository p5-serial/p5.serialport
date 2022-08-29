// 2 serial port test. Put the Arduino analogReadSerial sketch
// on two Arduinos and connect them to your computer using 2
// USB ports. Note the port names and change firstPort and
// secondPort below to match. Then run this sketch. You should see
// data coming in from both ports independently.

// constant for example name
const exampleName = '09-twoPortRead';

// variable for background color of the p5.js canvas
let yellow;

// variable for text color
let black;

let serial1 = new p5.SerialPort();
let serial2 = new p5.SerialPort();

// variable por serialPortName
let serialPortName = '/dev/cu.usbmodem11201';

let firstPort = '/dev/cu.usbmodem14111';
let secondPort = '/dev/cu.usbmodem141431';
let input1 = '';
let input2 = '';

function setup() {
  // small canvas
  createCanvas(300, 300);

  // set yellow color for background
  yellow = color(255, 255, (255 * 2) / 8);

  // set black color for text
  black = color(0);

  // set text alignment
  textAlign(LEFT, CENTER);

  serial1.on('data', serialEvent);
  serial1.on('error', serialError);
  serial2.on('data', serial2Event);
  serial2.on('error', serial2Error);

  serial1.openPort(firstPort);
  serial2.openPort(secondPort);
}

function draw() {
  // paint background
  background(yellow);

  // set text color
  fill(black);

  // place example name on the top of the canvas
  text(exampleName, (5 * width) / 100, (5 * height) / 100);

  text('data from serial port 1:' + input1, 30, 30);
  text('data from serial port 2: ' + input2, 30, 90);
}

function serialEvent() {
  data = serial1.readStringUntil('\r\n');
  if (data.length > 0) {
    input1 = data;
  }
}

function serialError(err) {
  println('error with serial port 1: ' + err);
}

function serial2Event() {
  var data = serial2.readStringUntil('\r\n');
  if (data.length > 0) {
    input2 = data;
  }
}

function serial2Error(err) {
  println('error with serial port 2: ' + err);
}
