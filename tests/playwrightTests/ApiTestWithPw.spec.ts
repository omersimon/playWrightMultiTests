import {expect, test} from "@playwright/test";


test.describe.serial('api tests', () => {
    let userId;
    test('create user', async ({request}) => {
        await createUser(request);
        console.log("bbb", userId)
    });

    test('validate user exists', async ({request}) => {
        if (!userId) {
            console.error(`userId not found. Did you forget to create the user first?`);
            return;
        }
        await validateUserExist(request);
    });

    const createUser = async (request) => {
        try {
            const createUserResponse = await request.post('https://reqres.in/api/users', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    name: 'omer',
                    job: 'teacher'
                }
            });
            expect(createUserResponse.status()).toBe(201);
            const createUserResponseJson = await createUserResponse.json();
            userId = createUserResponseJson.id.toString();;

            console.log('user id: ', userId);

        } catch (e) {
            console.error(`error when trying to create user: ${e} `)
        }
    };
    const validateUserExist = async (request) => {
        try {
            const url= `https://reqres.in/api/users/${userId}`
            const getUserResponse = await request.get(url);
            const getUserResponseJson = await getUserResponse.json();
            console.log("this is get response: ", getUserResponseJson)
            expect(getUserResponse.status()).toBe(200);
        } catch (e) {
            console.error(`something went wrong: ${e} `)
        }
    };
});

