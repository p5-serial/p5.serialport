// Example of using multiple serial ports
// in one sketch using arrays.
// By Jiwon Shin

// constant for example name
const exampleName = '07-twoArduinosArray';

// variable for background color of the p5.js canvas
let yellow;

// variable for text color
let black;

// variable por serialPortName
let serialPortName = '/dev/cu.usbmodem11201';

// variable for HTML DOM input for serial port name
let htmlInputPortName;

// variable for HTML DOM button for entering new serial port name
let htmlButtonPortName;

// Change these to the name of your arduinos' serial ports
let serialPorts = [
  '/dev/tty.usbmodem14501',
  '/dev/tty.usbmodem14101',
];
let serials = [];
let data = [];

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

// p5.js draw() runs after setup(), on a loop
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

// callback function to update serial port name
function updatePort() {
  // retrieve serial port name from the text area
  serialPortName = htmlInputPortName.value();
  // open the serial port
  serial.openPort(serialPortName);
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
