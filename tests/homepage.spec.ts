import {test, expect} from "@playwright/test";

test("homepage shows hero text", async ({page}) => {
  await page.goto("/");
  await expect(page.locator("text=Refuse the ordinary.")).toBeVisible();
});
