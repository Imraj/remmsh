const express = require("express");
const { botWebhook } = require("../controllers/bot");

const router = express.Router();

router.post("/webhooks", botWebhook);

module.exports = router;
