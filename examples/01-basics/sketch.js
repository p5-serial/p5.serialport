// TODO: example header

// constant for example name
const exampleName = '01-basics';

// variable for background color of the p5.js canvas
let yellow;

// variable for text color
let black;

// variable for p5.SerialPort object
let serial;

// variable for latest incoming data
let latestData = 'waiting for incoming data';

// variable por serialPortName
let serialPortName = '/dev/cu.usbmodem11201';

// variable for HTML DOM input for serial port name
let htmlInputPortName;

// variable for HTML DOM button for entering new serial port name
let htmlButtonPortName;

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

  // instantiate the SerialPort object
  serial = new p5.SerialPort();

  // get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.openPort(serialPortName);

  // Here are the callbacks that you can register
  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);

  serial.on('close', gotClose);

  // Callback to get the raw data, as it comes in for handling yourself
  // serial.on('rawdata', gotRawData);
}

function draw() {
  // paint background
  background(yellow);

  // set text color
  fill(black);

  // place example name on the top of the canvas
  text(exampleName, (5 * width) / 100, (5 * height) / 100);

  // text(latestData, 10, 10);
  // Polling method
  /*
  if (serial.available() > 0) {
  let data = serial.read();
  ellipse(50,50,data,data);
}
*/
}

// callback function to update serial port name
function updatePort() {
  serialPortName = htmlInputPortName.value();
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
function gotData() {
  // read the incoming string
  let currentString = serial.readLine();
  // remove any trailing whitespace
  trim(currentString);
  // if the string is empty, do no more
  if (!currentString) return;
  // print the string
  console.log(currentString);
  // save it for the draw method
  latestData = currentString;
}

// We got raw from the serial port
function gotRawData(thedata) {
  print('gotRawData' + thedata);
}
