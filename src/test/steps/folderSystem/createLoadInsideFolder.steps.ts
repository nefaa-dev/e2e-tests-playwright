import { When, Then } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { FolderPage } from "../../../pages/folderPage";
import { LoadPage } from "../../../pages/loadPage";
let folderPage: FolderPage;
let loadPage: LoadPage;

Then("User Should Be Redirected To The {string} Page", async (page: string) => {
  folderPage = Container.resolve(ContainerKeys.folderPage);
  await folderPage.verifyPage(page.toLowerCase());
});

When("User Searches For The Load", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.search();
});
