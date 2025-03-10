import { defineStep } from "@cucumber/cucumber";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

defineStep("User Expand First Product Details", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.expandProductDetails(1);
});

defineStep("First Product Details Should Be As Expected", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.checkBoxDetails();
  await loadPage.run.expandProductDetails(1);
});

defineStep("User Expand Second Product Details", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.expandProductDetails(2);
});

defineStep("Second Product Details Should Be As Expected", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.run.checkCylinderDetails();
  await loadPage.run.expandProductDetails(2);
});

defineStep(
  "Products With {string} Should Be As Expected In {string}",
  async function (indexList: string, filePath: string) {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    await loadPage.run.checkPackedProducts(indexList, filePath);
  }
);
