  
import express from "express";
import rootRouter from "./Routers/rootRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);

export default app;