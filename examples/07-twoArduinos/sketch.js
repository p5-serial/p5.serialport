// Example of using multiple serial ports in one sketch.
// By Jiwon Shin

let exampleName = '07-twoArduinos';

// variable for background color of the p5.js canvas
let yellow;

// variable for text color
let black;

// Declare a SerialPort object
let serialOne, serialTwo;
let latestDataOne = 'waiting for data';
let latestDataTwo = 'waiting for data'; // you'll use this to write incoming data to the canvas

function setup() {
  // small canvas
  createCanvas(300, 300);

  // set yellow color for background
  yellow = color(255, 255, (255 * 2) / 8);

  // set black color for text
  black = color(0);

  // Instantiate our SerialPort object
  serialOne = new p5.SerialPort();
  serialTwo = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serialOne.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serialOne.openPort('/dev/tty.usbmodem14501');
  serialTwo.openPort('/dev/tty.usbmodem14101');

  // Here are the callbacks that you can register
  // When we connect to the underlying server
  serialOne.on('connected', serverConnected);
  serialTwo.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serialOne.on('list', gotList);

  // When we some data from the serial port
  serialOne.on('data', gotDataOne);
  serialTwo.on('data', gotDataTwo);

  // When or if we get an error
  serialOne.on('error', gotError);
  serialTwo.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serialOne.on('open', gotOpen);
  serialTwo.on('open', gotOpen);

  serialOne.on('close', gotClose);
  serialTwo.on('close', gotClose);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
}

function draw() {
  // paint background
  background(yellow);

  // set text color
  fill(black);

  // place example name on the top of the canvas
  text(exampleName, (5 * width) / 100, (5 * height) / 100);

  text(`From Arduino One: ${latestDataOne}`, 10, 10);
  text(`From Arduino Two: ${latestDataTwo}`, 10, 30);
  // Polling method
  /*
  if (serial.available() > 0) {
  let data = serial.read();
  ellipse(50,50,data,data);
}
*/
}

// We are connected and ready to go
function serverConnected() {
  print('Connected to Server');
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

// Connected to our serial device
function gotOpen() {
  print('Serial Port is Open');
}

function gotClose() {
  print('Serial Port is Closed');
  latestData = 'Serial Port is Closed';
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotDataOne() {
  let currentString = serialOne.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // print the string
  latestDataOne = currentString; // save it for the draw method
}

// There is data available to work with from the serial port
function gotDataTwo() {
  let currentString = serialTwo.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // print the string
  latestDataTwo = currentString; // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
  print('gotRawData' + thedata);
}
