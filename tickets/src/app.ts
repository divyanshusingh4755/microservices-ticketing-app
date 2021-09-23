import express from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";

import { errorHandler, NotFoundError, currentUser } from "@wikietickets/common";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}));
app.use(currentUser);

// importing routes
app.use(createTicketRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError()
});

app.use(errorHandler);

export { app };