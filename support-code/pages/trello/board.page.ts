import { Locator, Page } from "@playwright/test";

export default class BoardPage {
    private page: Page;
    private mainTitle: Locator;
    private boardNameInput: Locator;
    private board: Locator;
    private leftMenu: Locator;
    private boardMenu: Locator;
    private closeBoardMessage: Locator;
    private deleteBoardBtn: Locator;
    private deleteBoardConfirmBtn: Locator;

    constructor(page: Page) {
        this.page = page
        this.mainTitle = this.page.locator('.board-header h1')
        this.boardNameInput = this.page.getByTestId('board-name-input')
        this.board = this.page.locator('#board')
        this.leftMenu = this.page.getByTestId('workspace-boards-and-views-lists')
        this.boardMenu = this.page.getByLabel('Show menu')
        this.closeBoardMessage = this.page.locator('#content-wrapper p')
        this.deleteBoardBtn = this.page.getByTestId('close-board-delete-board-button')
        this.deleteBoardConfirmBtn = this.page.getByTestId('close-board-delete-board-confirm-button')
    }

    async getMainTitle(): Promise<Locator> {
        return this.mainTitle
    }

    async getCloseBoardMessage(): Promise<Locator> {
        return this.closeBoardMessage
    }

    async waitForPageLoaded(): Promise<void> {
        await this.board.waitFor()
        await this.leftMenu.waitFor()
    }

    async updateBoardName(name: string): Promise<void> {
        await this.mainTitle.click()
        await this.boardNameInput.clear()
        await this.boardNameInput.fill(name)
        await this.page.keyboard.press('Enter')
    }

    async deleteBoard(): Promise<void> {
        await this.boardMenu.click()
        await this.deleteBoardBtn.click()
        await this.deleteBoardConfirmBtn.click()
    }
}