// Serial read and animate example
// Reads an ASCII-encoded string from a seiral port via a webSocket server.
// Animates the text on the screen with the received value
// You can use this with the included Arduino example called AnalogReadSerial.
// Works with P5 editor as the socket/serial server, version 0.5.5 or later.
// written 2 Oct 2015
// by Tom Igoe

// constant for example name
const exampleName = '05-readAndAnimate';

// variable for background color of the p5.js canvas
let yellow;

// variable for text color
let black;

// variable for p5.SerialPort object
let serial;

// fill in the name of your serial port here:
let portName = '/dev/cu.usbmodem1411';
let textXpos = 10;

function setup() {
  // small canvas
  createCanvas(300, 300);

  // set yellow color for background
  yellow = color(255, 255, (255 * 2) / 8);

  // set black color for text
  black = color(0);

  // make an instance of the SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results. See gotList, below:
  serial.list();

  // Assuming our Arduino is connected,  open the connection to it
  serial.openPort(portName);

  // When you get a list of serial ports that are available
  serial.on('list', gotList);

  // When you some data from the serial port
  serial.on('data', gotData);
}

function draw() {
  // paint background
  background(yellow);

  // set text color
  fill(black);

  // set text alignment
  textAlign(LEFT, CENTER);

  // place example name on the top of the canvas
  text(exampleName, (5 * width) / 100, (5 * height) / 100);

  text('sensor value: ' + textXpos, textXpos, 30);
}

// Got the list of ports
function gotList(thelist) {
  print('List of Serial Ports:');
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + ' ' + thelist[i]);
  }
}

// Called when there is data available from the serial port
function gotData() {
  let currentString = serial.readLine(); // read the incoming data
  trim(currentString); // trim off trailing whitespace
  if (!currentString) return; // if the incoming string is empty, do no more
  console.log(currentString);
  if (!isNaN(currentString)) {
    // make sure the string is a number (i.e. NOT Not a Number (NaN))
    textXpos = currentString; // save the currentString to use for the text position in draw()
  }
}
