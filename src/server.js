import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import router from './routes/index.js';

import timeLogMiddleware from "./middlewares/timeLog.middleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import corsMiddleware from "./middlewares/cors.middleware.js";
import apiKeyMiddleware from "./middlewares/apiKey.middleware.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(timeLogMiddleware);
app.use(errorHandlerMiddleware);
app.use(corsMiddleware);
app.use(apiKeyMiddleware);

const port = process.env.PORT || 3000;

const openapiDocument = YAML.load("./src/schemas/api.yaml");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));
app.use('', router);


app.listen(port, () => {
  console.log(`Email Sender listening on port ${port}`)
})