const { getAlbum, createAlbum, deleteAlbum, removeArtFomAlbum } = require('./album');
const { createUser, deleteUser } = require('./user');
const { createArt, deleteArt } = require('./art');

describe("albumService", () => {
    it("should create and delete an album with name: createdAlbum", async () => {
        // setup
        let user = await createUser({ Username: "albumTest1" });
        let art = await createArt({ name: "art", artic_user: user });
        let album = null;
        album = await createAlbum({
            name: "createdAlbum",
            artic_user: user,
            arts: [art]
        });

        // test
        expect(album).not.toBe(null);
        expect(album.name).toBe("createdAlbum");
        expect(await deleteAlbum(album)).toBe(true);
        expect(await getAlbum(album.id)).toBe(null);

        // teardown
        await deleteUser(user);
        await deleteArt(art);
    });

    it("should not create an album with no arts associated", async () => {
        // setup
        let user = await createUser({ Username: "albumTest2" });
        let album = null;
        album = await createAlbum({
            name: "createdAlbum",
            artic_user: user,
            arts: []
        });

        // test
        expect(album).toBe(null);

        // teardown
        await deleteUser(user);
    });

    it("should not remove an art that is not on the album", async () => {
        // setup
        let user = await createUser({ Username: "albumTest3" });
        let art1 = await createArt({ name: "art1", artic_user: user });
        let art2 = await createArt({ name: "art2", artic_user: user });
        let album = null;
        album = await createAlbum({
            name: "album2",
            artic_user: user,
            arts: [art1]
        });

        // test
        expect(await removeArtFomAlbum(album, art2)).toBe(null); 

        // teardown
        await deleteUser(user);
        await deleteArt(art1);
        await deleteArt(art2);
        await deleteAlbum(album);
    });

    it("should delete an album if trying to remove its only art", async () => {
        // setup
        let user = await createUser({ Username: "albumTest4" });
        let art = await createArt({ name: "art", artic_user: user });
        let album = null;
        album = await createAlbum({
            name: "createdAlbum",
            artic_user: user,
            arts: [art]
        });

        // test
        expect(await removeArtFomAlbum(album, art)).toBe(null); 
        expect(await getAlbum(album.id)).toBe(null);

        // teardown
        await deleteUser(user);
        await deleteArt(art);
    });

    it("should not create an album with an art that does not belong to the user", async () => {
        // setup
        let user1 = await createUser({ Username: "albumTest5" });
        let user2 = await createUser({ Username: "albumTest6" });
        let art_from_user_1 = await createArt({ name: "art", artic_user: user1 });
        let album = await createAlbum({
            name: "createdAlbum",
            artic_user: user2,
            arts: [art_from_user_1]
        });

        // test
        expect(album).toBe(null);

        // teardown
        await deleteUser(user1);
        await deleteUser(user2);
        await deleteArt(art_from_user_1);
    });
});