import { expect } from '@playwright/test'
import { test } from '../../support-code/pages/index'
import TestDataGenerator from '../../support-code/utilities/test_data_generator'

const boardName = TestDataGenerator.generateBoardName()
const updatedBoardName = TestDataGenerator.generateBoardName()
let boardDeleted = false

test.beforeEach(async ({ trello }) => {
    await trello.homePage.goto()
    await (await trello.header.getLoginBtn()).click()
    await trello.loginPage.login(
        process.env.USER_NAME,
        process.env.PASSWORD
    )
    await expect(await trello.homePage.getSectionHeader()).toContainText('YOUR WORKSPACES', { timeout: 30000 })
})

test('CRUD Trello board through UI', async ({ trello }) => {
    await test.step('create board', async () => {
        await trello.homePage.createNewBoard(boardName, '🌈')
        await trello.boardPage.waitForPageLoaded()
        await trello.workSpaceNav.waitForNav()

        await expect(await trello.boardPage.getMainTitle()).toContainText(boardName)
    })

    await test.step('update board name', async () => {
        await trello.boardPage.updateBoardName(updatedBoardName)

        await expect(await trello.boardPage.getMainTitle()).toContainText(updatedBoardName)
    })

    await test.step('close board', async () => {
        await trello.workSpaceNav.closeCurrentBoard()

        await expect(await trello.boardPage.getCloseBoardMessage()).toContainText('This board is closed. Reopen the board to make changes.')
    })

    await test.step('delete board', async () => {
        await trello.boardPage.deleteBoard()
        await (await trello.header.getTrelloBtn()).click()

        await expect(await trello.homePage.getSectionHeader()).toContainText('YOUR WORKSPACES')
        expect(await trello.homePage.getAllBoardNames()).not.toContain(updatedBoardName)

        boardDeleted = true
    })
})

test.afterAll(async ({ API }) => {
    const token = `${process.env.API_TOKEN}`
    const key = `${process.env.API_KEY}`
    const boards = await API.members.getBoardsFromMember(key, token)
    for (const board of boards) {
        if (board.name == boardName && boardDeleted == false) {
            const responseStatus = await API.boards.deleteBoard(board.id, key, token)
            expect(responseStatus).toBe(200)
        }
    }
})