import { defineStep, Then, When } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { GeneralSetting } from "../../../pages/generalSettingsPage";
import { SidebarNavigationPage } from "../../../pages/SidebarNavigationPage";
let gnrlSettingPage: GeneralSetting;

let sidebarNavigationPage: SidebarNavigationPage;
defineStep(
  "User Set Length Measurement Unit To {string}",
  async function (unit) {
    gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
    await gnrlSettingPage.setMeasurementUnitsViaApi(unit);
  }
);

When(
  "the user is on the {string} page",
  async function (item: string): Promise<void> {
    sidebarNavigationPage = Container.resolve(
      ContainerKeys.sidebarNavigationPage
    );
    await sidebarNavigationPage.navigateToSidebarItem(item);
  }
);

When(
  "the user clicks on the {string} header button",
  async function (button: string): Promise<void> {
    gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
    await gnrlSettingPage.clickOnHeaderButton(button);
  }
);

Then(
  "the {string} toggle should be {string}",
  async function (element: string, state: string): Promise<void> {
    gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
    await gnrlSettingPage.verifyToggleState(element, state);
  }
);

Then(
  "the {string} dropdown should be disabled",
  async function (dropdown: string): Promise<void> {
    gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
    await gnrlSettingPage.verifyDropdownIsDisabled(dropdown);
  }
);

Then(
  "the value of the {string} should be {string}",
  async function (dropdown: string, mode: string): Promise<void> {
    gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
    await gnrlSettingPage.verifyDropdownValue(dropdown, mode);
  }
);
