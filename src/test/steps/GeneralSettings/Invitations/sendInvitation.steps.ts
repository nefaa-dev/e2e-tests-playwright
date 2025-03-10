import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../../containers/Container";
import { GeneralSetting } from "../../../../pages/generalSettingsPage";

let gnrlSettingPage: GeneralSetting;

defineStep("User Click On Manage Organization", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  await gnrlSettingPage.clickOnManageOrg();
});

defineStep("User Click On Invitation Tab", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  await gnrlSettingPage.clickOnInvitationsTab();
});

defineStep("User Click On Invite User Button", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  await gnrlSettingPage.clickOnInviteUser();
});

defineStep("User Enter Email", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  await gnrlSettingPage.invitation.fillEmailField();
});

defineStep("User Click On Send Button", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  await gnrlSettingPage.invitation.clickOnSendButton();
});

defineStep("Invitation Should Be Sent", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  const isSent = await gnrlSettingPage.isInvitationSent();
  expect(isSent).toBeTruthy();
  gnrlSettingPage.invitation.toBeCleanedUp = true;
});
