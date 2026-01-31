import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import router from './routes/index.js';
import requestLogMiddleware from "./middlewares/requestLog.middleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import corsMiddleware from "./middlewares/cors.middleware.js";
import apiKeyMiddleware from "./middlewares/apiKey.middleware.js";
import { getLogger } from "./utils/logger.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 9000;

const logger = getLogger();

const docs = fs.readFileSync(path.resolve("src/schemas/api.yaml"), "utf8");
const openapiDocument = yaml.load(docs);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
if (process.env.ENVIROMENT !== "local") {
  app.use(corsMiddleware);
  app.use(apiKeyMiddleware);
}
app.use(requestLogMiddleware);

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('', router);
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  logger.info(`Email Sender listening on port ${port}`)
})