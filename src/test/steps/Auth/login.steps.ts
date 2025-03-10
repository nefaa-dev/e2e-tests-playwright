import { Given, defineStep } from "@cucumber/cucumber";
import { LoginPage } from "../../../pages/loginPage";
import { Container, ContainerKeys } from "../../../containers/Container";

let loginPage: LoginPage;

defineStep("User Enter Username {string}", async (username: string) => {
  loginPage = Container.resolve(ContainerKeys.loginPage);
  await loginPage.enterUsername(username);
});

defineStep("User Enter Password {string}", async (password: string) => {
  await loginPage.enterPassword(password);
});

defineStep("User Click On Continue Button", async () => {
  await loginPage.clickOnContinueButton();
});

defineStep("User Should Be Logged In", async () => {
  await loginPage.assertIsUserLoggedIn();
});

Given("User Sign In As {string}", async (role: string) => {
  loginPage = Container.resolve(ContainerKeys.loginPage);
  await loginPage.loginBasedOnRole(role);
  await loginPage.assertIsUserLoggedIn();
});

Given(
  "User Sign In As {string} Using Another Account",
  async (role: string) => {
    loginPage = Container.resolve(ContainerKeys.loginPage);
    await loginPage.signInAnotherAccount(role);
    await loginPage.assertIsUserLoggedIn();
  }
);

Given("a logged user with {string} role", async (role: string) => {
  loginPage = Container.resolve(ContainerKeys.loginPage);
  await loginPage.verifySignedInRole(role);
});

defineStep("User On Dashboard Page", async () => {
  await loginPage.forceRedirection();
});
