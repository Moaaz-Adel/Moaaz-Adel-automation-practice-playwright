import { LoginPage } from "../../pages/LoginPage";
import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
test.describe("Login Tests", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await homePage.visit();
  });

  test("negative Scenario for login", async ({ page }) => {
    await homePage.clickSignIn();
    await loginPage.login("Invalid User Name", "Invalid Pass");
    await loginPage.assertErrorMessage();
  });
});
