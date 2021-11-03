require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Redis = require("redis");
const usersRoutes = require("./routes/users");
const botRoutes = require("./routes/bot");
const app = express();
const User = require("./models/User");

// Create Redis Client
let RedisClient = Redis.createClient();

app.set("RedisClient", RedisClient);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Got it");
});

app.use("/api/users", usersRoutes);
app.use("/api/bot", botRoutes);

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`))
  )
  .catch((e) => console.log(e));
