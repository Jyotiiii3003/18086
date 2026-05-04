const { Log, setAuthToken } = require("./logger");


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqeW90aW1paXNocmEyMDAzQGdtYWlsLmNvbSIsImV4cCI6MTc3Nzg3OTQ3OCwiaWF0IjoxNzc3ODc4NTc4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOTk1NzU4ZDctZTNiMi00NDU2LWFkMWItMDQzNWNhYTliYTVlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiIGp5b3RpIG1pc2hyYSIsInN1YiI6IjhjNDcyMTUyLWZlYzUtNDU2Yi05MjRkLTE2ZTAxY2IwOWMzMyJ9LCJlbWFpbCI6Imp5b3RpbWlpc2hyYTIwMDNAZ21haWwuY29tIiwibmFtZSI6IiBqeW90aSBtaXNocmEiLCJyb2xsTm8iOiIxODA4NiIsImFjY2Vzc0NvZGUiOiJ1a3NkV1QiLCJjbGllbnRJRCI6IjhjNDcyMTUyLWZlYzUtNDU2Yi05MjRkLTE2ZTAxY2IwOWMzMyIsImNsaWVudFNlY3JldCI6ImZ2R2J5SFF5UVVFVG5CRFQifQ.Rk4vR5fTmqw3m0IONe8qJLnf7XAnOOps7fMGe8_BfwI";

// set token
setAuthToken(TOKEN);


async function testLogger() {
  console.log("Testing logging middleware...");

  await Log("backend", "info", "controller", "Test log from test.js");

  console.log("Test completed");
}

testLogger();