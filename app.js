import express from "express";
import notesRoute from "./notesRoutes.js";
const app = express();
app.use(express.json());

app.use("/api/v1/notes", notesRoute);

export default app;
