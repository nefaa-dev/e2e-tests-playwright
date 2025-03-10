import { When } from "@cucumber/cucumber";
import { FolderPage } from "../../../pages/folderPage";
import { Container, ContainerKeys } from "../../../containers/Container";

let folderPage: FolderPage;
When("User Clicks On Folder's Actions Button", async () => {
  folderPage = Container.resolve(ContainerKeys.folderPage);
  await folderPage.clickOnFolderActionsButton();
});
