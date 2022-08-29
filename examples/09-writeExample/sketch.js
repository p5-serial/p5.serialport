// Serial write example
// Sends a byte to a webSocket server which sends the same byte
// out through a serial port.
// You can use this with the included Arduino example called PhysicalPixel.
// Works with P5 editor as the socket/serial server, version 0.5.5 or later.
// written 2 Oct 2015
// by Tom Igoe

// constant for example name
const exampleName = '09-writeExample';

// variable for background color of the p5.js canvas
let yellow;

// variable for text color
let black;

// variable for p5.SerialPort object
let serial;

// variable por serialPortName
let serialPortName = '/dev/cu.usbmodem11201';

// this is the message that will be sent to the Arduino:
let outMessage = 'H';

function setup() {
  // small canvas
  createCanvas(300, 300);

  // set yellow color for background
  yellow = color(255, 255, (255 * 2) / 8);

  // set black color for text
  black = color(0);

  // set text alignment
  textAlign(LEFT, CENTER);

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

// Got the list of ports
function gotList(thelist) {
  console.log('List of Serial Ports:');
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + ' ' + thelist[i]);
  }
}

// Called when there is data available from the serial port
function gotData() {
  let currentString = serial.readLine();
  console.log(currentString);
}

function draw() {
  // paint background
  background(yellow);

  // set text color
  fill(black);

  // place example name on the top of the canvas
  text(exampleName, (5 * width) / 100, (5 * height) / 100);

  text('click to change the LED', 10, 10);
}

// When you click on the screen, the server sends H or L out the serial port
function mouseReleased() {
  serial.write(outMessage);
  if (outMessage === 'H') {
    outMessage = 'L';
  } else {
    outMessage = 'H';
  }
}
