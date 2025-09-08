import { expect } from "chai"
import { initializeTestDb, insertTestUser, getToken } from "./helper/test.js"



describe("Sanity check", () => {
    it("should run tests", () => {
        expect(true).to.equal(true)
    })
})


describe("Testing basic database functionality", () => {


    let token = null
    const testUser = { email: "test_1@email.com", password: "password123" }

    before(() => {
        // Initialize the test database before running tests
        initializeTestDb()
        token = getToken(testUser.email)
    })

    it("should get all tasks", async () => {
        const response = await fetch("http://localhost:3001/")
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an("array").that.is.not.empty
        expect(data[0]).to.include.keys(["id", "description"])
    }),

    it("should add a new task", async () => {
        const newTask = { description: "Test task" }
        const response = await fetch("http://localhost:3001/create", {
            method: "post",
            headers: { "Content-Type": "application/json", "Authorization": token },
            body: JSON.stringify({task : newTask})
        })
        const data = await response.json()

        expect(response.status).to.equal(201)
        expect(data).to.include.all.keys(["id", "description"])
        expect(data.description).to.equal(newTask.description)
    }),

    it("should delete a task", async () => {
        const taskIdToDelete = 1  // Make sure this ID exists in your test database
        const response = await fetch(`http://localhost:3001/delete/${taskIdToDelete}`, {
            method: "delete"
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.include.all.keys("id")
        expect(data.id).to.equal(taskIdToDelete.toString())
    })
})

describe("Testing user management", () => {

    const user = { email: "test_0@email.com", password: "password123" }

    before(() => {
        insertTestUser(user)
    })

    

    it("should sign up a new user", async () => {
        const newUser = { email: "test_2@email.com", password: "password69" }
        const response = await fetch("http://localhost:3001/user/signup", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user : newUser})
        })
        const data = await response.json()
        expect(response.status).to.equal(201)
        expect(data).to.include.all.keys(["id", "email"])
        expect(data.email).to.equal(newUser.email)
    })

    it("should log in an existing user", async () => {
        const response = await fetch("http://localhost:3001/user/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user })
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.include.all.keys(["id", "email", "token"])
        expect(data.email).to.equal(user.email)
    })
})