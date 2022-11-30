import { expect } from '@playwright/test'
import { test } from '../../support-code/pages/index'
import TestDataGenerator from '../../support-code/utilities/test_data_generator'

const token = `${process.env.API_TOKEN}`
const key = `${process.env.API_KEY}`

let organizationId = '', boardId = ''

test.beforeAll(async ({API}) => {
    const memberId = (await API.token.getTokenInfo(key, token)).idMember
    const organizations = await API.members.getMemberOrganizations(memberId, key, token)
    organizationId = organizations[0].id
})

test('CRUD Trello board through API', async ({API}) => {
    const boardName = TestDataGenerator.generateBoardName().replace(' ', '-').toLowerCase()
    const updatedBoardName = TestDataGenerator.generateBoardName().replace(' ', '-').toLowerCase()
    const backgroundColour = 'purple'
    const updatedBackgroundColour = 'pink'
    const visibility = 'org'
    const updatedVisibility = 'private'

    await test.step('create board', async () => {
        const responseBody = await API.boards.createBoard(key, token, boardName, backgroundColour, visibility)
        boardId = responseBody.id
        expect(responseBody.idOrganization).toBe(organizationId)
        expect(responseBody.name).toBe(boardName)
        expect(responseBody.closed).toBe(false)
        expect(responseBody.prefs.background).toBe(backgroundColour)
        expect(responseBody.prefs.permissionLevel).toBe(visibility)
    })

    await test.step('read board', async () => {
        const responseBody = await API.boards.getBoard(boardId, key, token)
        expect(responseBody.idOrganization).toBe(organizationId)
        expect(responseBody.name).toBe(boardName)
        expect(responseBody.closed).toBe(false)
        expect(responseBody.prefs.background).toBe(backgroundColour)
        expect(responseBody.prefs.permissionLevel).toBe(visibility)
    })

    await test.step('update board', async () => {
        const params = {
            key,
            token,
            name: updatedBoardName,
            'prefs/background': updatedBackgroundColour,
            'prefs/permissionLevel': updatedVisibility
        }
        const responseBody = await API.boards.updateBoard(boardId, params)
        expect(responseBody.idOrganization).toBe(organizationId)
        expect(responseBody.name).toBe(updatedBoardName)
        expect(responseBody.closed).toBe(false)
        expect(responseBody.prefs.background).toBe(updatedBackgroundColour)
        expect(responseBody.prefs.permissionLevel).toBe(updatedVisibility)
    })

    await test.step('close board', async () => {
        const params = {
            key,
            token,
            closed: true
        }
        await API.boards.updateBoard(boardId, params)
        const responseBody = await API.boards.getBoard(boardId, key, token)
        expect(responseBody.closed).toBe(true)
    })

    await test.step('delete board', async () => {
        const responseStatus = await API.boards.deleteBoard(boardId, key, token)
        expect(responseStatus).toBe(200)
    })
})

test.afterAll(async ({API}) => {
    const boards = await API.members.getBoardsFromMember(key, token)
    for (const board of boards) {
        const responseStatus = await API.boards.deleteBoard(board.id, key, token)
        expect(responseStatus).toBe(200)
    }
})