const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require("./DataBase/database")
const router = require("./routes/authroute")
const userRouter = require("./routes/userRouter")
const pageRouter = require("./routes/pageroute");
const categoriesRouter = require("./routes/categoriesRoute")
const editProfileRouter = require("./routes/profileEditRouter")
const searchController = require('./controllers/searchController')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const PORT = 4000 || process.env.PORT


app.get("/", (req, res) => {
    res.json({
        message: "Server is running on the webpage"
    })
})
app.get('/api/page/search', searchController);

app.use("/api/userprofile/edit", editProfileRouter)
app.use('/api/page', pageRouter)
app.use("/api/users", userRouter);
app.use('/api', router)
app.use("/api/categories", categoriesRouter)

connectDB()

app.listen(PORT, () => {
    console.log("Server is running at port: 4000")
})


module.exports = app;