import { Request, Response  } from "@playwright/test";
export class ApiClient {
    private request: Request;
    constructor(request) {
        console.log()
        this.request = request;
    }
    async createUser(userEmail: string, job: string) {
        const response = await this.request.post("https://reqres.in/api/users", {
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email: userEmail,
                password: job,
            },
        });
        return response;
    };
    async login(userEmail: string, password: string) {
        const response = await this.request.post("https://reqres.in/api/login", {
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email: userEmail,
                password: password,
            },
        });

        return response;
    };

}
