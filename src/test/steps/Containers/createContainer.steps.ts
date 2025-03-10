import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import { LoadPage } from "../../../pages/loadPage";
import { LibraryPage } from "../../../pages/libraryPage";
import { Container, ContainerKeys } from "../../../containers/Container";
let loadPage: LoadPage;
let libraryPage: LibraryPage;

defineStep("User Click On Library Button", async () => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.clickOnLibraryButton();
});

defineStep(
  "User Select Container Category as {string}",
  async (containerCategory: string): Promise<void> => {
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    await libraryPage.selectContainerCategory(containerCategory);
  }
);

defineStep("User Click On Add Container Button", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.clickOnAddContainer();
});

defineStep(
  "User Fill in the container properties {int} , {int} , {int} ,{float}, {string} And {float}",
  async (
    height: number,
    length: number,
    width: number,
    maxCargo: number,
    maxHeight: string,
    emptyWeight: number
  ): Promise<void> => {
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    await libraryPage.fillForm(
      height,
      length,
      width,
      maxHeight,
      maxCargo,
      emptyWeight
    );
  }
);

defineStep("User Save Container", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.clickOnSaveContainer();
});

defineStep("User Click On Close Button", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.clickOnClose();
});

defineStep("Container Should Be Created", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isCreated = await libraryPage.checkForContainerCreation();
  expect(isCreated).toBeTruthy();
  libraryPage.container.toBeCleanedUp = true;
});

defineStep("Container Should Not Be Saved", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  const isCreated = await libraryPage.container.isCreated();
  expect(isCreated).toBeFalsy();
});

defineStep(
  "There is Already Created {string}",
  async (containerCategory: string): Promise<void> => {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    if (containerCategory.toLowerCase() == "boxes") {
      await loadPage.container.createViaApi(5);
      loadPage.container.toBeCleanedUp = true;
      loadPage.container.category = 5;
    }
  }
);

defineStep(
  "User Set Container Name as {string}",
  async (name: string): Promise<void> => {
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    await libraryPage.container.setName(name);
  }
);

defineStep(
  "Notification Should Pop-Up {string}",
  async (message: string): Promise<void> => {
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    const isDisplayed = await libraryPage.isNotificationDisplayed(message);
    expect(isDisplayed).toBeTruthy();
  }
);

defineStep("User Expand Container Details", async (): Promise<void> => {
  libraryPage = Container.resolve(ContainerKeys.libraryPage);
  await libraryPage.container.expandDetails();
});

defineStep(
  "Internal Volume Value Should Be As {string} For {string}",
  async (expectedValue: string, containerType: string): Promise<void> => {
    libraryPage = Container.resolve(ContainerKeys.libraryPage);
    const actualValue = await libraryPage.container.getInternalVol(
      containerType
    );
    expect(actualValue).toEqual(expectedValue);
  }
);

defineStep(
  "User Has {int} Containers",
  async (threshold: number): Promise<void> => {
    const containersCount = await libraryPage.container.getToltalCount();
    await libraryPage.container.reachThreshold(threshold, containersCount);
    libraryPage.container.isThresholdReached = true;
  }
);
