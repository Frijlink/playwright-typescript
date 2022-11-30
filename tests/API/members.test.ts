import { expect } from '@playwright/test'
import { test } from '../../support-code/pages/index'

test('retrieve amount of boards from member', async ({API}) => {
    const token = `${process.env.API_TOKEN}`
    const key = `${process.env.API_KEY}`

    const boards = await API.members.getBoardsFromMember(key, token)
    expect(boards.length).toBe(0)
})