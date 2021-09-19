import request from "supertest";
import { app } from "../../app";

it('returns a 201 on successfull signup', async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);
});

it("returns a 400 with an invalid email", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "sdkfjjk",
            password: "password"
        })
        .expect(400);
})

it("returns a 400 with an invalid passowrd", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "sjkdkj@gmail.com",
            password: "a"
        })
        .expect(400);
})

it("returns a 400 with missing email and password", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "sjkd@gmail.com"
        })
        .expect(400);

    await request(app)
        .post("/api/users/signup")
        .send({
            password: "sdkjf"
        })
        .expect(400);
})

it("disallows duplicate emails", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "sfjk"
        })
        .expect(201);
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "sfjk"
        })
        .expect(400);
})

it("sets a cookie after successful signup", async () => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
})