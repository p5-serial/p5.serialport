let exampleName = '01-basics';

// declare a variable for p5.SerialPort object
let serial;

// change this to the name of your Arduino's serial port
let namePort = '/dev/cu.usbmodem11201';

// declare variable for latest data
let latestData = 'waiting for data';

let yellow;

function setup() {
  // small canvas
  createCanvas(500, 500);

  input = createInput(namePort);
  button = createButton('update port');
  button.mousePressed(updatePort);

  textAlign(CENTER, CENTER);

  yellow = color(255, 255, 0);

  // instantiate the SerialPort object
  serial = new p5.SerialPort();

  // get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.openPort(namePort);

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

function draw() {
  background(yellow);
  text(exampleName, width / 2, height / 10);
  print('test');
  // fill(0, 0, 0);
  // text(latestData, 10, 10);
  // Polling method
  /*
  if (serial.available() > 0) {
  let data = serial.read();
  ellipse(50,50,data,data);
}
*/
}

function updatePort() {
  namePort = input.value();
}
