import bodyParser from "body-parser";
import express from "express";
import config from "./config/config.js";
import routers from './routers.js';

const app = express();
const HOST = config?.host;
const PORT = config?.port;
const uploadDir = config?.uploadDir;

app?.use(bodyParser?.json({limit : "10mb"}));

app?.use('/uploads', express?.static(uploadDir));

app?.all('*', routers);

app?.listen(PORT, () => console.log(`Server Running on http://${HOST}:${PORT}`));

export default app;