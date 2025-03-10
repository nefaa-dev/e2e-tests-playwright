import { When } from "@cucumber/cucumber";
import { FolderPage } from "../../../pages/folderPage";
import { Container, ContainerKeys } from "../../../containers/Container";

let folderPage: FolderPage;
When("User Clicks On Folders Dropdown", async () => {
  folderPage = Container.resolve(ContainerKeys.folderPage);

  await folderPage.clickOnMoveFolderDropDown();
});

When("User Selects Another Folder From Dropdown", async () => {
  let anotherFolder: FolderPage = Container.resolve(
    ContainerKeys.anotherFolder
  );
  await anotherFolder.selectFolder();
});

When("User Clicks On The New Folder", async () => {
  let anotherFolder: FolderPage = Container.resolve(
    ContainerKeys.anotherFolder
  );
  await anotherFolder.clickOnButton("folder");
});
