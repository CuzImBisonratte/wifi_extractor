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
1. Testdateien hier herunterladen -> [WLAN-Testfiles.zip](https://github.com/CuzImBisonratte/wifi_extractor/files/7315389/WLAN-Testfiles.zip)
2. Im XMLs Ordner entpacken
3. Programm laufen lassen wie normal

- Testwerte:   

|Name|Passwort|Verschlüsselung|Authentifizierung|
|---|---|---|---|
|TestWiFi1|PasswordForTestFile1|AES|WPA2PSK|
|TestWiFi2|PasswordOfTestFile2|DES|WPA2PSK|
|TestWiFi3|-|none|open|
