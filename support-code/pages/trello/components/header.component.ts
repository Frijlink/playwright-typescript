import { Locator, Page } from "@playwright/test";

export default class HeaderComponent {
    private page: Page;
    private logInBtn: Locator;
    private memberInfoBtn: Locator;
    private memberInfoLogoutBtn: Locator;
    private logoutSubmitBtn: Locator;
    private trelloBtn: Locator;

    constructor(page: Page) {
        this.page = page
        this.logInBtn = this.page.locator('header a[class^="Buttonsstyles__Button"][href^="https://id.atlassian.com/login?application=trello"]')
        this.memberInfoBtn = this.page.getByTestId('header-member-menu-button')
        this.memberInfoLogoutBtn = this.page.getByTestId('account-menu-logout')
        this.logoutSubmitBtn = this.page.locator('button#logout-submit')
        this.trelloBtn = this.page.getByLabel('Back to home')
    }

    async getLoginBtn(): Promise<Locator> {
        return this.logInBtn
    }

    async getTrelloBtn(): Promise<Locator> {
        return this.trelloBtn
    }

    async logOut(): Promise<void> {
        this.memberInfoBtn.click()
        this.memberInfoLogoutBtn.click()
        this.logoutSubmitBtn.click()
    }
}