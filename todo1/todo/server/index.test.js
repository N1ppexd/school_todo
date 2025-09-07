import { expect } from "chai"

describe("Testing basic database functionality", () => {
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
            headers: { "Content-Type": "application/json" },
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