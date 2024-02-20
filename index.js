const cors = require("cors");
const express = require("express");
const adminpage = require("./routes/admin.js");

const app = express();
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));

app.listen(4000, () => console.log("The server is running at PORT 4000"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", adminpage);
