const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const app = express();
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.get("/login", (req, res) => {
  res
    .writeHead(200, {
      "Set-Cookie": "token=encryptedstring; HttpOnly",
      "Access-Control-Allow-Credentials": "true"
    })
    .send();
});

app.get("/private", (req, res) => {
  if (!req.cookies.token) return res.status(401).send();
  res.status(200).json({ secret: "Ginger ale is a specific Root Beer" });
});

app.listen(3001, () => {
  console.log("listening on port 3001...");
});