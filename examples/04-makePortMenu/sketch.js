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

let menu;
let result = '';

function setup() {
  // small canvas
  createCanvas(300, 300);

  // set yellow color for background
  yellow = color(255, 255, (255 * 2) / 8);

  // set black color for text
  black = color(0);

  // set text alignment
  textAlign(LEFT, CENTER);

  serial = new p5.SerialPort();
  serial.list();
  serial.on('list', printList);
  serial.on('data', printData);
}

function draw() {
  // paint background
  background(yellow);

  // set text color
  fill(black);

  // place example name on the top of the canvas
  text(exampleName, (5 * width) / 100, (5 * height) / 100);

  text(result, 10, 60);
}

function openPort() {
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
  menu.changed(openPort);
  for (let i = 0; i < serialList.length; i++) {
    let thisOption = createElement('option', serialList[i]);
    thisOption.value = serialList[i];
    menu.child(thisOption);
    print(i + ' ' + serialList[i]);
  }
}
