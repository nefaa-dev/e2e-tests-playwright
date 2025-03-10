import { When, Then, Given } from "@cucumber/cucumber";
import { FolderPage } from "../../../pages/folderPage";
import { Container, ContainerKeys } from "../../../containers/Container";
import { Page } from "playwright";
import { state } from "../../../helpers/types";

let folderObject: FolderPage;

When("User Clicks On The {string} Button", async (button: string) => {
  folderObject = Container.resolve(ContainerKeys.folderPage);
  await folderObject.clickOnButton(button.toLowerCase());
  if (button.toLowerCase() === "delete") {
    folderObject.toBeRemoved = false;
  }
});

When("User Sets The Folder Name", async () => {
  folderObject = Container.resolve(ContainerKeys.folderPage);
  await folderObject.setName();
});

When("User Sets An Empty Folder Name", async () => {
  folderObject = Container.resolve(ContainerKeys.folderPage);
  await folderObject.setName("");
});

When("User Sets The New Folder Name", async () => {
  let page: Page = Container.resolve(ContainerKeys.page);
  let anotherFolder: FolderPage = new FolderPage(page);
  await anotherFolder.setName();
  folderObject.name = anotherFolder.name;
  Container.register(ContainerKeys.anotherFolder, anotherFolder);
});

Then("The Popup Should Be {string}", async (state: state) => {
  folderObject = Container.resolve(ContainerKeys.folderPage);
  await folderObject.checkModalState(state);
});

Then("The Popup Should Contain The Following Elements:", async (table: any) => {
  folderObject = Container.resolve(ContainerKeys.folderPage);
  await folderObject.verifyModalContainsElements(table);
});

When("User Search For The Folder", async () => {
  folderObject = Container.resolve(ContainerKeys.folderPage);
  await folderObject.search();
});

When("User Search For The New Folder", async () => {
  let anotherFolder: FolderPage = Container.resolve(
    ContainerKeys.anotherFolder
  );
  await anotherFolder.search();
});

Then(
  "The New Folder Should Be {string} In The Search Results",
  async (state: string) => {
    let anotherFolder: FolderPage = Container.resolve(
      ContainerKeys.anotherFolder
    );
    await anotherFolder.checkSearchResults(state);
  }
);

Then(
  "Folder Should Be {string} In The Search Results",
  async (state: string) => {
    folderObject = Container.resolve(ContainerKeys.folderPage);
    await folderObject.checkSearchResults(state);
  }
);

Given("User Already Created Folder", async () => {
  folderObject = Container.resolve(ContainerKeys.folderPage);
  await folderObject.clickOnButton("add");
  await folderObject.checkModalState("visible");
  await folderObject.setName();
  await folderObject.clickOnButton("save");
  await folderObject.checkModalState("hidden");
  await folderObject.verifyCreation();
  await folderObject.search();
  await folderObject.checkSearchResults("visible");
});

Then(
  "The Folder Loads Count Should Be Equal To {int}",
  async (count: number) => {
    folderObject = Container.resolve(ContainerKeys.folderPage);
    await folderObject.verifyLoadsCount(count);
  }
);

Then("Folder Should Be Created", async () => {
  folderObject = Container.resolve(ContainerKeys.folderPage);
  await folderObject.verifyCreation();
});

When("User Hover Over The Folder Name Input", async () => {
  folderObject = Container.resolve(ContainerKeys.folderPage);
  await folderObject.hoverOverNameInput();
});
