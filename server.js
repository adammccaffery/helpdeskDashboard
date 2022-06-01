const express = require("express");
const https = require("https");
const cors = require("cors");
const path = require("path");
const app = express();
const enforce = require("express-sslify");

if (process.env.PORT) app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080);

// app.get("/data", (req, res) => {
//   GetData((data) => {
//     console.log(data);
//     res.send(data);
//   });
// });

// const GetData = (callback) => {
//   client.query("select * from playerdata", (err, res) => {
//     if (err) console.log(err);
//     if (res) callback(res.rows);
//     else console.log("Failed to connect to server");
//   });
// };