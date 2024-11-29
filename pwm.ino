void setup() {
}

int pin = 8;

void loop() {
   // 38 kHz is roughly 26 microseconds per cycle.
   digitalWrite(pin, HIGH);  // 3 microseconds
   delayMicroseconds(10);
   digitalWrite(pin, LOW);
   delayMicroseconds(10);
}

