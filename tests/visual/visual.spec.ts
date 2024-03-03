import { test, expect } from "@playwright/test";

test.describe("Visual Tests", () => {
  test("full Page Visual Test", async ({ page }) => {
    await page.goto("https://example.com");
    expect(await page.screenshot()).toMatchSnapshot("homepage.png");
  });

  test("single element Visual Test", async ({ page }) => {
    await page.goto("https://example.com");
    const element = page.locator("h1");
    expect(await element.screenshot()).toMatchSnapshot("element.png");
  });
});
