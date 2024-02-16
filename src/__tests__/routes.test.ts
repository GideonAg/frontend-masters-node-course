import app from "../server";
import request from "supertest";

describe("GET /", () => {
  it("get some json data", async () => {
    const res = await request(app).get("/");

    expect(res.status).toEqual(200);
    expect(res.body.message).toBe("Jesus saves");
    expect(res.body).toStrictEqual({ message: "Jesus saves" });
  });
});
