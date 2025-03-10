import { defineStep } from '@cucumber/cucumber';
import { LogoutPage } from '../../../pages/logoutPage';
import { Container, ContainerKeys } from '../../../containers/Container';


let logoutPage:LogoutPage;

defineStep('User Click On Log Out', async () => {
  logoutPage = Container.resolve(ContainerKeys.logoutPage);
  await logoutPage.clickOnLogOut();
});


defineStep('User should be logged out', async () => {
  await logoutPage.shouldBeLogedOut();
});

defineStep('User Click On Login Button', async () => {
  await logoutPage.clickOnLoginButton();

});