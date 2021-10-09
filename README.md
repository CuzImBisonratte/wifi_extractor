# wifi_extractor
Ein Skript zum exportieren aller je verbundener Netzwerke eines Windows-PC's in eine Datenbank.  
Das Skript funktioniert auch ohne Datenbank, kann dann aber nichts speichern.

# Notwendig
- nodejs
- windows
- sql-datenbank

# Ausführen
- Konsole starten
- `node app.js` ausführen

# Testdateien

1. Testdateien hier herunterladen -> [WLAN-TestDateien.zip](https://github.com/CuzImBisonratte/wifi_extractor/files/7315496/WLAN-TestDateien.zip)
2. Im XMLs Ordner entpacken
3. Programm laufen lassen wie normal

- Testwerte:   

|Dateiname|Name|Passwort|Verschlüsselung|Authentifizierung|
|---|---|---|---|---|
|WLAN-TestWifi1.xml|TestWiFi1|PasswordForTestFile1|AES|WPA2PSK|
|WLAN-TestWifi2.xml|TestWiFi2|PasswordOfTestFile2|DES|WPA2PSK|
|WLAN-TestWifi3.xml|TestWiFi3|-|none|open|
|WLAN-Vusomovo.xml|Vusomovo|3s-#ÜsttnkÖt!Z,a|HAN|AUY8HPW|
|WLAN-yomekope-wifi.xml|yomekope-wifi|653459727375933677|QBZ|KWC6BAK|
|WLAN-wifi-lufurudo.xml|wifi-lufurudo|-|none|open|

- 1-3 Sind simple Namen und Passwords, mit existierenden authentifizierungs-/verschlüsselungsstandarts
- 4-6 Are random names and passwords, mit nicht existierenden authentifizierungs-/verschlüsselungsstandarts
