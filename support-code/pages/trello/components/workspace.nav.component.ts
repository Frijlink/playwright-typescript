import { Locator, Page } from "@playwright/test";

export default class WorkspaceNavComponent {
    private page: Page;
    private nav: Locator;
    private currentBoard: Locator;
    private boardActionsMenuBtn: Locator;
    private closeBoardBtn: Locator;
    private closeBtn: Locator;

    constructor(page: Page) {
        this.page = page
        this.nav = this.page.getByTestId('workspace-navigation-nav')
        this.currentBoard = this.page.getByLabel('(currently active)')
        this.boardActionsMenuBtn = this.page.getByLabel('Board actions menu')
        this.closeBoardBtn = this.page.getByLabel('Close board')
        this.closeBtn = this.page.getByTestId('popover-close-board-confirm')
    }

    async waitForNav(): Promise<void> {
        await this.nav.waitFor()
    }

    async closeCurrentBoard(): Promise<void> {
        await this.currentBoard.hover()
        await this.boardActionsMenuBtn.click()
        await this.closeBoardBtn.click()
        await this.closeBtn.click()
    }
}