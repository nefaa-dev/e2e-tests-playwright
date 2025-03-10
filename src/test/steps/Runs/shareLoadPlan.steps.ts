import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";
import { GeneralSetting } from "../../../pages/generalSettingsPage";
import { SideBar } from "../../../pages/components/sideBar";

let loadPage: LoadPage;
let gnrlSettingPage: GeneralSetting;
let shareableLink: string;
let sideBarObject: SideBar;

defineStep("User Click On Share Load Plan Button", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.clickOnShareLoadPlanButton();
});

defineStep("User Click On Share Load Plan Option", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.clickOnShareLoadPlanOption();
});

defineStep(
  "Notification Should Be Displayed With {string}",
  async (notifMessage: string) => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.run.checkNotification(notifMessage);
  }
);

defineStep(
  "User Should Be Able To Access The Shared Load Plan Through The Copied Link",
  async () => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    shareableLink = await loadPage.run.checkSharedLoadPlanAccess();
  }
);

defineStep("User Click On {string} On The SideBar", async (option: string) => {
  sideBarObject = Container.resolve(ContainerKeys.sideBarObject);
  await sideBarObject.clickOn(option);
});

defineStep("User Click On Shareable Links Tab", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  await gnrlSettingPage.clickOnShareableLinks();
});

defineStep("The Shareable Link Should Be Added", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await gnrlSettingPage.checkShareableLink(
    loadPage.loadName,
    loadPage.run.name,
    loadPage.run.shareableLink.link
  );
  loadPage.run.shareableLink.toBeCleanedUp = true;
});

defineStep("User Hover The Mouse On Share Load Plan Button", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.hoverOn(loadPage.run.selectors.shareLoadPlanBtn);
});

defineStep("Share Load Plan Button Should Be Disabled", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isDisabled = await loadPage.run.isShareLoadPlanBtnDisabled();
  expect(isDisabled).toBeTruthy();
});

defineStep("Share Load Plan Option Should Be Disabled", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  const isDisabled = await loadPage.run.isShareLoadPlanOptionDisabled();
  expect(isDisabled).toBeTruthy();
});

defineStep("Tooltip {string} Should Be Displayed", async (message: string) => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.checkTooltipMessage(message);
});
