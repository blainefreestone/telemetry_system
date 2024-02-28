#include <Wire.h>
#include <DS3231.h>

DS3231 realTimeClock;

void setup() {
  // start I2C communication
  Wire.begin();
}

void loop() {
  DateTime now = RTClib::now();

  Serial.print("Date/Time: ");
  Serial.print(now.hour()); Serial.print((" "));
  Serial.print(now.minute()); Serial.print((" "));
  Serial.print(now.hour());Serial.print((" "));
}
