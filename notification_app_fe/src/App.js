import { useEffect, useState } from "react";
import axios from "axios";

const getColor = (type) => {
  if (type === "Placement") return "#d4edda";
  if (type === "Event") return "#fff3cd";
  return "#f8d7da";
};

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [viewed, setViewed] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/notifications")
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  const topNotifications = notifications.slice(0, 10);

  
  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.Type === filter);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2> Priority Notifications (Top 10)</h2>

      {topNotifications.map((n) => (
        <div
          key={n.ID}
          onClick={() =>
            setViewed((prev) => ({ ...prev, [n.ID]: true }))
          }
          style={{
            border: "1px solid #ccc",
            marginBottom: "12px",
            padding: "12px",
            borderRadius: "10px",
            background: getColor(n.Type),
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            opacity: viewed[n.ID] ? 0.5 : 1,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                background: "#333",
                color: "white",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            >
              {n.Type}
            </span>
          </div>

          <p style={{ fontWeight: "500" }}>{n.Message}</p>
          <small>{new Date(n.Timestamp).toLocaleString()}</small>
        </div>
      ))}

      
      <h2 style={{ marginTop: "30px" }}>📂 All Notifications</h2>

      <div style={{ marginBottom: "15px" }}>
        {["All", "Placement", "Event", "Result"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              marginRight: "10px",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: filter === type ? "#333" : "#ddd",
              color: filter === type ? "white" : "black",
            }}
          >
            {type}
          </button>
        ))}
      </div>

    
      {filteredNotifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        filteredNotifications.map((n) => (
          <div
            key={n.ID}
            onClick={() =>
              setViewed((prev) => ({ ...prev, [n.ID]: true }))
            }
            style={{
              border: "1px solid #ccc",
              marginBottom: "12px",
              padding: "12px",
              borderRadius: "10px",
              background: getColor(n.Type),
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              opacity: viewed[n.ID] ? 0.5 : 1,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  background: "#333",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              >
                {n.Type}
              </span>
            </div>

            <p style={{ fontWeight: "500" }}>{n.Message}</p>
            <small>{new Date(n.Timestamp).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
