import {expect, test} from "@playwright/test";
import {ApiClient} from "../tools/apiClient"


test.describe("API tests", () => {
    let listOfUsersJson;
    let userEmail;
    let id;
    let apiClient

    test.beforeAll(async ({request}) => {
        const response = await request.get("https://reqres.in/api/users");
        expect(response.status()).toBe(200);
        listOfUsersJson = await response.json();
        userEmail = listOfUsersJson.data[0].email;
        id = listOfUsersJson.data[0].id;
        apiClient = new ApiClient(request);
    });
    test("create new user", async () => {
        const response = await apiClient.createUser("omer", "player");
        expect(response.status()).toBe(201);

    })
    test("login user", async () => {
        const response = await apiClient.login("eve.holt@reqres.in", "cityslicka");
        expect(response.status()).toBe(200);

    })
    // test("register with one user", async ({request}) => {
    //
    //
    //     const response = await request.post("https://reqres.in/api/register", {
    //         headers: {"Content-Type": "application/json"},
    //         data: {
    //             email: "eve.holt@reqres.in",
    //             password: "pistol"
    //         },
    //
    //
    //     });
    //     expect(response.status()).toBe(201);
    // });
    // test.only("create  with one user", async ({request}) => {
    //     const response = await request.post("https://reqres.in/api/users", {
    //         headers: {"Content-Type": "application/json"},
    //         data: {
    //             email: "omer@omer.qa",
    //             password: "koko"
    //         },
    //
    //
    //     });
    //     expect(response.status()).toBe(204);
    // });
    //
    // test("login with user", async ({request}) => {
    //     const response = await request.post("https://reqres.in/api/login", {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         data: {
    //             email: userEmail,
    //             password: password,
    //         },
    //     });
    //     expect(response.status()).toBe(200);
    // });
    //
    // test("delete user", async ({request}) => {
    //     const response = await request.delete(
    //         `https://reqres.in/api/users/${id}`,
    //         {}
    //     );
    //     expect(response.status()).toBe(204);
    // });
    //
    // test("login with deleted user", async ({request}) => {
    //     const response = await request.post("https://reqres.in/api/login", {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         data: {
    //             email: userEmail,
    //             password: password,
    //         },
    //     });
    //     expect(response.status()).toBe(200);
    // });
    //
    // test.only("change user name via API", async ({request}) => {
    //     const userId = 2; // ID of the user whose name we want to change
    //     const newName = "New Name"; // The new name we want to assign to the user
    //
    //     // First, let's get the details of the user
    //     const response = await request.get(`https://reqres.in/api/users/${userId}`);
    //     expect(response.status()).toBe(200);
    //
    //     // Now, let's update the user's name with the new name
    //     const userData = await response.json();
    //     const updatedUserData = {...userData, name: newName};
    //
    //     const updateResponse = await request.put(`https://reqres.in/api/users/${userId}`, {
    //         headers: {"Content-Type": "application/json"},
    //         data: updatedUserData,
    //     });
    //
    //     expect(updateResponse.status()).toBe(200);
    //     const updatedUser = await updateResponse.json();
    //
    //     // Finally, let's make sure that the user's name has been updated correctly
    //     expect(updatedUser.name).toBe(newName);
    // });
});
