import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../../containers/Container";
import { GeneralSetting } from "../../../../pages/generalSettingsPage";

let gnrlSettingPage: GeneralSetting;

defineStep("User Sent Invitation", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  await gnrlSettingPage.clickOnManageOrg();
  await gnrlSettingPage.clickOnInvitationsTab();
  await gnrlSettingPage.clickOnInviteUser();
  await gnrlSettingPage.invitation.fillEmailField();
  await gnrlSettingPage.invitation.clickOnSendButton();
  const isSent = await gnrlSettingPage.isInvitationSent();
  expect(isSent).toBeTruthy();
  gnrlSettingPage.invitation.toBeCleanedUp = true;
});

defineStep("User Click On Vertical Ellipsis Of The Invitation", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  await gnrlSettingPage.invitation.clickOnVrtclEllipsis();
});

defineStep("User Click On Delete Option Of The Invitation", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  await gnrlSettingPage.invitation.clickOnDeleteOption();
});

defineStep("User Click On Delete Button To Confirm", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  await gnrlSettingPage.invitation.clickOnDeleteButton();
});

defineStep("Invitation Should Be Deleted", async () => {
  gnrlSettingPage = Container.resolve(ContainerKeys.gnrlSettingPage);
  const isDeleted = await gnrlSettingPage.invitation.isDeleted();
  expect(isDeleted).toBeTruthy();
  gnrlSettingPage.invitation.toBeCleanedUp = false;
});
