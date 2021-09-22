import express from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/currentuser";
import { signUpRouter } from "./routes/signup";
import { singInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { errorHandler, NotFoundError } from "@wikietickets/common";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}))

// importing routes
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(singInRouter);
app.use(signOutRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError()
});

app.use(errorHandler);

export { app };