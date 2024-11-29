#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "";
const char* password = "";

String apiPath = "";

const int NUM_SENSORS = 6;
int pins[NUM_SENSORS] = {23, 2, 4, 5, 18, 22};
int chosen_spell = 0;

void setup() {
  Serial.begin(115200); 

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  for (int i = 0; i < NUM_SENSORS; i++) {
    pinMode(pins[i], INPUT);
  } 
}

void callApi(String endpoint) {
  if (true) {
    if (WiFi.status()== WL_CONNECTED) {
      HTTPClient http;
      String apiEndpoint = apiPath + endpoint;
      http.begin(apiEndpoint.c_str());
      int httpResponseCode = http.GET();
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
  }
}


void loop(){
  for (int i = 1; i < NUM_SENSORS; i++) {
    if (digitalRead(pins[i]) == LOW) {
        chosen_spell = i;
    }
  }
  if (digitalRead(pins[0]) == LOW) {
    callApi("cast_lightning");
    if (chosen_spell > 0) {
      callApi("cast/" + String(chosen_spell));
      chosen_spell = 0;
    }
  }
  delay(1);
}