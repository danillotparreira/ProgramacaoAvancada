import express from "express";
import { routes } from "./route";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log("Server is running."));
