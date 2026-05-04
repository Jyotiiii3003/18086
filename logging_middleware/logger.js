const axios = require("axios");

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

let TOKEN = "";

function setAuthToken(token) {
  TOKEN = token;
}

async function Log(stack, level, packageName, message) {
  try {
    const res = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
           "Content-Type": "application/json",
        },
      }
    );

    console.log("Log success:", res.data);
  } catch (err) {
    console.error("Log failed:", err.message);
  }
}

module.exports = { Log, setAuthToken };