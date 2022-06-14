const express = require("express");
const https = require("https");
const cors = require("cors");
const path = require("path");
const app = express();
const enforce = require("express-sslify");
const fs = require("fs");
const dotenv = require("dotenv")
const mssql = require("mssql")
const config = {
    driver: process.env.SQL_DRIVER,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    //user: process.env.SQL_UID,
    //password: process.env.SQL_PWD,
    options: {
        encrypt: false,
        enableArithAbort: false,
        trustedConnection: true
    },
};
const pool = new mssql.ConnectionPool(config);

if (process.env.PORT) app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const GetTicketStats = async (callback) => {
    try {
        await pool.connect();
        const result = await pool.request().query(`exec REPORTS.spExportStatsJSON`)
  var data = await JSON.parse(result);
        console.log(result)
    }
        catch {
            console.log("error")
        }

  var cards = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i].agent != null) {
      cards.push({
        name: data[i].agent,
        value: data[i].openTickets,
        category: "Agents",
      });
    } else {
      cards.push({
        name: StripCategoryFromName(data[i].name),
        value: data[i].value,
        category: GetCategoryFromName(data[i].name),
      });
    }
  }

  callback(cards);
};

const StripCategoryFromName = (name) => {
  const categories = ["Helpdesk", "Database", "IT Ops"];

  for (var i = 0; i < categories.length; i++) {
    if (name.includes(categories[i])) {
      return name.replace(categories[i], "");
    }
  }

  return name;
};

const GetCategoryFromName = (name) => {
  const categories = ["Helpdesk", "Database", "IT Ops"];

  for (var i = 0; i < categories.length; i++) {
    if (name.includes(categories[i])) {
      return categories[i];
    }
  }

  return "Unassigned";
};

app.get("/ticketStats", (req, res) => {
  GetTicketStats((data) => {
    res.send(data);
  });
});

app.get("/settings", (req, res) => {
  var settingsObj = JSON.parse(fs.readFileSync("./settings.json"));

  res.send(settingsObj);
});

const port = process.env.PORT || 8080;

app.listen(port);
console.log(`Server Listening at port ${port}...`);
