import { Locator, Page } from "@playwright/test";

export default class HomePage {
    private page: Page;
    private sectionHeader: Locator;
    private newBoardBtn: Locator;
    private newBoardNameInput: Locator;
    private selectVisibilityDropdown: Locator;
    private visibilityPrivateBtn: Locator;
    private visibilityWorkspaceBtn: Locator;
    private visibilityPublicBtn: Locator;
    private createNewBoardSubmitBtn: Locator;
    private boardTileTitle: Locator;

    constructor(page: Page) {
        this.page = page
        this.sectionHeader = this.page.locator('h3.boards-page-section-header-name')
        this.newBoardBtn = this.page.locator('[data-testid="create-board-tile"]')
        this.newBoardNameInput = this.page.locator('[data-testid="create-board-title-input"]')
        this.selectVisibilityDropdown = this.page.locator('[id$="create-board-select-visibility"] > div > div > div:nth-child(1)')
        this.visibilityPrivateBtn = this.page.locator('#react-select-4-option-0 li')
        this.visibilityWorkspaceBtn = this.page.locator('#react-select-4-option-1 li')
        this.visibilityPublicBtn = this.page.locator('#react-select-4-option-2 li')
        this.createNewBoardSubmitBtn = this.page.locator('[data-testid="create-board-submit-button"]')
        this.boardTileTitle = this.page.locator('.board-tile-details-name')
    }

    async goto(): Promise<void> {
        await this.page.goto('')
    }

    async getSectionHeader(): Promise<Locator> {
        return this.sectionHeader
    }

    async getAllBoardNames(): Promise<string[]> {
        return (await this.boardTileTitle.isVisible()) ? (this.boardTileTitle).allInnerTexts() : []
    }

    // TODO: This. What the hell is this selector
    async selectVisibility(visibility: string): Promise<void> {
        await this.selectVisibilityDropdown.click()

        switch(visibility) {
            case 'private':
                await this.page.waitForSelector('#react-select-4-option-0')
                await this.visibilityPrivateBtn.click()
                // await this.page.keyboard.press('ArrowUp')
                // await this.page.keyboard.press('Enter')
                break
                case 'workspace':
                    // await this.visibilityWorkspaceBtn.click()
                    await this.page.keyboard.press('Enter')
                break
            case 'public':
                // await this.visibilityPublicBtn.click()
                await this.page.keyboard.press('ArrowDown')
                await this.page.keyboard.press('Enter')
                await this.page.getByText('Yes, make board public').click()
                break
        }
    }

    async createNewBoard(name: string, backgroundColour: string): Promise<void> {
        await this.newBoardBtn.click()
        await this.page.locator(`button[title="${backgroundColour}"]`).click()
        await this.newBoardNameInput.type(name, { delay: 50 })
        // await this.selectVisibility(visibility)
        await this.createNewBoardSubmitBtn.waitFor({state: 'attached'})
        await this.createNewBoardSubmitBtn.click()
        await this.page.waitForURL(`**/${name.replace(' ', '-').toLowerCase()}`)
    }
}