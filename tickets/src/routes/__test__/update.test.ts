import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import signIn from "./helper/signIn";

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', signIn())
        .send({
            title: "testtitle",
            price: 20
        })
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: "testTicket",
            price: 20
        })
        .expect(401);
});

it('returns a 401 if the user id does not own the ticket', async () => {

});

it('returns a 400 if the user provides an invalid title or price', async () => {

});

it('updates the ticket provided valid inputs', async () => {

});