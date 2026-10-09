import "dotenv/config";
import "./lib/zodErrorMap.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const origins = (process.env.CLIENT_ORIGIN ?? "http://localhost:5173").split(",");

app.use(helmet());
app.use(cors({ origin: origins }));
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Mount entity routers here, before the /api notFoundHandler.
app.use("/api", notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
