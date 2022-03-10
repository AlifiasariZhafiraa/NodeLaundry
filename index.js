const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: "2mb" }))
app.use(cors())


const api = require("./bin/app/api")

api.routes(app)

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello world!",
    data: null
  });
});

app.listen(8000, () => {
  console.log("Running on port 8000")
})