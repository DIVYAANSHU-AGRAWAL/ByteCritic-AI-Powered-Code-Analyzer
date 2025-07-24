const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require ('cors')       // Required to connect backend to frontend

const app = express();

app.use(cors());                    // Must always be at the top of all middlewares
app.use(express.json()); // Required for req.body
app.use("/ai", aiRoutes);


module.exports = app;
