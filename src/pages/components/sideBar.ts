import { Page } from '@playwright/test';
import { BasePage } from '../basePage';


const selectors = {
    apiDocLink: '//a[@id="API Documentation_nav_link"]',
    preferencesLink: '//a[@id="Preferences_nav_link"]'

}



export class SideBar extends BasePage {

    constructor(page: Page) {
        super(page);

    }

    async clickOnApiDoc(): Promise<void> {
        await this.click(selectors.apiDocLink);

    }
    async clickOnPreferences(): Promise<void> {

        await this.page.click(selectors.preferencesLink);


    }

    async clickOn(option: string): Promise<void> {
        switch (option.toLowerCase()) {

            case "preferences":
                await this.clickOnPreferences();
                break;
            case "api documentation":
                await this.clickOnApiDoc();
                break;

        }

    }


}