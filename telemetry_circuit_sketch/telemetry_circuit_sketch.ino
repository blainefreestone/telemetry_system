#include "MPU9250.h"
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

MPU9250 mpu;
float quatX;                // hold quaternion values that will be changed to roll, pitch, and yaw
float quatY;
float quatZ;
float quatW;
float roll;                 // hold roll pitch and yaw values
float pitch;
float yaw;
float temp;                 // holds temperature
double latitude;             // hold GPS location data
double longitude;
unsigned long locationAge;
double altitude;
unsigned long lastUpdate = 0;
unsigned long updateInterval = 100; // Update every 100 ms
unsigned long currentMillis;
unsigned long firstPrintTime = 0;


int RXPin = 11;
int TXPin = 10;

SoftwareSerial gpsSerial(RXPin, TXPin);

TinyGPSPlus gps;

void setup() {
    // start serial 
    gpsSerial.begin(9600);
    // start serial usb connection
    Serial.begin(115200);
    // start i2c connection
    Wire.begin();
    // configure I2C address for IMU
    mpu.setup(0x68);
    // toggle automatic cleaning up of data
    mpu.ahrs(true);
}

void loop() {
  while (gpsSerial.available() > 0) {
    if (gps.encode(gpsSerial.read())) {
      // NMEA sentence has been receieved, ready to parse data and access data from other sensors
      latitude = gps.location.lat();
      longitude = gps.location.lng();
      altitude = gps.altitude.meters();

      // get the current time in seconds
      currentMillis = millis();

      // send time, latitude, longitude, and altitude via serial connection
      Serial.print(currentMillis);
      Serial.print(",");
      Serial.print(latitude, 6);
      Serial.print(",");
      Serial.print(longitude, 6);
      Serial.print(",");
      Serial.println(altitude, 6);
    }
  }
}

void quat2euler(float q0, float q1, float q2, float q3, float &roll, float &pitch, float &yaw) {
    roll = atan2(2*(q0*q1 + q2*q3), 1 - 2*(q1*q1 + q2*q2));
    pitch = asin(2*(q0*q2 - q3*q1));
    yaw = atan2(2*(q0*q3 + q1*q2), 1 - 2*(q2*q2 + q3*q3));
}