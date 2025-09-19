import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import router from './routes/index.js';
import domainAuthMiddleware from "./middlewares/domainAuth.js";
import timeLogMiddleware from "./middlewares/timeLog.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(timeLogMiddleware);
app.use(errorHandlerMiddleware);
app.use(domainAuthMiddleware);

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