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

const GetTicketStats = (callback) => {
  var cards = [
    { name: "Action Required", value: "51", category: "Helpdesk" },
    { name: "Unassigned", value: "5", category: "Helpdesk" },
    { name: "Open Today", value: "26", category: "Helpdesk" },
    { name: "Resolved Today", value: "12", category: "Helpdesk" },
    { name: "Incidents", value: "30", category: "Database" },
    { name: "Service Requests", value: "12", category: "Database" },
    { name: "Open Today", value: "1", category: "Database" },
    { name: "Resolved Today", value: "1", category: "Database" },
    { name: "Action Required", value: "13", category: "IT Operations" },
    { name: "Unassigned", value: "1", category: "IT Operations" },
    { name: "Open Today", value: "0", category: "IT Operations" },
    { name: "Resolved Today", value: "0", category: "IT Operations" },
  ];

  callback(cards);
};

app.get("/ticketStats", (req, res) => {
  GetTicketStats((data) => {
    res.send(data);
  });
});

app.listen(process.env.PORT || 8080);
console.log("Server Listening...");
