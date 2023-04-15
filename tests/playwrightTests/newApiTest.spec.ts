import { expect, test } from "@playwright/test";

test.describe("API tests", () => {
    let userId;

    test("Create new user", async ({ request }) => {
        try {
            const createUserResponse = await request.post(
                "https://reqres.in/api/users",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        name: "John Doe",
                        job: "Engineer",
                    },
                }
            );
            expect(createUserResponse.status()).toBe(201);
            const createUserResponseJson = await createUserResponse.json();
            userId = createUserResponseJson.id.toString();
            console.log(`Created user with ID: ${userId}`);
        } catch (e) {
            console.error(`Error creating user: ${e}`);
        }
    });

    test("Verify user is created", async ({ request }) => {
        try {
            if (!userId) {
                console.error(`User ID not found. Did you forget to create the user first?`);
                return;
            }
            const getUserListResponse = await request.get(
                `https://reqres.in/api/users?search=${encodeURIComponent(
                    "John Doe"
                )}`
            );
            expect(getUserListResponse.status()).toBe(200);
            const getUserListResponseJson = await getUserListResponse.json();
            const createdUser = getUserListResponseJson.data.find(
                (user) => user.id.toString() === userId
            );
            expect(createdUser).toBeTruthy();
            console.log(`Verified user with ID ${userId} is created`);
        } catch (e) {
            console.error(`Error verifying user: ${e}`);
        }
    });
});
