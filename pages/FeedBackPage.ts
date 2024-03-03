import { Page, Locator, expect } from "@playwright/test";

export class FeedBackPage {
  // Locators
  readonly page: Page;
  readonly yourNameFld: Locator;
  readonly yourEmailAddressFld: Locator;
  readonly subjectField: Locator;
  readonly questionField: Locator;
  readonly sendMessageBtn: Locator;
  readonly feedBackMessage: Locator;
  readonly clearBtn: Locator;
  readonly feedBackBtn: Locator;

  // Init Constructor

  constructor(page: Page) {
    this.page = page;
    this.yourNameFld = page.locator("#name");
    this.yourEmailAddressFld = page.locator("#email");
    this.subjectField = page.locator("#subject");
    this.questionField = page.locator("#comment");
    this.sendMessageBtn = page.locator("[name='submit']");
    this.feedBackMessage = page.locator(00);
    this.clearBtn = page.locator("[name='Clear']");
    this.feedBackBtn = page.locator("#feedback");
  }

  async fillForm(
    name: string,
    email: string,
    subject: string,
    question: string
  ) {
    await this.yourNameFld.fill(name);
    await this.yourEmailAddressFld.fill(email);
    await this.subjectField.fill(subject);
    await this.questionField.fill(question);
  }

  async visit() {
    await this.page.goto("http://zero.webappsecurity.com");
    await this.feedBackBtn.click();
  }

  async submitForm() {
    await this.sendMessageBtn.click();
  }
  async resetForm() {
    await this.clearBtn.click();
  }

  async assertReset() {
    await expect(this.yourEmailAddressFld).toBeEmpty();
    await expect(this.yourNameFld).toBeEmpty();
  }

  async feedBackFormSent() {
    await expect(this.feedBackMessage).toBeVisible();
  }
}
