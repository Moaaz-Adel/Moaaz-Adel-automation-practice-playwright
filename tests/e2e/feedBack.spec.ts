import { test } from "@playwright/test";
import { FeedBackPage } from "../../pages/FeedBackPage";
test.describe("Login Tests", () => {
  let feedBackPage: FeedBackPage;

  test.beforeEach(async ({ page }) => {
    feedBackPage = new FeedBackPage(page);
    await feedBackPage.visit();
  });

  test("fill the form with valid data", async ({}) => {
    await feedBackPage.fillForm(
      "Moaaz",
      "test@moaaz.com",
      "My test aomation with playwright",
      "Are you ok?"
    );
    await feedBackPage.feedBackFormSent();
  });
});
