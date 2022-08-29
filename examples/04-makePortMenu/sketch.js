// Serial list ports
// Lists serial ports in an options menu. When you choose one, opens the port
// and displays any incoming strings as text onscreen.
// Works with p5 editor as the serial server, version 0.5.5 or later.
// created 2 Oct 2015
// by Tom Igoe

let exampleName = '04-makePortMenu';

// variable for background color of the p5.js canvas
let yellow;

let serial; // Declare a "SerialPort" object
let menu;
let result = '';

function setup() {
  // small canvas
  createCanvas(300, 300);

  // set yellow color for background
  yellow = color(255, 255, (255 * 2) / 8);

  serial = new p5.SerialPort();
  serial.list();
  serial.on('list', printList);
  serial.on('data', printData);
}

function draw() {
  // paint background
  background(yellow);
  fill(0);
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
