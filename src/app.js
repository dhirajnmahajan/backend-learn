import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// this middleware is use when data is comes as JSON
app.use(express.json({ limit: "20kb" }))
// this middleware is use when data comes from url
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
// to keep some static/temporary files in public folder
app.use(express.static("public"))

// cookie parser is used to access the cookies from user's browser and handle it securely through server
app.use(cookieParser())

export default app;