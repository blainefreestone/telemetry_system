#include "MPU9250.h"

MPU9250 mpu;
float quatX;
float quatY;
float quatZ;
float quatW;

void setup() {
    Serial.begin(115200);
    Wire.begin();
    delay(2000);

    // configure I2C address for IMU
    mpu.setup(0x68);
    // toggle automatic cleaning up of data
    mpu.ahrs(true);

    // Calibrate accelerometer and gyroscope
    Serial.println("Calibrating Accel / Gyro");
    mpu.calibrateAccelGyro();
    // Calibrate magnetometer
    Serial.println("Calibrating Mag");
    mpu.calibrateMag();
}

void loop() {
    if (mpu.update()) {
        quatX = mpu.getQuaternionX();
        quatY = mpu.getQuaternionY();
        quatZ = mpu.getQuaternionZ();
        quatW = mpu.getQuaternionW();
        quat2euler(quatX, quatY, quatZ, quatW);
    }
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