import { test, expect } from "@playwright/test";

test.describe.parallel("API Tests", () => {
  const baseUrl = "https://reqres.in";
  test("test valid response", async ({ request }) => {
    const response = await request.get(`${baseUrl}/api/users/2`);
    expect(response.status()).toBe(200);
    const responseBody = await JSON.parse(await response.text());
  });
  test("test hitting endpoint not exist", async ({ request }) => {
    const response = await request.get(`${baseUrl}/endpoint-not-exist`);
    expect(response.status()).toBe(404);
  });

  test("GET request - get user details", async ({ request }) => {
    const response = await request.get(`${baseUrl}/api/users/1`);
    const responseBody = await JSON.parse(await response.text());

    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toEqual(1);
    expect(responseBody.data.first_name).toEqual("George");
    expect(responseBody.data.last_name).toEqual("Bluth");
    expect(responseBody.data.email).toBeTruthy();
  });

  test("POST request - Create new user", async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/users`, {
      data: {
        name: "wez",
        job: "lead",
      },
    });
    const responseBody = await JSON.parse(await response.text());
    expect(response.status()).toBe(201);
    expect(responseBody.name).toEqual("wez");
    expect(responseBody.job).toEqual("lead");
    expect(responseBody.createdAt).toBeTruthy();
  });

  test("POST request - successful login", async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/login`, {
      data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    });
    const responseBody = await JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.token).toBeTruthy();
  });

  test("POST request - unsuccessful login", async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/login`, {
      data: {
        email: "eve.user-not-found@reqres.in",
      },
    });
    const responseBody = await JSON.parse(await response.text());
    expect(response.status()).toBe(400);
    expect(responseBody.error).toEqual("Missing password");
  });

  test("PUT request - update user", async ({ request }) => {
    const response = await request.put(`${baseUrl}/api/users/2`, {
      data: {
        name: "wezwez",
        job: "manager",
      },
    });
    const responseBody = await JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.name).toEqual("wezwez");
    expect(responseBody.job).toEqual("manager");
  });

  test("DELETE request - delete user", async ({ request }) => {
    const response = await request.delete(`${baseUrl}/api/users/2`);
    expect(response.status()).toBe(204);
  });
});
