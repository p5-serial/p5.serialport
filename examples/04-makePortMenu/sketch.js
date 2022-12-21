// Serial list ports
// Lists serial ports in an options menu. When you choose one, opens the port
// and displays any incoming strings as text onscreen.
// Works with p5 editor as the serial server, version 0.5.5 or later.
// created 2 Oct 2015
// by Tom Igoe

// constant for example name
const exampleName = '04-makePortMenu';

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

let menu;
let result = '';

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

  serial.list();
  serial.on('list', printList);
  serial.on('data', printData);
}

// p5.js draw() runs after setup(), on a loop
function draw() {
  // paint background
  background(yellow);

  // set text color
  fill(black);

  // place example name on the top of the canvas
  text(exampleName, (5 * width) / 100, (5 * height) / 100);

  text(result, 10, 60);
}

// callback function to update serial port name
function updatePort() {
  // retrieve serial port name from the text area
  serialPortName = htmlInputPortName.value();
  // open the serial port
  serial.openPort(serialPortName);
}

function menuOpenPort() {
  portName = menu.elt.value;
  serial.openPort(portName);
}

function printData() {
  let inString = serial.readStringUntil('\r\n');
  trim(inString);
  if (!inString) return;
  result = inString;
}

// Got the list of ports
function printList(serialList) {
  menu = createSelect();
  let title = createElement('option', 'Choose a port:');
  menu.child(title);
  menu.position(10, 10);
  menu.changed(menuOpenPort);
  for (let i = 0; i < serialList.length; i++) {
    let thisOption = createElement('option', serialList[i]);
    thisOption.value = serialList[i];
    menu.child(thisOption);
    print(i + ' ' + serialList[i]);
  }
}
