import { APIRequestContext } from "@playwright/test";

const apiUrl = process.env.API_URL

export default class BoardsApi {
    request: APIRequestContext;

    constructor(APIRequestContext: APIRequestContext) {
        this.request = APIRequestContext
    }

    async createBoard(
        apiKey: string,
        apiToken: string,
        name: string,
        colour: string,
        visibility: string,
    ): Promise<any> {
        const url = `${apiUrl}/1/boards/`
        const response = await this.request.post(url,
            {
                headers: {
                    Accept: 'application/json'
                },
                params: {
                    name,
                    key: apiKey,
                    token: apiToken,
                    prefs_background: colour,
                    prefs_permissionLevel: visibility,
                }
            }
        )
        return response.json()
    }

    async getBoard(boardId: string, key: string, token: string): Promise<any> {
        const url = `${apiUrl}/1/boards/${boardId}?key=${key}&token=${token}`
        const response = await this.request.get(url,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )
        return response.json()
    }

    async updateBoard(
        id: string,
        params: {
            [key: string]: string | number | boolean;
        }
    ): Promise<any> {
        const url = `${apiUrl}/1/boards/${id}`
        const response = await this.request.put(url,
            {
                headers: {
                    Accept: 'application/json'
                },
                params
            }
        )
        return response.json()
    }

    async deleteBoard(boardId: string, key: string, token: string): Promise<number> {
        const url = `${apiUrl}/1/boards/${boardId}?key=${key}&token=${token}`
        const response = await this.request.delete(url,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        )
        return response.status()
    }

}