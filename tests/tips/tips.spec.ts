import { test, expect } from "@playwright/test";

test.describe.only("Tips & Tricks Tests", () => {
  test("testInfo Object", async ({ page }, testInfo) => {
    const name = testInfo.title;
    console.log(name);
  });

  test("skip browser", async ({ page, browserName }) => {
    test.skip(browserName === "chromium", "does not run on Chromium");
    await page.goto("https://www.example.com");
  });

  test("fix me annotation", async ({ page, browserName }) => {
    test.fixme(
      browserName === "chromium",
      "fix me on Chromium, needs revision"
    );
    await page.goto("https://www.example.com");
  });

  const searchKeywords = ["Gold", "Diamond", "Silver", "Good", "Bad"];
  for (const searchKeyword of searchKeywords) {
    test(`search for ${searchKeyword}`, async ({ page }) => {
      await page.goto("http://zero.webappsecurity.com/index.html");
      await page.fill("#searchTerm", searchKeyword);
      await page.waitForTimeout(2000);
    });
  }

  test.only("test multiple tabs in one context", async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    const page3 = await context.newPage();
    const page4 = await context.newPage();
    const page5 = await context.newPage();

    await page1.goto("http://zero.webappsecurity.com");
    await page2.goto("http://zero.webappsecurity.com/online-banking.html");
    await page3.goto("http://zero.webappsecurity.com/feedback.html");
    await page4.goto("http://zero.webappsecurity.com/login.html");
    await page5.goto("http://zero.webappsecurity.com/forgot-password.html");

    await page1.waitForLoadState("domcontentloaded");
  });
});
