import { test, expect } from '@playwright/test'

test('renders the schedule matrix with Reserve buttons', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Schedule Matrix' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Reserve' }).first()).toBeVisible()
})

test('clicking Reserve updates the reserved count for that row', async ({ page }) => {
  await page.goto('/')

  const scheduleRow = page.getByRole('row').nth(1)
  const reservedCount = scheduleRow.getByText(/\d+ reserved/).first()
  const countBefore = await reservedCount.textContent()

  await scheduleRow.getByRole('button', { name: 'Reserve' }).first().click()

  await expect(reservedCount).not.toHaveText(countBefore ?? '')
})