// constant for example name
const exampleName = '02-echo';

// variable for background color of the p5.js canvas
let yellow;

// variable for text color
let black;

// variable for p5.SerialPort object
let serial;

let portName = '/dev/tty.usbmodem14501'; // fill in your serial port name here
let inData; // for incoming serial data

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

  serial.openPort(portName); // open a serial port
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
  text('incoming value: ' + inData, 30, 30);
}

function keyTyped() {
  let outByte = key;
  console.log('Sending ' + outByte);
  //serial.write(Number(outByte)); // Send as byte value
  serial.write(outByte); // Send as a string/char/ascii value
}

function serialEvent() {
  // read a byte from the serial port:
  let inByte = serial.read();
  print('inByte: ' + inByte);
  inData = inByte;
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
