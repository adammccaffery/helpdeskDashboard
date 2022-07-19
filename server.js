const express = require("express");
const https = require("https");
const cors = require("cors");
const path = require("path");
const app = express();
const enforce = require("express-sslify");
const fs = require("fs");
const dotenv = require("dotenv")
const mssql = require("mssql")
require("msnodesqlv8")
const sql = require("mssql/msnodesqlv8");
const pool = new sql.ConnectionPool({
  database: "FreshService",
  server: "asc-sql03",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
});


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
        const result = await pool.request().query(`DECLARE @r VARCHAR(1000)
        EXEC REPORTS.spExportStatsJSON  @r OUTPUT
        select @r`)
        var data = await JSON.parse(result.recordset[0][""]);
    } catch {
        var data = JSON.parse(fs.readFileSync("./dummyData/data.json"));
    }

    var cards = [];
    var agents = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i].agent != null) {
      agents.push({
        name: data[i].agent,
        openedTickets: data[i].openTickets,
        resolvedTickets: data[i].resolvedToday,
      });
    } else {
      cards.push({
        name: StripCategoryFromName(data[i].name),
        value: data[i].value,
        category: GetCategoryFromName(data[i].name),
      });
    }
  }
var top5 = Object.values(agents.filter(agent => (agent.name != "Unassigned" && agent.resolvedTickets != 0))).sort((a,b) => b.resolvedTickets - a.resolvedTickets).slice(0,4)
    cards.push({
        name: "Resolved Today",
        top5: top5,
        category: "Agents",
    });
top5 = Object.values(agents.filter(agent => (agent.name != "Unassigned" && agent.opendedTickets != 0))).sort((a,b) => b.opendedTickets - a.opendedTickets).slice(0,4)
//Comment
    cards.push({
        name: "Open Tickets",
        top5: top5,
        category: "Agents",
    });

  callback(cards);
};

const GetAgentStats = async (callback) => {
    try {
        await pool.connect();
        const result = await pool.request().query(`DECLARE @r VARCHAR(1000)
        EXEC REPORTS.spExportStatsJSON  @r OUTPUT
        select @r`)
        var data = await JSON.parse(result.recordset[0][""]);
    } catch {
        var data = JSON.parse(fs.readFileSync("./dummyData/data.json"));
    }

    var agents = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].agent != null) {
          agents.push({
            name: data[i].agent,
            openedTickets: data[i].openTickets,
            resolvedTickets: data[i].resolvedToday,
          });
        }
    }
    callback(agents);
}
const StripCategoryFromName = (name) => {
  const categories = ["Helpdesk", "Database", "IT Ops"];

  for (var i = 0; i < categories.length; i++) {
    if (name.includes(categories[i])) {
      return name.replace(categories[i], "").trim();
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

app.get("/agentStats", (req, res) => {
  GetAgentStats((data) => {
    res.send(data);
  });
});
app.get("/settings", (req, res) => {
  var settingsObj = JSON.parse(fs.readFileSync("./settings.json"));

  res.send(settingsObj);
});

const port = 8080;

app.listen(port);
console.log(`Server Listening at port ${port}...`);
