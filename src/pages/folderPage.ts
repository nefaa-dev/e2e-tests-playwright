import { expect, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { getColumnNames } from "../helpers/functions";
import { state } from "../helpers/types";
const selectors = {
  addNewFolderButton: "#add_new_folder",
  createNewFolderPopupHeader: '//h6[text()="Create new Folder"]',
  folderNameInput: "#folderCreation_folderName_input",
  cancelButton: "#cancel_button",
  saveButton: "#confirm_button",
  searchFolderIcon: 'svg[data-test="search_folder_icon"]',
  searchFolderInput: '//input[@data-test="search_folder_input"]',
  folderLink: '//div[starts-with(@data-test, "folder_link")]',
  hoverErrorMessagePopup: '//span[@data-testid="errorMessage"]',
  folderActionButton: '//button[starts-with(@id, "folderAction_button")]',
  folderActionDeleteButton:
    '//div[starts-with(@id, "dashboard_deleteFolder_button")]',
  folderActionRenameButton:
    '//div[starts-with(@id, "dashboard_editFolder_button")]',
  confirmButton: "#confirm_button",
  folderDeletePopupCancelButton: "#cancel_button",
  folderDeletePopupHeader: '//h6[text()="Confirm"]',
  folderRenamePopupHeader: '//h6[text()="Rename Folder"]',
  createLoadPageHeader: '//h6[text()="Create Load"]',
  loadsPageHeader: '//h6[text()="Loads"]',
  searchLoadIcon: 'svg[data-test="search_icon"]',
  searchLoadInput: '//input[@data-test="search_input"]',
  moveFolderButton: '//div[starts-with(@id, "dashboard_moveToFolder_button")]',
  moveLoadToFolderPopupHeader: '//h6[text()="Move Load to Folder"]',
  movetoFolderSelect: "#moveToFolder_select",
  modal: '//div[@class="modal-content"]',
};

export class FolderPage extends BasePage {
  public name: string;
  public readonly elements: Record<string, string>;
  private readonly folderLink: string;
  private readonly folderLoadsCountSelector: string;
  public toBeRemoved: boolean;
  constructor(page: Page) {
    super(page);
    this.name = `Folder_${this.generateUniqueId()}`;
    this.folderLink = `//div[@data-test="folder_link_${this.name}"]`;
    this.folderLoadsCountSelector = `//span[@data-test="folder_loads_count_${this.name}"]`;
    this.toBeRemoved = false;
    this.elements = {
      add: selectors.addNewFolderButton,
      save: selectors.confirmButton,
      delete: selectors.folderActionDeleteButton,
      rename: selectors.folderActionRenameButton,
      cancel: selectors.cancelButton,
      confirm: selectors.confirmButton,
      folder: this.folderLink,
      move: selectors.moveFolderButton,
      folderDropdown: selectors.movetoFolderSelect,
      foldername: selectors.folderNameInput,
    };
  }

  async clickOnButton(button: string) {
    const buttonSelector = this.elements[button];
    if (!buttonSelector) {
      throw new Error(`Unknown button: ${button}`);
    }
    await this.click(buttonSelector);
  }

  async checkModalState(state: state) {
    await this.waitForSelectorToBe({
      selector: selectors.modal,
      status: state,
    });
  }

  async verifyModalContainsElements(table: any) {
    const columnNames: string[] = getColumnNames(table);
    for (const columnName of columnNames) {
      const normalizedColumnName: string = columnName
        .split(" ")
        .join("")
        .toLowerCase();
      const targetSelector = this.elements[normalizedColumnName];
      if (!targetSelector) {
        throw new Error(`Unknown column name: ${normalizedColumnName}`);
      }
      await this.waitForSelectorToBe({ selector: targetSelector });
    }
  }

  async setName(name: string = this.name) {
    await this.fill(selectors.folderNameInput, name);
  }

  async clickOnSearch() {
    await this.click(selectors.searchFolderIcon);
  }

  async search(name: string = this.name) {
    await this.clickOnSearch();
    const elementLocator = await this.waitForSelectorToBe({
      selector: selectors.searchFolderInput,
    });
    await elementLocator.fill(name);
  }

  async checkSearchResults(state?: string) {
    await this.retryUntilExpectationPasses(() =>
      this.assertNumberOfLocators(1, selectors.folderLink)
    );
    await this.elementShouldBe({
      selector: this.folderLink,
      status: state,
    });
  }

  async clickOnFolderActionsButton() {
    const folderLinkSelector = `//div[@data-test="folder_link_${this.name}"]`;
    await this.hoverOn(folderLinkSelector);
    const elementLocator = await this.locator(selectors.folderActionButton);
    await elementLocator.click();
  }

  async clickOnMoveFolderDropDown() {
    await this.click(selectors.movetoFolderSelect);
  }

  async selectFolder(name: string = this.name) {
    const folderOption = `(//span[text()="${name}"])[2]`;
    const elementLocator = await this.waitForSelectorToBe({
      selector: folderOption,
    });
    await elementLocator.scrollIntoViewIfNeeded();
    await elementLocator.click();
  }

  async getLoadsCount(): Promise<number> {
    const folderCountLocator = await this.waitForSelectorToBe({
      selector: this.folderLoadsCountSelector,
    });
    const loadsCount = await folderCountLocator.innerText();
    return parseInt(loadsCount);
  }

  async verifyLoadsCount(count: number) {
    const loadsCount = await this.getLoadsCount();
    expect(loadsCount).toBe(count);
  }

  async verifyCreation() {
    await this.waitForSelectorToBe({ selector: this.folderLink });
    this.toBeRemoved = true;
  }

  async hoverOverNameInput() {
    await this.hoverOn(selectors.folderNameInput);
  }
}
