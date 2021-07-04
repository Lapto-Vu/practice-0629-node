import express from "express";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./Routers/rootRouter";
import userRouter from "./Routers/userRouter";
import videoRouter from "./Routers/videoRouter";
import apiRouter from "./Routers/apiRouter";
import { localsMiddleware } from "./middleware";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.json());
app.use(session({
		secret: "Hello!",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/bolgyu" })
}));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(localsMiddleware);
app.use("/assets", express.static("assets"));
app.use("/uploads", express.static("uploads"))
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter)

export default app;