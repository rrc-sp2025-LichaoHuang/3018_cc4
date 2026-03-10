import express from "express";
import projectRoutes from "./api/v1/routes/projectRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/v1", projectRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(errorHandler);

export default app;