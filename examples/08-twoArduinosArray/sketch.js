// Example of using multiple serial ports
// in one sketch using arrays.
// By Jiwon Shin

// constant for example name
const exampleName = '08-twoArduinosArray';

// variable for background color of the p5.js canvas
let yellow;

// variable for text color
let black;

// Change these to the name of your arduinos' serial ports
let serialPorts = [
  '/dev/tty.usbmodem14501',
  '/dev/tty.usbmodem14101',
];
let serials = [];
let data = [];

function setup() {
  // small canvas
  createCanvas(300, 300);

  // set yellow color for background
  yellow = color(255, 255, (255 * 2) / 8);

  // set black color for text
  black = color(0);

  // set text alignment
  textAlign(LEFT, CENTER);

  for (let i = 0; i < serialPorts.length; i++) {
    // Instantiate our SerialPort object
    let newPort = new p5.SerialPort();
    // Assuming our Arduino is connected, let's open the connection to it
    newPort.openPort(serialPorts[i]);

    newPort.on('connected', serverConnected);
    newPort.on('list', gotList);
    //bind array index to the gotData callback function
    newPort.on('data', gotData.bind(this, i));
    newPort.on('error', gotError);
    newPort.on('open', gotOpen);
    newPort.on('gotClose', gotClose);

    serials.push(newPort);
  }

  // Get a list the ports available
  // You should have a callback defined to see the results
  serials[0].list();
}

function draw() {
  // paint background
  background(yellow);

  // set text color
  fill(black);

  // place example name on the top of the canvas
  text(exampleName, (5 * width) / 100, (5 * height) / 100);

  text(`From Arduino One: ${data[0]}`, 10, 10);
  text(`From Arduino Two: ${data[1]}`, 10, 30);
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
function gotData(index) {
  let currentString = serials[index].readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // print the string
  data[index] = currentString; // save it for the draw method
}
