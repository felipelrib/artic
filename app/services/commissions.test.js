const { createCommission, getRequestedCommissions, acceptCommission, rejectCommission, getCommission, deleteCommission } = require('./commissions.js');
const { createUser, getUser, deleteUser } = require('./user.js');

describe("commissionsService", () => {
    it("should create a commission", async () => {
        let username1 = "createCommission";
        let username2 = "createCommission2";
        await createUser({ Username: username1 });
        await createUser({ Username: username2 });
        let user1 = await getUser(username1);
        let user2 = await getUser(username2);
        const params = {
            executor: user1,
            requester: user2,
            description: "dummy"
        }

        let commission = await createCommission(params);
        commission = await getCommission(commission.id);
        expect(commission).not.toBe(null);
        await deleteUser(user1);
        await deleteUser(user2);
        await deleteCommission(commission.id);
    });

    it("should delete a commission", async () => {
        let username1 = "deleteCommission";
        let username2 = "deleteCommission2";
        await createUser({ Username: username1 });
        await createUser({ Username: username2 });
        let user1 = await getUser(username1);
        let user2 = await getUser(username2);
        const params = {
            executor: user1,
            requester: user2,
            description: "dummy"
        }

        let commission = await createCommission(params);
        await deleteCommission(commission.id);
        try {
            commission = await getCommission(commission.id);
        } catch (err) {
            expect(commission).toBe(null);
        }
        await deleteUser(user1);
        await deleteUser(user2);
    });

    it("should not create a commission with the same requester and executor", async () => {
        let username = "requesterAndExecutor";
        await createUser({ Username: username });
        let user = await getUser(username);
        const params = {
            executor: user,
            requester: user,
            description: "dummy"
        }

        let commission = await createCommission(params);
        expect(commission).toBe(null);
        let commissions = await getRequestedCommissions(username);
        expect(commissions.length).toBe(0);
        await deleteUser(user);
    });

    it("should create commission with accepted status as null", async () => {
        let username1 = "acceptedNull";
        let username2 = "acceptedNull2";
        await createUser({ Username: username1 });
        await createUser({ Username: username2 });
        let user1 = await getUser(username1);
        let user2 = await getUser(username2);
        const params = {
            executor: user1,
            requester: user2,
            description: "dummy"
        }

        let commission = await createCommission(params);
        expect(commission.accepted).toBe(null);
        await deleteUser(user1);
        await deleteUser(user2);
        await deleteCommission(commission.id);
    });

    it("should change commission status when accepting", async () => {
        let username1 = "acceptCommission";
        let username2 = "acceptCommission2";
        await createUser({ Username: username1 });
        await createUser({ Username: username2 });
        let user1 = await getUser(username1);
        let user2 = await getUser(username2);
        const params = {
            executor: user1,
            requester: user2,
            description: "dummy"
        }

        let commission = await createCommission(params);
        await acceptCommission(commission.id);
        commission = await getCommission(commission.id);
        expect(commission.accepted).toBe(true);
        await deleteUser(user1);
        await deleteUser(user2);
        await deleteCommission(commission.id);
    });

    it("should change commission status when rejecting", async () => {
        let username1 = "rejectCommission";
        let username2 = "rejectCommission2";
        await createUser({ Username: username1 });
        await createUser({ Username: username2 });
        let user1 = await getUser(username1);
        let user2 = await getUser(username2);
        const params = {
            executor: user1,
            requester: user2,
            description: "dummy"
        }

        let commission = await createCommission(params);
        await rejectCommission(commission.id);
        commission = await getCommission(commission.id);
        expect(commission.accepted).toBe(false);
        await deleteUser(user1);
        await deleteUser(user2);
        await deleteCommission(commission.id);
    });
});