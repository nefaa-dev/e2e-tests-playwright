import {expect, Page} from '@playwright/test';
import { BasePage } from './basePage';

const selectors = {
    logoutButton: '//div[@id="logout_button"]',
    loginButton: '//a[@id="login_button"]'
    
}

export class LogoutPage extends BasePage {

    constructor(page: Page) {
        
        super(page);
    }

    async clickOnLogOut(): Promise<void> {
        
        await this.click(selectors.logoutButton);
    }

    async shouldBeLogedOut(): Promise<void> {
        const expectedURL = `${this.webUrl}/logout`;
        await this.waitForPageLoading()
        const currentURL = await this.getCurrentURL();
        expect(currentURL).toBe(expectedURL);
    }


    async clickOnLoginButton():Promise<void>{

        await this.click(selectors.loginButton);
    }

    
    
}