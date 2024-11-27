import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";

dotenv.config();

const server = express();

server.use(cookieParser());
server.use(express.json());
server.use(
	cors({
		origin:
			process.env.ENV !== "production" ? "http://localhost:5173" : "https://cvsu-bacoor.vercel.app",
		methods: ["GET", "POST"],
		credentials: true,
	})
);

server.get("/", (_, res) => {
	res.json("good mourning.");
});

server.use("/api/auth", authRoutes);
server.use("/api/form", formRoutes);

server.listen(8080, () => {
	console.log("Connected to the server.");
});
