#include "MPU9250.h"
#include "MS5611.h"

MPU9250 mpu;
MS5611 MS5611(0x77);
float quatX;
float quatY;
float quatZ;
float quatW;
float pressure;
float temp;

void setup() {
    Serial.begin(115200);
    Wire.begin();
    delay(2000);

    // configure I2C address for IMU
    mpu.setup(0x68);
    // toggle automatic cleaning up of data
    mpu.ahrs(true);

    // MS5611.init();
    // configure pressure sensor
    if (MS5611.begin()) {
      Serial.print("MS5611 Found");
    }
    else {
      Serial.print("Not found");
    }
    delay(5000);

    MS5611.reset(1);
    // set sampling rate to ultra low for highest accuracy
    MS5611.setOversampling(OSR_ULTRA_LOW);
}

void loop() {
    // get orientation data from MPU
    if (mpu.update()) {
        quatX = mpu.getQuaternionX();
        quatY = mpu.getQuaternionY();
        quatZ = mpu.getQuaternionZ();
        quatW = mpu.getQuaternionW();
        quat2euler(quatX, quatY, quatZ, quatW);
    }
    baro_data();
}

void quat2euler(float q0, float q1, float q2, float q3) {
    float roll, pitch, yaw;
    roll = atan2(2*(q0*q1 + q2*q3), 1 - 2*(q1*q1 + q2*q2));
    pitch = asin(2*(q0*q2 - q3*q1));
    yaw = atan2(2*(q0*q3 + q1*q2), 1 - 2*(q2*q2 + q3*q3));
    Serial.print(roll);
    Serial.print(",");
    Serial.print(pitch);
    Serial.print(",");
    Serial.println(yaw);
}

void baro_data() {
    // get pressure data from baro
    pressure = MS5611.getPressure();
    temp = MS5611.getTemperature();
    Serial.print(pressure);
    Serial.print(",");
    Serial.println(temp);
}