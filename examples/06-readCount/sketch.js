//  Test this with the Arduino sketch echo.ino, in the p5.serialport
// examples/echo directory.
// Try at varying baudrates, up to 115200 (make sure to change
// Arduino to matching baud rate)

// constant for example name
const exampleName = '06-readCount';

// variable for background color of the p5.js canvas
let yellow;

// variable for text color
let black;

// variable for p5.SerialPort object
let serial;

// variable por serialPortName
let serialPortName = '/dev/cu.usbmodem11201';

let inData; // for incoming serial data
let inByte;
let byteCount = 0;
let output = 0;
let options = {
  baudRate: 9600,
};

function setup() {
  // small canvas
  createCanvas(300, 300);

  // set yellow color for background
  yellow = color(255, 255, (255 * 2) / 8);

  // set black color for text
  black = color(0);

  // set text alignment
  textAlign(LEFT, CENTER);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors

  serial.openPort(portName, options); // open a serial port
  serial.clear();
}

function draw() {
  // paint background
  background(yellow);

  // set text color
  fill(black);

  // place example name on the top of the canvas
  text(exampleName, (5 * width) / 100, (5 * height) / 100);

  // display the incoming serial data as a string:
  let displayString =
    'inByte: ' + inByte + '\t Byte count: ' + byteCount;
  displayString += '  available: ' + serial.available();
  text(displayString, 30, 60);
}

function serialEvent() {
  // read a byte from the serial port:
  inByte = int(serial.read());
  byteCount++;
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
