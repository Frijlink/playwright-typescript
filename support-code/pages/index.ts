import { test as baseTest } from '@playwright/test'
import TrelloIndex from './trello/trello.index'
import ApiIndex from '../API/api.index'

export const test = baseTest.extend<{
    trello: TrelloIndex
    API: ApiIndex

}>({
    trello: async ({ page }, use) => {
        await use(new TrelloIndex(page))
    },
    API: async ({ request }, use) => {
        await use(new ApiIndex(request))
    }
})
