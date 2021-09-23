import request from "supertest";
import { app } from "../../app";
import jwt from "jsonwebtoken";

function signIn() {
    // Build a JWT payload. {id, email}
    const payload = {
        id: "123456",
        email: "test@test.com"
    };

    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session Object, {jwt:MY_JWT}
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session)

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString("base64");

    return [`express:sess=${base64}`];
}

it("has a route handler listening to /api/tickets for post requests", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({});

    expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({})
        .expect(401);
});

it("returns a status other than 401 if user is signed in", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", signIn())
        .send({})

    expect(response.status).not.toEqual(401);
})

it("returns an error if an invalid title is provided", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", signIn())
        .send({
            title: "",
            price: 10
        })
        .expect(400);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", signIn())
        .send({
            price: 10
        })
        .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
    await request(app)
        .post("/api/tickets")
        .set("Cookie", signIn())
        .send({
            title: "test",
            price: ''
        })
        .expect(400);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", signIn())
        .send({
            title: "test"
        })
        .expect(400);
});

it("created a ticket with valid parameters", async () => {

});