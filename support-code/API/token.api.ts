import { APIRequestContext } from "@playwright/test";

export default class Token {
    request: APIRequestContext;

    constructor(APIRequestContext: APIRequestContext) {
        this.request = APIRequestContext
    }

    async getTokenInfo(apiKey: string, apiToken: string): Promise<any> {
        const url = `${process.env.API_URL}/1/tokens/${apiToken}?key=${apiKey}&token=${apiToken}`
        const response = await this.request.get(url,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )
        return response.json()
    }

}