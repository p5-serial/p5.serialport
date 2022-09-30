// constant for example name
const exampleName = '01-basics';

// variable for background color of the p5.js canvas
let yellow;

// variable for text color
let black;

// variables for fill colors of ellipse
let cyan;
let magenta;

// variable for p5.SerialPort object
let serial;

// variable for latest incoming data
let latestData = 'waiting for incoming data';

// variable por serialPortName
let serialPortName = '/dev/cu.usbmodem2101';

// variable for HTML DOM input for serial port name
let htmlInputPortName;

// variable for HTML DOM button for entering new serial port name
let htmlButtonPortName;

let incomingData = -1;

// p5.js setup() runs once, at the beginning
function setup() {
  // small canvas
  createCanvas(300, 300);

  // set yellow color for background
  yellow = color(255, 255, (255 * 2) / 8);

  // set black color for text
  black = color(0);

  // set cyan and magenta colors for fill
  cyan = color(0, 255, 255);
  magenta = color(255, 0, 255);

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

  // get a list the ports available
  // you should have a callback defined to see the results
  serial.list();

  // here are the callbacks that you can register

  // when we connect to the underlying server
  serial.on('connected', gotServerConnection);

  // when we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);

  serial.on('close', gotClose);

  // Callback to get the raw data, as it comes in for handling yourself
  serial.on('rawdata', gotRawData);
}

// p5.js draw() runs after setup(), on a loop
function draw() {
  // paint background
  background(yellow);

  // set text color
  fill(black);

  // place example name on the top of the canvas
  text(exampleName, (5 * width) / 100, (5 * height) / 100);

  // if incoming data is 0 fill with cyan
  if (incomingData === 0) {
    fill(cyan);
  }
  // or if incoming data is 1 fill with magenta
  else if (incomingData === 1) {
    fill(magenta);
  }
  ellipse(width / 2, height / 2, 100, 100);
}

// callback function to update serial port name
function updatePort() {
  // retrieve serial port name from the text area
  serialPortName = htmlInputPortName.value();
  // open the serial port
  serial.openPort(serialPortName);
}

// We are connected and ready to go
function gotServerConnection() {
  print('connected to server');
}

// Got the list of ports
function gotList(list) {
  print('list of serial ports:');
  // list is an array of their names
  for (let i = 0; i < list.length; i++) {
    print(list[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print('serial port is open');
}

function gotClose() {
  print('serial port is closed');
  latestData = 'serial port is closed';
}

// Ut oh, here is an error, let's log it
function gotError(e) {
  print(e);
}

// there is data available to work with from the serial port
function gotData() {
  // read the incoming string
  let currentString = serial.readLine();
  // remove any trailing whitespace
  trim(currentString);
  // if the string is empty, do no more
  if (!currentString) {
    return;
  }
  // print the string
  console.log(currentString);
  // save it for the draw method
  latestData = currentString;
}

// we got raw from the serial port
function gotRawData(data) {
  print('gotRawData: ' + data);
  incomingData = data;
}
