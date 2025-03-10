import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, Page } from "playwright";
import { LoadPage } from "../pages/loadPage";
import { LibraryPage } from "../pages/libraryPage";
import { LoginPage } from "../pages/loginPage";
import { GeneralSetting } from "../pages/generalSettingsPage";
import { SideBar } from "../pages/components/sideBar";
import { SidebarNavigationPage } from "../pages/SidebarNavigationPage";

import { BrowserTestContext } from "../containers/BrowserTestContext";
import { Container, ContainerKeys } from "../containers/Container";
import { captureScreenshots } from "../helpers/tools";
import config from "../../playwright.config";
import { LogoutPage } from "../pages/logoutPage";
import { FolderPage } from "../pages/folderPage";
import fs from "fs";

export const globalTimeout: number = config.expect?.timeout!;
setDefaultTimeout(globalTimeout);

let page: Page;
let browser: Browser;
let testContext: BrowserTestContext;
let loginPage: LoginPage;
let loadPage: LoadPage;
let libraryPage: LibraryPage;
let gnrlSettingPage: GeneralSetting;
let sidebarNavigationPage: SidebarNavigationPage;
let sideBarObject: SideBar;
let logoutPage: LogoutPage;
let folderPage: FolderPage;

Before(async (scenario: any) => {
  try {
    const webUrl = process.env.WEB_URL ?? "";
    let isLoginRequired = false;
    const tags = scenario.pickle.tags.map((tag: { name: any }) => tag.name);
    const useStorageState = !tags.includes("@noStorage");
    if (useStorageState) {
      console.log("check validity of storage state... ");
      isLoginRequired = await isAuthRequired("auth.json");
    }

    if (isLoginRequired) {
      console.log("Performing login...");
      let testContext_ = new BrowserTestContext();

      let browser_ = await testContext_.browserLaunch();
      page = await testContext_.newPage(browser_);
      loginPage = new LoginPage(page);
      await page.goto(webUrl);
      await loginPage.login();
      await loginPage.assertIsUserLoggedIn();
      await page.context().storageState({ path: "auth.json" });
      await page.close();
      await browser_.close();

      console.log("New storage state saved.");
    } else {
      console.log("Using existing auth.json for session.");
    }
    testContext = new BrowserTestContext();
    browser = await testContext.browserLaunch();
    page = await testContext.newPage(
      browser,
      scenario.pickle.name,
      useStorageState
    );
    loginPage = new LoginPage(page);
    loadPage = new LoadPage(page);
    libraryPage = new LibraryPage(page);
    gnrlSettingPage = new GeneralSetting(page);
    sidebarNavigationPage = new SidebarNavigationPage(page);
    sideBarObject = new SideBar(page);
    logoutPage = new LogoutPage(page);
    folderPage = new FolderPage(page);

    await page.goto(webUrl);
    if (!isAuthRequired) {
      await loadPage.WaitForRedirection((url: { href: string | string[] }) =>
        url.href.includes("loads")
      );
    }

    console.log(`captured site title as ${await page.title()}`);
    loginPage = new LoginPage(page);

    console.log(`captured site title as ${await page.title()}`);
    console.log(`current running test: ${scenario.pickle.name}`);

    Container.register(ContainerKeys.browser, browser);
    Container.register(ContainerKeys.context, testContext);
    Container.register(ContainerKeys.page, page);
    Container.register(ContainerKeys.loginPage, loginPage);
    Container.register(ContainerKeys.loadPage, loadPage);
    Container.register(ContainerKeys.libraryPage, libraryPage);
    Container.register(ContainerKeys.gnrlSettingPage, gnrlSettingPage);
    Container.register(
      ContainerKeys.sidebarNavigationPage,
      sidebarNavigationPage
    );
    Container.register(ContainerKeys.sideBarObject, sideBarObject);
    Container.register(ContainerKeys.logoutPage, logoutPage);
    Container.register(ContainerKeys.folderPage, folderPage);
  } catch (error) {
    console.log(`chrome navigation failed due to ${error}`);
    throw new Error(`chrome navigation failed due to ${error}`);
  }
  return page;
});

After(async function (scenario) {
  await captureScreenshots(scenario, page);
  await cleanUp();
  Container.remove(ContainerKeys.loginPage);
  Container.remove(ContainerKeys.loadPage);
  Container.remove(ContainerKeys.libraryPage);
  Container.remove(ContainerKeys.gnrlSettingPage);
  Container.remove(ContainerKeys.sidebarNavigationPage);
  Container.remove(ContainerKeys.sideBarObject);
  Container.remove(ContainerKeys.logoutPage);
  await testContext.clear();
});

async function isAuthRequired(authFilePath: string) {
  let isLoginRequired = false;
  if (fs.existsSync(authFilePath)) {
    const storageState = JSON.parse(fs.readFileSync(authFilePath, "utf-8"));
    const currentTime = Math.floor(Date.now() / 1000);
    const criticalCookies = ["auth0", "auth0_compat", "did"];

    for (const cookie of storageState.cookies) {
      if (
        criticalCookies.includes(cookie.name) &&
        cookie.expires > 0 &&
        cookie.expires < currentTime
      ) {
        console.log(`Cookie "${cookie.name}" is expired.`);
        isLoginRequired = true;
        break;
      }
    }
  } else {
    console.log("No auth.json file found. Login is required.");
    isLoginRequired = true;
  }
  return isLoginRequired;
}

async function cleanUp() {
  await page.waitForTimeout(2000);
  // clean up shareable links
  if (loadPage.run.shareableLink.toBeCleanedUp) {
    await loadPage.run.shareableLink.deleteViaApi();
  }

  // clean up loads
  if (loadPage.toBeCleanedUp) {
    await loadPage.deleteViaApi();
  }

  if (loadPage.container.toBeCleanedUp) {
    // Clean up custom ground pallet after using it in run creation
    if (loadPage.container.category == 5) {
      await libraryPage.clickOnLibraryButton();
      await page.waitForTimeout(1000);
      await libraryPage.container.selectCategory(5);
      await libraryPage.container.delete();
      await page.waitForTimeout(3000);
    }
  }

  // Clean up any custom container that never been used in runs
  if (libraryPage.container.toBeCleanedUp) {
    await libraryPage.deleteContainer();
    await page.waitForTimeout(3000);
  }
  // clean up products
  if (libraryPage.product.toBeCleanedUp) {
    await libraryPage.clickOnLibraryButton();
    await page.waitForTimeout(2000);
    await libraryPage.product.delete();
    await page.waitForTimeout(2000);
  }

  // clean up invitations

  if (gnrlSettingPage.invitation.toBeCleanedUp) {
    await gnrlSettingPage.invitation.delete();
  }
  // Reset Measurement units
  if (!gnrlSettingPage.isDefaultLengthUnit) {
    await gnrlSettingPage.setMeasurementUnitsViaApi();
  }

  // Clean up all custom containers if threshold has been hit
  if (libraryPage.container.isThresholdReached) {
    await libraryPage.container.clearUnusedCustom();
    console.log("custom containers just have been cleaned up");
  }

  // clean up folders
  if (folderPage.toBeRemoved) {
    await folderPage.search();
    await folderPage.clickOnFolderActionsButton();
    await folderPage.clickOnButton("delete");
    await folderPage.clickOnButton("confirm");
  }
}
