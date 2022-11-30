import { APIRequestContext } from "@playwright/test";
import BoardsApi from "./boards.api";
import MembersApi from "./members.api";
import TokenApi from "./token.api";

export default class ApiIndex {
    token: TokenApi;
    members: MembersApi;
    boards: BoardsApi;

    constructor(APIRequestContext: APIRequestContext) {
        this.token = new TokenApi(APIRequestContext)
        this.members = new MembersApi(APIRequestContext)
        this.boards = new BoardsApi(APIRequestContext)
    }
}