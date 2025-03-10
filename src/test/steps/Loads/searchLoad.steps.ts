import { When } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

When("User Search For The Load", async () => {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.search();
});
