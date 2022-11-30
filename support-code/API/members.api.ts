import { APIRequestContext } from "@playwright/test";

const apiUrl = process.env.API_URL

export default class MembersApi {
    request: APIRequestContext;

    constructor(APIRequestContext: APIRequestContext) {
        this.request = APIRequestContext
    }

    async getBoardsFromMember(apiKey: string, apiToken: string): Promise<any> {
        const url = `${apiUrl}/1/members/me/boards?key=${apiKey}&token=${apiToken}`
        const response = await this.request.get(url,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )
        return response.json()
    }

    async getMemberOrganizations(memberId: string, apiKey: string, apiToken: string): Promise<any> {
        const url = `${apiUrl}/1/members/${memberId}/organizations?key=${apiKey}&token=${apiToken}`
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