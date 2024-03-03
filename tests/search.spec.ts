import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Search Tests", () => {
  test("should find matched test results", async ({ page }) => {
    let homePage: HomePage = new HomePage(page);
    await homePage.visit();
    await homePage.searchFor("Bank");
  });
});
