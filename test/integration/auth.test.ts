import request from "supertest";
import app from "../../src/app";

describe("Auth", () => {
  it("register + login should return token", async () => {
    const email = `u_${Date.now()}@test.com`;

    const r1 = await request(app.callback())
      .post("/auth/register")
      .send({ email, password: "123456", name: "Test User" })
      .expect(200);

    expect(r1.body.data.email).toBe(email);

    const r2 = await request(app.callback())
      .post("/auth/login")
      .send({ email, password: "123456" })
      .expect(200);

    expect(typeof r2.body.data.token).toBe("string");
    expect(r2.body.data.token.length).toBeGreaterThan(20);
  });
});