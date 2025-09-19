import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import router from './routes/index.js';

const app = express();

dotenv.config();
const openapiDocument = YAML.load("./src/schemas/api.yaml");

const port = process.env.PORT || 3000

const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(timeLog);
app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));
app.use('', router);


app.listen(port, () => {
  console.log(`Email Sender listening on port ${port}`)
})