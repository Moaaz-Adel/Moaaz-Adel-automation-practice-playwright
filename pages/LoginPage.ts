import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  // Login Locators
  readonly page: Page;
  readonly userNameFld: Locator;
  readonly passwordFld: Locator;
  readonly submitBtn: Locator;
  readonly errorMessageTxt: Locator;
  readonly loginForm: Locator;

  // Init Locators using Constructor

  constructor(page: Page) {
    this.page = page;
    this.userNameFld = page.locator("#user_login");
    this.passwordFld = page.locator("#user_password");
    this.submitBtn = page.locator("text=Sign in");
    this.errorMessageTxt = page.locator(".alert-error");
    this.loginForm = page.locator("#login_form");
  }

  async visit() {
    await this.page.goto("http://zero.webappsecurity.com");
  }

  async login(userName: string, password: string) {
    await this.userNameFld.fill(userName);
    await this.passwordFld.fill(password);
    await this.submitBtn.click();
  }

  async assertErrorMessage() {
    await expect(this.errorMessageTxt).toContainText(
      "Login and/or password are wrong"
    );
  }

  async snapShotLoginForm() {
    await expect(this.loginForm.screenshot()).toMatchSnapshot("loginForm.png");
  }

  async snapShotErrorMessage() {
    await expect(this.errorMessageTxt.screenshot()).toMatchSnapshot(
      "errorLoginForm.png"
    );
  }
}
