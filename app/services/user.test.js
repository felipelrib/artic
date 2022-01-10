const { getUser, createUser, deleteUser } = require('./user.js');

describe("userService", () => {
    it("should create an user", async () => {
        const params = {
            Username: "createUser"
        }

        let user = await getUser(params.Username);
        expect(user).toBe(null);

        await createUser(params);

        user = await getUser(params.Username);
        expect(user).not.toBe(null);
        await deleteUser(user);
    });

    it("should keep the params after creating", async () => {
        const params = {
            Username: "createUserWithParams",
            Bio: "Test"
        }
        await createUser(params);

        const user = await getUser(params.Username);
        expect(user.Bio).toBe(params.Bio);

        await deleteUser(user);
    });

    it("should delete an user", async () => {
        const params = {
            Username: "deleteUser"
        }

        let user = await createUser(params);
        await deleteUser(user);

        user = await getUser(params.Username);
        expect(user).toBe(null);
    });
});
