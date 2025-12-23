import express from "express";
import cors from "cors";
import { registerRoutes } from "../server/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS setup
app.use(cors({
    origin: true,
    credentials: true
}));

// Register API routes (without Socket.IO)
registerRoutes(app);

export default app;
