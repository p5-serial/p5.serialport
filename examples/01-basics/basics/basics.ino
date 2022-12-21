void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.write(0);
  delay(1000);
  Serial.write(1);
  delay(1000);

}
