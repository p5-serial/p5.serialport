# p5.serialport

## About

p5.serialport is a [p5.js](https://p5js.org/) library that enables communication between your p5.js sketch and Arduino microcontroller (or another serial enabled device).

This repository is part of the p5-serial project, for more info please visit https://github.com/p5-serial/p5.serial.github.io/

## Installation

You don't need to install any dependencies!

The only prerrequisite for using with this library is first running a server using the companion library p5.serialserver, following the instructions on the repository [https://github.com/p5-serial/p5.serialserver](https://github.com/p5-serial/p5.serialserver).

## Use

After running the server, you can create a client using the p5.serialport library.

We recommend first trying the included [examples](https://github.com/p5-serial/p5.serialport/tree/main/examples) on this repository, which include live websites and Arduino code for testing the library.

Remember that you will likely have to change the name of the serial port in the examples to the one your serial device is using.

After you are familiarized with our examples, we suggest you use them as templates or basis of your own projects!

## Methods

```javascript
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
```

## Contributions

Info about contributing is available at the main repository of this organization: [https://github.com/p5-serial/p5.serial.github.io/](https://github.com/p5-serial/p5.serial.github.io/).
