#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include "DHT.h"
#define WIFI_SSID "VPSICOM"          //
#define WIFI_PASSWORD "Sicom123123"  //
//#define FIREBASE_HOST "show-temp-humi-ldr-default-rtdb.firebaseio.com/"//đường dẫn URL của firebase
//#define FIREBASE_HOST "dht11-spkt-default-rtdb.firebaseio.com/"//đường dẫn URL của firebase//
//#define FIREBASE_AUTH "e3Jv9ZE8Ne2u9daX3G72kSSc3uVVYPh3qitIjw6Q"//mã auth token của firebase
//#define FIREBASE_AUTH "tvmYmqAEuyKl6kFVFqaLaSrgUy1jkrkRj8kqr3L5"//mã auth token của firebase
#define FIREBASE_HOST "itfl-7cfb5-default-rtdb.firebaseio.com/"   //đường dẫn URL của firebase//
#define FIREBASE_AUTH "bZelkxg2MRohAATWIuKNsYuVl1dFyBBXoldO5ZK7"  //mã auth token của firebase
FirebaseData firebaseData;                                        // đặt tên cho dễ sử dụng
#define DHTPIN 5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
float t, h, f, x, mq2;
String k, den, quat, maylanh;
void setup_wifi()  // chương trình kết nối wifi
{
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");
}
void setup_firebase() {
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}
void update_data() {
  Firebase.setInt(firebaseData, "/TT_IoT/Humi", h);
  Firebase.setInt(firebaseData, "/TT_IoT/Temp", t);
  Firebase.setInt(firebaseData, "/TT_IoT/Gas", mq2);
  Firebase.getInt(firebaseData, "/Rate");

  Firebase.getString(firebaseData, "/TT_IoT/BULB");
  den = firebaseData.stringData();

  Firebase.getString(firebaseData, "/TT_IoT/MayLanh");
  maylanh = firebaseData.stringData();

  Firebase.getString(firebaseData, "/TT_IoT/Fan");
  quat = firebaseData.stringData();

  if (den == "1") {
    Serial.println("Den:on");
    digitalWrite(4, HIGH);
  } else {
    Serial.println("Den:off");
    digitalWrite(4, LOW);
  }
  if (maylanh == "1") {
    Serial.println("maylanh:on");
    digitalWrite(2, HIGH);
  } else {
    Serial.println("maylanh:off");
    digitalWrite(2, LOW);
  }
  if (quat == "1") {
    Serial.println("quat:on");
    digitalWrite(0, HIGH);
  } else {
    Serial.println("quat:off");
    digitalWrite(0, LOW);
  }
}

void setup() {
  setup_wifi();
  Serial.begin(112500);
  setup_firebase();
  dht.begin();
  pinMode(4, OUTPUT);
  pinMode(0, OUTPUT);
  pinMode(2, OUTPUT);
  digitalWrite(4, LOW);
  digitalWrite(0, LOW);
  digitalWrite(2, LOW);
}
void loop() {
  delay(1000);
  h = dht.readHumidity();
  t = dht.readTemperature();
  f = dht.readTemperature(true);
  mq2 = analogRead(A0);
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  update_data();

  Serial.print("mq2: ");
  Serial.println(mq2);
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.println("%");
  Serial.print(F("Temperature: "));
  Serial.print(t);
  Serial.println(F("°C "));
}
