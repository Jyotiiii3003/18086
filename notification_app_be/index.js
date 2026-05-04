const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { Log, setAuthToken } = require("../logging_middleware/logger");
require("dotenv").config();


const app = express();
app.use(cors());

const TOKEN = process.env.TOKEN;

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