import express from "express";
import 'express-async-errors';
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/currentuser";
import { signUpRouter } from "./routes/signup";
import { singInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handlers";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(express.json());

// importing routes
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(singInRouter);
app.use(signOutRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError()
});

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("DB Connected");
    } catch (err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000 !");
    });
};

start();