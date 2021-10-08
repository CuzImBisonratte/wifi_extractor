// Database config
var host = "localhost";
var user = "root";
var password = "";
var database = "mini_projects";
var table = "wifi_extractor"
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
// Import the xml-reader
const xml2js = require('xml2js');
// Import file-system functions
const fs = require('fs');
// Create a parser
const parser = new xml2js.Parser({ attrkey: "ATTR" });
// Let the system know, which file to use

const testFolder = '../XMLs/';
connection.connect();
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    let xml_string = fs.readFileSync("../XMLs/"+file, "utf8");

    parser.parseString(xml_string, function(error, result) {
      if(error === null) {
        console.log(result.WLANProfile);
        wifi_name = result.WLANProfile.name[0];
        wifi_encrypt = result.WLANProfile.MSM[0].security[0].authEncryption[0].encryption[0];
        if(wifi_encrypt!="none"){
          wifi_pass = result.WLANProfile.MSM[0].security[0].sharedKey[0].keyMaterial[0];
        }
        else{
          wifi_pass = "-";
        }
        wifi_auth = result.WLANProfile.MSM[0].security[0].authEncryption[0].authentication[0];
        console.log("WiFi name: "+wifi_name);
        console.log("WiFi password: "+wifi_pass);
        console.log("WiFi encryption: "+wifi_encrypt);
        console.log("WiFi authentication: "+wifi_auth);
        sql_statment = "INSERT INTO "+table+" (`name`, `password`, `encryption`, `authentication`) VALUES "
        sql_statment = sql_statment + "('"+wifi_name+"','"+wifi_pass+"','"+wifi_encrypt+"','"+wifi_auth+"'"+")";
        
        connection.query(sql_statment, function (error, results, fields) {
            if (error) throw error;
        });
        
        
      }
      else {
          console.log(error);
      }
    });
  });
});
// connection.end();

 

 