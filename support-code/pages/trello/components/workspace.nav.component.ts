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
        this.nav = this.page.locator('nav[data-testid="workspace-navigation-nav"]')
        this.currentBoard = this.page.locator('[aria-label$="(currently active)"]')
        this.boardActionsMenuBtn = this.page.locator('[aria-label="Board actions menu"]')
        this.closeBoardBtn = this.page.locator('[aria-label="Close board"]')
        this.closeBtn = this.page.locator('[title="Close"]')
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