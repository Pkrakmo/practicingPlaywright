import { test, expect } from '@playwright/test';
import { ssnFiller, ssns, validityCheck } from '../fixtures/functions';

test('Has Pay in title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Pay/);
});


test('Insert SSN, check if button is valid', async ({ page }) => {
  await page.goto('/');

    await ssnFiller(page, '980923-0437')
    //await page.locator('#ssn-input').fill('980923-0437');
    await expect(page.locator('#login-form-submit')).toBeEnabled()

});


ssns.forEach(data =>{
  test(`check if ${data.format} is ${data.validity} `, async ({ page }) => {
    await page.goto('/');

    await ssnFiller(page, data.ssn)

    await validityCheck(page, data.validity)

  })
})
