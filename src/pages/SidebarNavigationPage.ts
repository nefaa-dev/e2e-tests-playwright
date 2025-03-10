import {Page} from '@playwright/test';
import { BasePage } from './basePage';
import { URLs} from "../helpers/constants";

export class SidebarNavigationPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigateToSidebarItem(item: string): Promise<void> {
        switch (item.toLowerCase()) {
            case 'loads':
                await this.goTo(URLs.loads);
                break;
            case 'library':
                await this.goTo(URLs.library);
                break;
            case 'drafts':
                await this.goTo(URLs.drafts);
                break;
            case 'general settings':
                await this.goTo(URLs.generalSettings);
                break;
        }
    }

}