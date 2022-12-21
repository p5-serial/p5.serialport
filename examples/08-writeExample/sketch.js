// Serial write example
// Sends a byte to a webSocket server which sends the same byte
// out through a serial port.
// You can use this with the included Arduino example called PhysicalPixel.
// Works with P5 editor as the socket/serial server, version 0.5.5 or later.
// written 2 Oct 2015
// by Tom Igoe

// constant for example name
const exampleName = '08-writeExample';

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

// this is the message that will be sent to the Arduino:
let outMessage = 'H';

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

  // Get a list the ports available
  // You should have a callback defined to see the results. See gotList, below:
  serial.list();

  // Assuming our Arduino is connected,  open the connection to it
  serial.openPort(serialPortName);

  // When you get a list of serial ports that are available
  serial.on('list', gotList);

  // When you some data from the serial port
  serial.on('data', gotData);
}

// p5.js draw() runs after setup(), on a loop
function draw() {
  // paint background
  background(yellow);

  // set text color
  fill(black);

  // place example name on the top of the canvas
  text(exampleName, (5 * width) / 100, (5 * height) / 100);

  text('click to change the LED', 10, 10);
}

// callback function to update serial port name
function updatePort() {
  // retrieve serial port name from the text area
  serialPortName = htmlInputPortName.value();
  // open the serial port
  serial.openPort(serialPortName);
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

// When you click on the screen, the server sends H or L out the serial port
function mouseReleased() {
  serial.write(outMessage);
  if (outMessage === 'H') {
    outMessage = 'L';
  } else {
    outMessage = 'H';
  }
}
