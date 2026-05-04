const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { Log, setAuthToken } = require("../logging_middleware/logger");

const app = express();
app.use(cors());

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqeW90aW1paXNocmEyMDAzQGdtYWlsLmNvbSIsImV4cCI6MTc3Nzg3OTQ3OCwiaWF0IjoxNzc3ODc4NTc4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOTk1NzU4ZDctZTNiMi00NDU2LWFkMWItMDQzNWNhYTliYTVlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiIGp5b3RpIG1pc2hyYSIsInN1YiI6IjhjNDcyMTUyLWZlYzUtNDU2Yi05MjRkLTE2ZTAxY2IwOWMzMyJ9LCJlbWFpbCI6Imp5b3RpbWlpc2hyYTIwMDNAZ21haWwuY29tIiwibmFtZSI6IiBqeW90aSBtaXNocmEiLCJyb2xsTm8iOiIxODA4NiIsImFjY2Vzc0NvZGUiOiJ1a3NkV1QiLCJjbGllbnRJRCI6IjhjNDcyMTUyLWZlYzUtNDU2Yi05MjRkLTE2ZTAxY2IwOWMzMyIsImNsaWVudFNlY3JldCI6ImZ2R2J5SFF5UVVFVG5CRFQifQ.Rk4vR5fTmqw3m0IONe8qJLnf7XAnOOps7fMGe8_BfwI";

setAuthToken(TOKEN); 

const API = "http://20.207.122.201/evaluation-service/notifications";

const priority = {
  Placement: 3,
  Event: 2,
  Result: 1,
};

app.get("/notifications", async (req, res) => {
  try {
    console.log("Hitting API with token:", TOKEN.slice(0, 20) + "...");

    const response = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    console.log("API status:", response.status);
    console.log("API response:", JSON.stringify(response.data, null, 2));

    let data = response.data.notifications || response.data.data || response.data;

    if (!Array.isArray(data)) {
      console.log("Unexpected shape:", JSON.stringify(response.data));
      return res.status(500).json({ error: "Unexpected API response", raw: response.data });
    }

    data.sort((a, b) => {
      let p = priority[b.Type] - priority[a.Type];
      if (p !== 0) return p;
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    Log("backend", "info", "controller", "Notifications fetched");

    res.json(data.slice(0, 10));
  } catch (err) {
    console.log("CATCH ERROR:", err.message); // ✅ added
    Log("backend", "error", "controller", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});