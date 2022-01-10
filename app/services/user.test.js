const { getUser } = require('./user.js');

describe("userService", () => {
    it("should get a user by username", async () => {
        const user = await getUser("felipelrib");
        expect(user).not.toBe(null)
    });
});
