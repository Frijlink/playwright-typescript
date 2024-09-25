import { Locator, Page } from "@playwright/test";

export default class LoginPage {
    private page: Page;
    private userInput: Locator;
    private passwordInput: Locator;
    private loginSubmitBtn: Locator;

    constructor(page: Page) {
        this.page = page
        this.userInput = this.page.getByTestId('username')
        this.passwordInput = this.page.getByTestId('password')
        this.loginSubmitBtn = this.page.locator('button#login-submit')
    }

    async login(user: any, password: any): Promise<void> {
      await this.userInput.fill(user)
      await this.loginSubmitBtn.click()
      await this.passwordInput.fill(password)
      await this.loginSubmitBtn.click()
    }

}