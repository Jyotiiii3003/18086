const { Log, setAuthToken } = require("./logger");


const TOKEN = process.env.TOKEN;

// set token
setAuthToken(TOKEN);


async function testLogger() {
  console.log("Testing logging middleware...");

  await Log("backend", "info", "controller", "Test log from test.js");

  console.log("Test completed");
}

testLogger();