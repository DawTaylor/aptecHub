require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const routers = require("./routers")
const path = require("path")
const port = process.env.PORT || 3000

const model = require("./models/index")

server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static("./dist/public"))
server.use(routers)

server.set("view engine", "ejs")
server.set("views", path.join(__dirname, "views"))

model.sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log("Server listening in http://localhost:" + port)
  })
})
