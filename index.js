const http = require("http");
const url = require("url");
const fetch = require("node-fetch");
const FortniteCard = require("./FortniteCard.js");

http
  .createServer(async (req, res) => {
    const reqURL = url.parse(req.url, true);
    const { username, platform = null } = reqURL.query;

    if (!username) {
      res.write(
        JSON.stringify({
          error: "Add your username as query",
        })
      );
      res.end();
      return;
    }

    const headers = { Authorization: "96e3f9e7-ec63b73e-baec11f7-7770d4e2" };

    var getUserIDURL = `https://fortniteapi.io/v1/lookup?username=${username}`;

    if (platform != null) {
      getUserIDURL += `&platform=${platform}`;
    }

    const getUserID = await fetch(getUserIDURL, {
      method: "GET",
      headers: headers,
    });

    const getUserIDjson = await getUserID.json();

    if (!getUserIDjson["result"]) {
      res.write(
        JSON.stringify({
          error:
            "Account not found. Recheck your username and consider adding a platform query",
        })
      );
      res.end();
      return;
    }

    const userID = getUserIDjson["account_id"];

    const getGlobalStats = await fetch(
      `https://fortniteapi.io/v1/stats?account=${userID}`,
      { method: "GET", headers: headers }
    );

    const GlobalStatsjson = await getGlobalStats.json();

    const soloWins = GlobalStatsjson["global_stats"]["solo"]["placetop1"];
    const soloKills = GlobalStatsjson["global_stats"]["solo"]["kills"];
    const soloKD = GlobalStatsjson["global_stats"]["solo"]["kd"];
    const duoWins = GlobalStatsjson["global_stats"]["duo"]["placetop1"];
    const duoKills = GlobalStatsjson["global_stats"]["duo"]["kills"];
    const duoKD = GlobalStatsjson["global_stats"]["duo"]["kd"];
    const squadWins = GlobalStatsjson["global_stats"]["squad"]["placetop1"];
    const squadKills = GlobalStatsjson["global_stats"]["squad"]["kills"];
    const squadKD = GlobalStatsjson["global_stats"]["squad"]["kd"];
    const totalWins = soloWins + duoWins + squadWins;
    const totalKills = soloKills + duoKills + squadKills;
    const soloDeaths = soloKills / soloKD;
    const duoDeaths = duoKills / duoKD;
    const squadDeaths = squadKills / squadKD;
    const totalDeaths = soloDeaths + duoDeaths + squadDeaths;
    const totalKD = (totalKills / totalDeaths).toFixed(2);

    const result = await FortniteCard(totalWins, totalKD, totalKills);

    res.setHeader(
      "Cache-Control",
      "private, no-cache, no-store, must-revalidate"
    );
    res.setHeader("Expires", "-1");
    res.setHeader("Pragma", "no-cache");
    res.writeHead(200, { "Content-Type": "image/svg+xml" });

    res.write(result);
    res.end();
  })
  .listen(process.env.PORT || 3000, function () {
    console.log("server start at port 3000");
  });
