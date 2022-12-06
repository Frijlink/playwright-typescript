import { Locator, Page } from "@playwright/test";

export default class HeaderComponent {
    private page: Page;
    private logInBtn: Locator;
    private memberInfoBtn: Locator;
    private memberInfoLogoutBtn: Locator;
    private logoutSubmitBtn: Locator;

    constructor(page: Page) {
        this.page = page
        this.logInBtn = this.page.locator('a[class^="Buttonsstyles"][href="/login"]')
        this.memberInfoBtn = this.page.locator('[data-testid="header-member-menu-button"]')
        this.memberInfoLogoutBtn = this.page.locator('[data-testid="header-member-menu-logout"]')
        this.logoutSubmitBtn = this.page.locator('button#logout-submit')
    }

    async getLoginBtn(): Promise<Locator> {
        return this.logInBtn
    }

    async logOut(): Promise<void> {
        this.memberInfoBtn.click()
        this.memberInfoLogoutBtn.click()
        this.logoutSubmitBtn.click()
    }
}