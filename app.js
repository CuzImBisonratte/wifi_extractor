// Database config
var host = "localhost";
var user = "root";
var password = "";
var database = "mini_projects";
var table = "wifi_extractor"
var db_message = "Nichts wurde zur Datenbank übertragen!"
var sent_count = 0;
// 
// 
// Import the mysql-driver
var mysql = require('mysql');
// Create the connection to the Database
var connection = mysql.createConnection({
  host     : host,
  user     : user,
  password : password,
  database : database
});
// Print out info
console.log("Lade WiFi-Profile...");
// Import commandline-execution
const { exec } = require("child_process");
// Download the needed wifi-xml-files
exec("netsh wlan export profile folder=XMLs key=clear", (error, stdout, stderr) => {});
// Print out info
console.log("Exportiere die Daten aus den Profilen...");
// Wait for the download and then run the rest
setTimeout(readAndWrite,5000);
function readAndWrite(){
  // Import the xml-reader
  const xml2js = require('xml2js');
  // Import file-system functions
  const fs = require('fs');
  // Create a parser
  const parser = new xml2js.Parser({ attrkey: "ATTR" });
  // Let the system know, which folder to use the files from
  const testFolder = './XMLs/';
  // Read the directory
  fs.readdir(testFolder, (err, files) => {
    // Run the script for each file
    files.forEach(file => {
      // Get the right file
      let xml_string = fs.readFileSync("./XMLs/"+file, "utf8");
      // Parse the xml
      parser.parseString(xml_string, function(error, result) {
        // When no errors occur, go on
        if(error === null) {
          // Create a line break
          console.log("\n");
          // Get the wifi name
          wifi_name = result.WLANProfile.name[0];
          // Get the wifi encryption
          wifi_encrypt = result.WLANProfile.MSM[0].security[0].authEncryption[0].encryption[0];
          // Check if a password is needed
          if(wifi_encrypt!="none"){
            // Get the password
            wifi_pass = result.WLANProfile.MSM[0].security[0].sharedKey[0].keyMaterial[0];
          }
          // If no password is needed
          else{
            // Write no password
            wifi_pass = "-";
          }
          // Get the authentication type
          wifi_auth = result.WLANProfile.MSM[0].security[0].authEncryption[0].authentication[0];
          // Log the results
          console.log("WiFi name: "+wifi_name);
          console.log("WiFi password: "+wifi_pass);
          console.log("WiFi encryption: "+wifi_encrypt);
          console.log("WiFi authentication: "+wifi_auth);
          // prepare an sql statement
          sql_statment = "INSERT INTO "+table+" (`name`, `password`, `encryption`, `authentication`) VALUES ('"+wifi_name+"','"+wifi_pass+"','"+wifi_encrypt+"','"+wifi_auth+"'"+")";
          // Push the data to the Database
          connection.query(sql_statment, function (error, results, fields) {
            // If there was a connection to the server
            if(results){
              sent_count++;
              db_message = "Alle neuen Daten wurden an den server übermittelt!";
            }
          });
          
        // If errors occurs, log them
        }
        else {
            console.log(error);
        }
      });
    });
  });
  function closeConnection(){
    console.log("\n\n---------\n\nEndresultat:\n")
    if(sent_count=1){
      console.log("Es wurde "+sent_count+" Datensatz verarbeitet!");
    }
    else{
      console.log("Es wurden "+sent_count+" Datensätze verarbeitet!");
    }
    console.log(db_message);
    connection.end();
  }
  setTimeout(closeConnection,1000);
}