import { expect } from '@playwright/test'
import { test } from '../../support-code/pages/index'
import TestDataGenerator from '../../support-code/utilities/test_data_generator'

test.beforeEach(async ({trello}) => {
    await trello.homePage.goto()
    await (await trello.header.getLoginBtn()).click()
    await trello.loginPage.login(
        process.env.USER_NAME,
        process.env.PASSWORD
    )
    await expect(await trello.homePage.getSectionHeader()).toContainText('YOUR WORKSPACES')
})

test('CRUD Trello board', async ({trello}) => {
    const boardName = TestDataGenerator.generateBoardName()
    const updatedBoardName = TestDataGenerator.generateBoardName()

    await test.step('create board', async () => {
        await trello.homePage.createNewBoard(boardName, 'Purple')
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

        await expect(await trello.boardPage.getCloseBoardMessage()).toContainText(`${updatedBoardName} is closed.`)
    })

    await test.step('delete board', async () => {
        await trello.boardPage.deleteBoard()

        await expect(await trello.homePage.getSectionHeader()).toContainText('YOUR WORKSPACES')
        await expect(await trello.homePage.getAllBoardNames()).not.toContain(updatedBoardName)
    })
})

test.afterAll(async ({API}) => {
    const token = `${process.env.API_TOKEN}`
    const key = `${process.env.API_KEY}`
    const boards = await API.members.getBoardsFromMember(key, token)
    for (const board of boards) {
            const responseStatus = await API.boards.deleteBoard(board.id, key, token)
            expect(responseStatus).toBe(200)
    }
})