import * as express from "express";
import * as http from "http";
import {
  Area,
  AreaDetailsResponse,
  ChatForm,
  LoginForm,
  LogoutForm,
  RegistrationForm,
  VerificationForm,
} from "models/types";
const axios = require("axios");

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//initialize a simple http server
const server = http.createServer(app);

app.post("/login", (req, res) => {
  const myReq = req.body as LoginForm;
  console.log(myReq);

  res.send({
    loginStatus: false,
    sessionID:
      "6b85f4a4c5ec51bc59b67884f0e4c88a1d785cc61b1e0e16e56281c03411a0ae",
  });
});

app.post("/logout", (req, res) => {
  const myReq = req.body as LogoutForm;
  console.log(myReq);

  res.send({
    logoutStatus: true,
  });
});

app.post("/registration", (req, res) => {
  const myReq = req.body as RegistrationForm;
  console.log(myReq);

  res.send({
    status: true,
    message: "Registration failed?",
  });
});

app.get("/verify", (req, res) => {
  const myReq: VerificationForm = {
    sessionID: req.query.sessionID as string,
  };
  console.log(myReq);

  res.send({
    loginStatus: true,
    details: {
      name: "Kwong Tung Nan",
      email: "tungnan5636@gmail.com",
      address: "Random Address",
      area: "Petaling",
      additionalNotes: "Some random notes",
    } as RegistrationForm,
  });
});

app.post("/chat", (req, res) => {
  const myReq = req.body as ChatForm;

  res.send(myReq.sessionID + ": " + myReq.message);
});

app.get("/area-list", (req, res) => {
  var randomArr: Array<Area> = [];
  do {
    randomArr.push({
      area: randomArr.length + "ThisIsAnArea",
      areaID: randomArr.length + Math.ceil(Math.random() * 10),
    });
  } while (Math.random() < 0.8);

  res.send(randomArr);
});

app.get("/area-details", (req, res) => {
  const randomRes: AreaDetailsResponse = {
    areaStats: [
      {
        area: "Area1",
        areaID: 1,
        cases: 42,
      },
      {
        area: "Area2",
        areaID: 2,
        cases: 415,
      },
      {
        area: "Area3",
        areaID: 3,
        cases: 412,
      },
    ],
    toAreaIntent: [
      {
        area: "Area1",
        areaID: 1,
        intent: 4142,
      },
      {
        area: "Area2",
        areaID: 2,
        intent: 41125,
      },
      {
        area: "Area3",
        areaID: 3,
        intent: 4112,
      },
    ],
    fromAreaIntent: [
      {
        area: "Area1",
        areaID: 1,
        intent: 4232,
      },
      {
        area: "Area2",
        areaID: 2,
        intent: 31125,
      },
      {
        area: "Area3",
        areaID: 3,
        intent: 5112,
      },
    ],
  };

  res.send(randomRes);
});

//start our server
server.listen(process.env.PORT || 3000, () => {});
