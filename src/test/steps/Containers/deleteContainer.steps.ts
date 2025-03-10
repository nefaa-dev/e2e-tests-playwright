import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { LibraryPage } from "../../../pages/libraryPage";
import { Container, ContainerKeys } from "../../../containers/Container";

let libraryPage: LibraryPage;

defineStep(
  "User Created Container Of Type {string}",
  async (containerCategory: string): Promise<void> => {
    libraryPage = Container.resolve(ContainerKeys.libraryPage);

    let type: number = 0;
    switch (containerCategory.toLowerCase()) {
      case "sea container":
        type = 1;
        break;
      case "box":
        type = 5;
        break;
      case "ground pallet":
        type = 4;
        break;
    }
    await libraryPage.container.createViaApi(type);
  }
);

defineStep("User Click On Bin Icon", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.container.clickOnBin();
});

defineStep("User Click On Delete Button", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.container.clickOnDeleteButton();
});

defineStep("Container Should Be Deleted", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isDeleted = await libraryPage.container.isDeleted();
  expect(isDeleted).toBeTruthy();
  libraryPage.container.toBeCleanedUp = false;
});

defineStep("Container Is Not Deletable", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isDeletable = await libraryPage.container.isDeletable();
  expect(isDeletable).toBeFalsy();
});

defineStep("Container Should Be Deletable", async function () {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isDeletable = await libraryPage.container.isDeletable();
  expect(isDeletable).toBeTruthy();
  libraryPage.container.toBeCleanedUp = true;
});
