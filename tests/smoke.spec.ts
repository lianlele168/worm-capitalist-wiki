import { expect, test } from '@playwright/test';
test('worksheet arithmetic and invalid duration', async ({ page }) => {
 await page.goto('/profit-calculator/');
 const labels = ['Observation length (minutes)', 'Starting balance', 'Ending balance', 'Total spent during observation'];
 for (const [i,value] of ['2','100','160','20'].entries()) await page.getByLabel(`Run 1: ${labels[i]}`, {exact:true}).fill(value);
 await expect(page.getByTestId('run-1-result')).toContainText('Net balance change / min: 30');
 await expect(page.getByTestId('run-1-result')).toContainText('Receipts / min: 40');
 await page.getByLabel('Run 1: Observation length (minutes)', {exact:true}).fill('0');
 await expect(page.getByTestId('run-1-result')).toContainText('duration above zero');
});
test('corrupt storage is preserved during session use', async ({page}) => {
 await page.addInitScript(() => localStorage.setItem('worm-capitalist-observation-checklist-v2', '{broken'));
 await page.goto('/walkthrough/');
 await expect(page.locator('.tracker-shell').getByRole('alert')).toContainText('could not be read');
 await page.getByRole('button', {name:'Mark complete: Record your starting state'}).click();
 await expect(page.getByRole('heading', {name:'1 of 5 checked'})).toBeVisible();
 expect(await page.evaluate(() => localStorage.getItem('worm-capitalist-observation-checklist-v2'))).toBe('{broken');
});
test('search results and empty state', async ({page}) => {
 await page.goto('/');
 await page.getByRole('button', {name:'Search the guide'}).click();
 await page.getByLabel('Search pages').fill('worksheet');
 await expect(page.getByRole('dialog').getByRole('link', {name:/Worm Capitalist measurement worksheet/})).toBeVisible();
 await page.getByLabel('Search pages').fill('no-match-93871');
 await expect(page.getByText('No matching guide page.')).toBeVisible();
 await page.keyboard.press('Escape');
 await expect(page.getByRole('dialog')).toHaveCount(0);
});
