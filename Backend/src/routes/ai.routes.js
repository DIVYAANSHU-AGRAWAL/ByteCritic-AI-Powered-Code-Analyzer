const express = require("express");

const router = express.Router();

const aiController = require('../controllers/ai.controller')

// // Route where user sends some prompt
// router.get("/get-response",aiController.getResponse);

// To send code from frontend to backend
router.post("/get-review",aiController.getReview)

module.exports = router;
