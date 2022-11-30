import { expect } from '@playwright/test'
import { test } from '../../support-code/pages/index'

test('logging in and out on Trello.com', async ({trello}) => {

  await test.step('logging in', async () => {
    await trello.homePage.goto()
    await (await trello.header.getLoginBtn()).click()
    await trello.loginPage.login(
      process.env.USER_NAME,
      process.env.PASSWORD
    )

    await expect(await trello.homePage.getSectionHeader()).toContainText('YOUR WORKSPACES')
  })

  await test.step('logging out', async () => {
    await trello.header.logOut()
    await expect(await trello.header.getLoginBtn()).toBeVisible()
  })
})
