/***
Goodnight Kiss
==============

A simple two action interface that sends keystrokes to a custom p5 sketch.

Author: epylinkn
***/

#include "Keyboard.h"
#include <CapacitiveSensor.h>
#include <Bounce2.h>


bool playing = false;

int LIPS_PIN = 30;
int threshold = 5000;

int BUTTON_PIN = 0;
Bounce resetButton = Bounce();


void setup() {
  Serial.begin(9600);
  Keyboard.begin();

  resetButton.attach(BUTTON_PIN, INPUT_PULLUP);
  resetButton.interval(25);
}

void loop () {
  long ms = millis();
  resetButton.update();
  long touchReading = touchRead(LIPS_PIN);


  if ( resetButton.fell() ) {
    Keyboard.write('A');
  }

  if ( touchReading > threshold) {
    Keyboard.write('S');
    delay(20);
  }

  Serial.println(touchReading);
}
