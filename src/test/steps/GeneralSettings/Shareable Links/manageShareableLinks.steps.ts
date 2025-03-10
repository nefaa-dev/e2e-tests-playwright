import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../../containers/Container";
import { GeneralSetting } from "../../../../pages/generalSettingsPage";
import { LoadPage } from "../../../../pages/loadPage";

let gnrlSettingPage: GeneralSetting;
let loadPage: LoadPage;

defineStep(
  "User Click On Vertical Ellipsis Of The ShareableLink",
  async (): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
    gnrlSettingPage.shareableLink = loadPage.run.shareableLink;
    await gnrlSettingPage.shareableLink.clickOnVerticalEllipsis();
  }
);

defineStep(
  "User Click On {string} Option",
  async (option: string): Promise<void> => {
    gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
    await gnrlSettingPage.shareableLink.clickOnFromMenu(option);
  }
);

defineStep(
  "User Click On Confirm Button For The Shareable Link",
  async (): Promise<void> => {
    gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
    await gnrlSettingPage.shareableLink.clickOnConfirmButton();
  }
);

defineStep(
  "The Link Status Should Be Updated To {string}",
  async (status: string): Promise<void> => {
    gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
    await gnrlSettingPage.shareableLink.checkLinkStatus(
      loadPage.loadName,
      status
    );
  }
);

defineStep(
  "The Shared Results Accessibility Should Behave According To The {string}",
  async (status: string): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.run.checkSharedLoadPlanAccess(status);
  }
);

defineStep("The Shareable Link Should Be Deleted", async (): Promise<void> => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  const isDeleted = await gnrlSettingPage.shareableLink.isDeleted(
    loadPage.run.sharedLink
  );
  expect(isDeleted).toBeTruthy();
  loadPage = Container.resolve(ContainerKeys.loadPage);
  loadPage.run.shareableLink.toBeCleanedUp = false;
});

defineStep("User Shared Load Plan", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.shareLoadPlanViaApi(loadPage.id, loadPage.run.id);
});

defineStep("User Revoked The Shareable Link", async (): Promise<void> => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.revokeShareableLink();
});
