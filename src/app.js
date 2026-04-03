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

// import routes 
// (here we give this name userRouter as per our own)
import userRouter from "./routes/user.routes.js"

//  when someone goes on /users routes then they can directly navigate on user.routes.js file 
// ( means control will go on userRouter => user.routes.js)

// routes declaration
// http://localhost:8000/api/v1/users
app.use("/api/v1/users", userRouter);

export default app;