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

// variable for HTML DOM input for serial port name
let htmlInputPortName;

// variable for HTML DOM button for entering new serial port name
let htmlButtonPortName;

let inData; // for incoming serial data
let inByte;
let byteCount = 0;
let output = 0;
let options = {
  baudRate: 9600,
};

// p5.js setup() runs once, at the beginning
function setup() {
  // small canvas
  createCanvas(300, 300);

  // set yellow color for background
  yellow = color(255, 255, (255 * 2) / 8);

  // set black color for text
  black = color(0);

  // set text alignment
  textAlign(LEFT, CENTER);

  // p5.js to create HTML input and set initial value
  htmlInputPortName = createInput(serialPortName);

  // p5.js to create HTML button and set message
  button = createButton('update port');

  // p5.js to add callback function for mouse press
  button.mousePressed(updatePort);

  // create instance of p5.SerialPort
  serial = new p5.SerialPort();

  // print version of p5.serialport library
  console.log('p5.serialport.js ' + serial.version);

  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors

  serial.openPort(serialPortName, options); // open a serial port
  serial.clear();
}

// p5.js draw() runs after setup(), on a loop
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

// callback function to update serial port name
function updatePort() {
  // retrieve serial port name from the text area
  serialPortName = htmlInputPortName.value();
  // open the serial port
  serial.openPort(serialPortName);
}

function serialEvent() {
  // read a byte from the serial port:
  inByte = int(serial.read());
  byteCount++;
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
