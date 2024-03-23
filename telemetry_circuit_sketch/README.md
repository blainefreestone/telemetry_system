# Overview

This circuit collects telemetry data from various sensors several times per second and sends the organized data to a computer server via serial communication. This project is to gain experience in Embedded Systems and is inspired by my interest in rocketry and aircraft.
## Functional Requirements

1) The circuit will collect the following data:
	1) Time
	2) GPS Coordinates
	3) Altitude
	4) Temperature
	5) Movement data (acceleration, velocity, angle, etc.)
2) The circuit will process the data and send it to the computer server via serial communication several times per second.
3) Further improvements to the components and code will be outlined with plans to create the circuit on a PCB.
4) *Stretch: The circuit will transmit the data via radio to a receiver that transmits the data to the computer (in order that the circuit doesn't have to be plugged in)*

## Specifications:

### Parts
1) Arduino Micro
2) MPU-9250/6500 (10-Axis IMU)
3) DS3231 (RTC)
4) GY-63 MS56311 (Pressure Sensor)
5) Jumper Wires
6) Breadboard

## Software

The software of this circuit is to (1) communicate with each component, (2) collect and parse the data, and (3) transmit it to the computer. Because of memory limitations, the software is compact.

{Provide a link to your YouTube demonstration. It should be a 4-5 minute demo of the software running and a walkthrough of the code.}

[Software Demo Video](https://youtu.be/u_AryGlHibo)

# Development Environment

This was developed in the Arduino IDE and Visual Studio Code

# Future Work

- Integrate all the components to send data synchronously with a RTC time stamp.
- Improve memory management within the Arduino. 