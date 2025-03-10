import { expect } from "@playwright/test";
import { defineStep } from "@cucumber/cucumber";
import * as fs from "fs";
import Papa from "papaparse";
import { ProductInt } from "../../../pages/components/interface";
import { Container, ContainerKeys } from "../../../containers/Container";
import { LoadPage } from "../../../pages/loadPage";

let loadPage: LoadPage;

let actualList: ProductInt[];
let expectedList: any[];

defineStep("User Click On Load Info Option", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnInfo();
});

defineStep(
  "User Get Load Info According To {string}",
  async function (shipmentType: string) {
    loadPage = Container.resolve(ContainerKeys.loadPage);
    actualList = await loadPage.getInfo(shipmentType);
  }
);

defineStep("User Get CSV Info {string}", async function (filePath: string) {
  const csvData = fs.readFileSync(filePath, "utf8");
  const parsedData = Papa.parse(csvData, { header: true });
  expectedList = parsedData.data;
});

defineStep("Load Info Should Match CSV Info", async function () {
  compareArrays(actualList, expectedList);
  expect(actualList).toEqual(expectedList);
});

defineStep("User Click On Load Info", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnLoadInfo();
});

defineStep("User Click On Load Info Button", async function () {
  loadPage = Container.resolve(ContainerKeys.loadPage);
  await loadPage.clickOnLoadInfoButton();
});

function areArraysEqual(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i];
    const obj2 = arr2[i];

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (
      keys1.length !== keys2.length ||
      !keys1.every((key) => keys2.includes(key))
    ) {
      return false;
    }

    for (const key of keys1) {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (value1 !== value2) {
        return false;
      }
    }
  }

  return true;
}

function compareArrays(arr1: any[], arr2: any[]): void {
  if (arr1.length !== arr2.length) {
    console.log("Arrays have different lengths.");
    return;
  }

  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i];
    const obj2 = arr2[i];

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (
      keys1.length !== keys2.length ||
      !keys1.every((key) => keys2.includes(key))
    ) {
      console.log(`Objects at index ${i} have different keys.`);
      return;
    }

    for (const key of keys1) {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (value1 !== value2) {
        console.log(`Difference in value for key "${key}" at index ${i}:`);
        console.log(`  Array 1: ${value1}`);
        console.log(`  Array 2: ${value2}`);
      }
    }
  }

  console.log("Arrays are identical.");
}
