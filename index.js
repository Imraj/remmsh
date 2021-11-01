require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Got it");
});

app.use("/api/users", usersRoutes);

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
