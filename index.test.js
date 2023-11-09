const { beforeEach, it, describe } = require("@jest/globals");
const express = require("express");
const request = require("supertest");
const app = require("./src/app");
const { seedUsers } = require("./seedData");
const { seedFruits } = require("./seedData");
const { syncSeed } = require("./seed");

beforeEach(async () => {
  await syncSeed();
});

describe("GET/users", () => {
  it("reaches endpoint successfully", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
  });
  it("returns list of all users", async () => {
    const allUsers = await request(app).get("/users");
    const usersArray = JSON.parse(allUsers.text);
    expect(usersArray.length).toBe(seedUsers.length);
    for (x in usersArray) {
      expect(usersArray[x].name).toBe(seedUsers[x].name);
    }
  });
});

describe("GET/users/:id", () => {
  it("reaches endpoint successfully", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
  });
  it("returns correct user", async () => {
    const user = await request(app).get("/users/1");
    userData = JSON.parse(user.text);
    expect([userData.name, userData.age]).toEqual([
      seedUsers[0].name,
      seedUsers[0].age,
    ]);
  });
});

describe("POST/users", () => {
  it("reaches endpoint successfully", async () => {
    const response = await request(app).post("/users");
    expect(response.statusCode).toBe(200);
  });
  it("successfully adds a user", async () => {
    await request(app).post("/users").send({ name: "User 5", age: 26 });
    const allUsers = await request(app).get("/users");
    userArray = JSON.parse(allUsers.text);
    const x = userArray.length - 1;
    expect([userArray[x].name, userArray[x].age]).toEqual(["User 5", 26]);
  });
});

describe("PUT/users/:id", () => {
  it("reaches endpoint successfully", async () => {
    const response = await request(app).put("/users/1");
    expect(response.status).toBe(200);
  });
  it("replaces user correctly", async () => {
    await request(app).put("/users/1").send({ name: "User 5", age: 26 });
    const allUsers = await request(app).get("/users");
    const usersArray = JSON.parse(allUsers.text);
    expect([usersArray[0].name, usersArray[0].age]).toEqual(["User 5", 26]);
  });
});

describe("DELETE/users/:id", () => {
  it("reaches endpoint successfully", async () => {
    const response = await request(app).delete("/users/1");
    expect(response.statusCode).toBe(200);
  });
  it("deletes a user", async () => {
    await request(app).delete("/users/1");
    const allUsers = await request(app).get("/users");
    const userArray = JSON.parse(allUsers.text);
    expect(userArray.length).toBe(seedUsers.length - 1);
  });
  it("deletes correct user", async () => {
    await request(app).delete("/users/1");
    const allUsers = await request(app).get("/users");
    const userArray = JSON.parse(allUsers.text);
    expect([userArray[0].name, userArray[0].age]).toEqual([
      seedUsers[1].name,
      seedUsers[1].age,
    ]);
  });
});

describe("GET/fruits", () => {
  it("reaches endpoint successfully", async () => {
    const response = await request(app).get("/fruits");
    expect(response.statusCode).toBe(200);
  });
  it("returns list of all fruits", async () => {
    const allFruits = await request(app).get("/fruits");
    const fruitsArray = JSON.parse(allFruits.text);
    expect(fruitsArray.length).toBe(seedFruits.length);
    for (x in fruitsArray) {
      expect(fruitsArray[x].name).toBe(seedFruits[x].name);
    }
  });
});

describe("GET/fruits/:id", () => {
  it("reaches endpoint successfully", async () => {
    const response = await request(app).get("/fruits");
    expect(response.statusCode).toBe(200);
  });
  it("returns correct fruit", async () => {
    const fruit = await request(app).get("/fruits/1");
    fruitData = JSON.parse(fruit.text);
    expect([fruitData.name, fruitData.color]).toEqual([
      seedFruits[0].name,
      seedFruits[0].color,
    ]);
  });
});

describe("POST/fruits", () => {
  it("reaches endpoint successfully", async () => {
    const response = await request(app).post("/fruits");
    expect(response.statusCode).toBe(200);
  });
  it("successfully adds a fruit", async () => {
    await request(app)
      .post("/fruits")
      .send({ name: "Dragon Fruit", color: "Pink" });
    const allFruits = await request(app).get("/fruits");
    fruitArray = JSON.parse(allFruits.text);
    const x = fruitArray.length - 1;
    expect([fruitArray[x].name, fruitArray[x].color]).toEqual([
      "Dragon Fruit",
      "Pink",
    ]);
  });
});

describe("PUT/fruits/:id", () => {
  it("reaches endpoint successfully", async () => {
    const response = await request(app).put("/fruits/1");
    expect(response.status).toBe(200);
  });
  it("replaces fruit correctly", async () => {
    await request(app)
      .put("/fruits/1")
      .send({ name: "Dragon Fruit", color: "Pink" });
    const allFruits = await request(app).get("/fruits");
    const fruitsArray = JSON.parse(allFruits.text);
    expect([fruitsArray[0].name, fruitsArray[0].color]).toEqual([
      "Dragon Fruit",
      "Pink",
    ]);
  });
});

describe("DELETE/fruits/:id", () => {
  it("reaches endpoint successfully", async () => {
    const response = await request(app).delete("/fruits/1");
    expect(response.statusCode).toBe(200);
  });
  it("deletes a fruit", async () => {
    await request(app).delete("/fruits/1");
    const allFruits = await request(app).get("/fruits");
    const fruitArray = JSON.parse(allFruits.text);
    expect(fruitArray.length).toBe(seedFruits.length - 1);
  });
  it("deletes correct fruit", async () => {
    await request(app).delete("/fruits/1");
    const allFruits = await request(app).get("/fruits");
    const fruitArray = JSON.parse(allFruits.text);
    expect([fruitArray[0].name, fruitArray[0].color]).toEqual([
      seedFruits[1].name,
      seedFruits[1].color,
    ]);
  });
});
