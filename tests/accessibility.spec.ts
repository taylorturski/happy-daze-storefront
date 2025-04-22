import {test, expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage should have no accessibility violations", async ({page}) => {
  await page.goto("/");

  // 2. Run an Axe scan over the whole document
  const results = await new AxeBuilder({page})
    // you can optionally scope: .include('body')
    .exclude(".animate-blink-green")
    .analyze();

  // 3. Assert zero violations
  expect(results.violations).toHaveLength(0);
});
