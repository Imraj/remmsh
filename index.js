require("dotenv").config();
const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// const Redis = require("redis");
const usersRoutes = require("./routes/users");
const publicFiguresRoutes = require("./routes/publicFigures");
const botRoutes = require("./routes/bot");
const restaurantsRoutes = require("./routes/restaurants");

const app = express();

//app.use(express.static("tmp"));
//app.use(express.static("uploads"));

// Create Redis Client
// let RedisClient = Redis.createClient(process.env.REDIS_URL);

// app.set("RedisClient", RedisClient);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.get("/api", (req, res) => {
  res.send("Api is working");
});

app.use("/api/uploads", express.static("public/uploads"));

app.use("/api/users", usersRoutes);
app.use("/api/public-figures", publicFiguresRoutes);
// app.use("/api/bot", botRoutes);
app.use("/api/restaurants", restaurantsRoutes);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "./", "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

if (process.env.ENV === "production") {
  // serve the API with signed certificate on 443 (SSL/HTTPS) port
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(
        "/etc/letsencrypt/live/dashboard.zorroksa.com/privkey.pem"
      ),
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/dashboard.zorroksa.com/fullchain.pem"
      ),
    },
    app
  );

  httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
  });
} else {
  app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
}
