const { createArt, deleteArt, getArt } = require('./art');
const { createUser, deleteUser } = require('./user');

describe("artService", () => {
    it("should create an art with name: artname and user: artuser", async () => {
        let user = await createUser({ Username: "artuser" });

        let art = await createArt({ name: "artname", artic_user: user });
        expect(art).not.toBe(null);
        expect(art.name).toBe("artname");
        expect(art.artic_user.Username).toBe("artuser");

        expect(await deleteArt(art)).toBe(true);
        expect(await getArt(art.id)).toBe(null);

        await deleteUser(user);
    })
});