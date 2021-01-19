import * as express from "express";
import * as http from "http";
import {
  ChatForm,
  ProjectDistrictData,
  ProjectDistrictDataSingle,
} from "models/types";
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

// Define mysql stuff
import * as mysql from "mysql";

var con = mysql.createConnection({
  host: "48mh42.ddns.net",
  port: 51703,
  user: "root",
  password: "tnwebdev123",
  database: "webdb",
});

const areaList = new Promise<Array<string>>((resolve, reject) => {
  con.query("SELECT areaName FROM AREA", (err, result) => {
    if (err) {
      console.log(err);
    }

    var myArray: Array<string> = [];
    result.forEach((element: any, index: number) => {
      myArray.push(element.areaName);

      if (index == result.length - 1) {
        resolve(myArray);
      }
    });
  });
});

const casesDb = new Promise<ProjectDistrictData>((resolve, reject) => {
  axios
    .get(
      "https://raw.githubusercontent.com/kwongtn/OpenCovidMY/main/data/district/20210116-district.json"
    )
    .then((res: any) => {
      resolve(res.data);
    });
});

async function findCases(areaName: string) {
  const mycasesDb: ProjectDistrictData = await casesDb;

  return mycasesDb.find((element: ProjectDistrictDataSingle) => {
    return element.district == areaName;
  });
}

function getCases(
  message: string,
  areaName: string
): Promise<ProjectDistrictDataSingle | boolean> {
  return new Promise(async (resolve) => {
    var myRegex = new RegExp(areaName.toLocaleUpperCase(), "g");

    if (myRegex.test(message.toLocaleUpperCase())) {
      const areaData = (await findCases(areaName)) as ProjectDistrictDataSingle;
      resolve(areaData);
    } else {
      resolve(false);
    }
  });
}

function intentWrite(chatReq: ChatForm, destArea: string) {
  if (chatReq.sessionID) {
    con.query(
      "INSERT INTO HISTORY (sourceAreaID, userID, destAreaID) VALUES ((SELECT b.areaID FROM SESSION a LEFT JOIN USER b ON a.userID=b.userID WHERE a.sessionID='" +
        chatReq.sessionID +
        "'), (SELECT userID FROM SESSION WHERE sessionID='" +
        chatReq.sessionID +
        "'), (SELECT areaID FROM AREA WHERE areaName ='" +
        destArea +
        "'))",
      (err: any) => {
        if (err) {
          console.log(err);
        }
      }
    );
  } else {
    con.query(
      "INSERT INTO HISTORY (destAreaID) VALUES ((SELECT areaID FROM AREA WHERE areaName ='" +
        destArea +
        "'))",
      (err: any) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
}

//initialize a simple http server
const server = http.createServer(app);

app.post("/chat", async (req, res) => {
  const myReq = req.body as ChatForm;
  // console.log(req.body);

  const privateAreaList: Array<string> = await areaList;
  var areaFound = false;
  var jobList: Array<Promise<any>> = [];

  privateAreaList.forEach(async (areaName: string) => {
    if (!areaFound) {
      jobList.push(getCases(myReq.message, areaName));
    }
  });

  Promise.all(jobList)
    .then((jobList: any) => {
      return jobList.filter((result: any) => {
        return result != false;
      });
    })
    .then((result: Array<any>) => {
      if (result.length == 0) {
        res.send({ message: "Sorry, I don't understand your request." });
      } else {
        res.send({
          message:
            "There are " +
            result[0].cases +
            " cases in " +
            result[0].district +
            " from 2 - 16 Jan 2021.",
        });
      }

      return result;
    })
    .then((result: Array<any>) => {
      if (result.length > 0) {
        intentWrite(myReq, result[0].district);
      }
    });
});

//start our server
server.listen(process.env.PORT || 3000, () => {});
