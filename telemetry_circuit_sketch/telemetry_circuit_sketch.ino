#include "MPU9250.h"
#include <SoftwareSerial.h>
#include <TinyGPS.h>

MPU9250 mpu;
float quatX;      // hold quaternion values that will be changed to roll, pitch, and yaw
float quatY;
float quatZ;
float quatW;
float roll;       // hold roll pitch and yaw values
float pitch;
float yaw;
float temp;       // holds temperature
float latitude;   // hold GPS location data
float longitude;
unsigned long locationAge;
float altitude;

int RXPin = 2;
int TXPin = 3;

SoftwareSerial gpsSerial(RXPin, TXPin);

TinyGPS gps;

void setup() {
    // start serial usb connection
    Serial.begin(115200);
    // start i2c connection
    Wire.begin();
    // start gps serial connection
    gpsSerial.begin(9600);

    delay(2000);

    // configure I2C address for IMU
    mpu.setup(0x68);
    // toggle automatic cleaning up of data
    mpu.ahrs(true);
}

void loop() {
    // get orientation data from MPU
    if ((mpu.update()) && (gpsSerial.available() > 0)) {
      // get and calculate data from IMU
      quatX = mpu.getQuaternionX();
      quatY = mpu.getQuaternionY();
      quatZ = mpu.getQuaternionZ();
      quatW = mpu.getQuaternionW();
      quat2euler(quatX, quatY, quatZ, quatW, roll, pitch, yaw);

      // get and parse data from GPS
      gps.encode(gpsSerial.read());   // get NMEA sentence and parse it
      gps.f_get_position(&latitude, &longitude, &locationAge);  // get position data and data age
      altitude = gps.f_altitude();  // get altitude

      Serial.print(roll);
      Serial.print(",");
      Serial.print(pitch);
      Serial.print(",");
      Serial.print(yaw);
      Serial.print(",");
      Serial.print(latitude);
      Serial.print(",");
      Serial.print(longitude);
      Serial.print(",");
      Serial.println(altitude);
    }
}

void quat2euler(float q0, float q1, float q2, float q3, float &roll, float &pitch, float &yaw) {
    roll = atan2(2*(q0*q1 + q2*q3), 1 - 2*(q1*q1 + q2*q2));
    pitch = asin(2*(q0*q2 - q3*q1));
    yaw = atan2(2*(q0*q3 + q1*q2), 1 - 2*(q2*q2 + q3*q3));
}