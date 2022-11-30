import { Page } from "@playwright/test";
import BoardPage from "./board.page";
import HeaderComponent from "./components/header.component";
import WorkspaceNavComponent from "./components/workspace.nav.component";
import HomePage from "./home.page";
import LoginPage from "./login.page";

export default class TrelloIndex {
    page: Page;
    loginPage: LoginPage;
    homePage: HomePage;
    header: HeaderComponent;
    boardPage: BoardPage;
    workSpaceNav: WorkspaceNavComponent;


    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(page)
        this.homePage = new HomePage(page)
        this.header = new HeaderComponent(page)
        this.boardPage = new BoardPage(page)
        this.workSpaceNav = new WorkspaceNavComponent(page)
    }
}