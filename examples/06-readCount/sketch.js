//  Test this with the Arduino sketch echo.ino, in the p5.serialport
// examples/echo directory.
// Try at varying baudrates, up to 115200 (make sure to change
// Arduino to matching baud rate)

let exampleName = '06-readCount';

// variable for background color of the p5.js canvas
let yellow;

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem141431'; // fill in your serial port name here
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

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors

  serial.openPort(portName, options); // open a serial port
  serial.clear();
}

function draw() {
  // paint background
  background(yellow);
  fill(255);
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
