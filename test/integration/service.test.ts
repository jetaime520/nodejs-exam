import request from "supertest";
import app from "../../src/app";

async function getToken() {
  const email = `u_${Date.now()}@test.com`;

  await request(app.callback())
    .post("/auth/register")
    .send({ email, password: "123456", name: "Test User" })
    .expect(200);

  const login = await request(app.callback())
    .post("/auth/login")
    .send({ email, password: "123456" })
    .expect(200);

  return login.body.data.token as string;
}

describe("Services", () => {
  it("public GET /services should return array", async () => {
    const res = await request(app.callback()).get("/services").expect(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("admin CRUD requires token and soft delete hides from public list", async () => {
    // 1) no token => 401
    await request(app.callback())
      .post("/admin/services")
      .send({ name: "Perm", price: 2000, showTime: 120 })
      .expect(401);

    const token = await getToken();

    // 2) create
    const created = await request(app.callback())
      .post("/admin/services")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Perm", description: "Digital perm", price: 2000, showTime: 120, order: 99, isPublic: true })
      .expect(200);

    const id = created.body.data.id as string;
    expect(id).toBeTruthy();

    // 3) update
    const updated = await request(app.callback())
      .put(`/admin/services/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ price: 2200 })
      .expect(200);

    expect(updated.body.data.price).toBe(2200);

    // 4) delete (soft)
    await request(app.callback())
      .delete(`/admin/services/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    // 5) public list should not include it (isRemove=true)
    const list = await request(app.callback()).get("/services").expect(200);
    const ids = (list.body.data as any[]).map((x) => x.id);
    expect(ids).not.toContain(id);
  });
});