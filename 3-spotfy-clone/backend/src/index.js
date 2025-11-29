import express from "express";
import dotenv from "dotenv";
import fileupload from "express-fileupload";
import path from "path";
import cors from "cors";

import {connectDB} from "./lib/db.js";
import {clerkMiddleware} from "@clerk/express";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true, 
}))

app.use(express.json()); // Middleware to parse JSON bodies
app.use(clerkMiddleware()); // add auth to requests object => req.auth.userId
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "tmp"),
  createParentPath: true,
  limits:{
    fileSize: 10 * 1024 * 1024 // 10MB maximum file size
  }
}))

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/albums", albumRoutes)
app.use("/api/stats", statsRoutes)

//error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: process.env.NODE_ENV === 'production' ? "Internal Server Error" : err.message });
})

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
  connectDB();
});
//todo: setup socket.io