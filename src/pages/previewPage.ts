import {Page} from '@playwright/test';
import { BasePage } from './basePage';

const selectors = {
    vrtclEllipsis: '//button[@id="runDetail_loadMenu_button"]',
    downloadCsvOption: '//div[@id="runDetail_downloadCsv_button"]'
      
}

export class PreveiwPage extends BasePage {
    
    
    
    constructor(page: Page) {
        
        super(page);
        
    }
    
    async clickOnVrtclEllipsis():Promise<void>{

        await this.click(selectors.vrtclEllipsis);
    }
    
    async clickOnDownloadCsv():Promise<void>{
        const downloadPromise = this.page.waitForEvent('download');
        await this.click(selectors.downloadCsvOption);
        const download = await downloadPromise;                                       
        await download.saveAs(`${this.downloadsFolder}/${download.suggestedFilename()}`);
        
    }

    async checkUsedContainers():Promise<boolean>{
        try{
        const selector = '//span[contains(., "Container used")]';
        const usedCntrsList = '//span[contains(., "20 Standard 1")]';
        const cntnrUsedText = await this.page.$(selector);
        const divParent = await cntnrUsedText?.$('..');
        const cntnrDropdown = await divParent?.$('//div[@id="runResult_usedContainers_select"]');
        await cntnrDropdown?.$(usedCntrsList);
        return true;
       }
    catch(error){
        return false;
       }

    }

    async getTotalNbrOfContainers():Promise<any>{
        
        const selector = '//span[contains(., "Number of containers")]';
        await this.waitForSelector(selector)
        const nbrOfCntrsText = await this.page.$(selector);
        const divParent = await nbrOfCntrsText?.$('..')
        const nbrOfCntrsSpan = await divParent?.$('span:nth-child(2)')
        const cntnrsNbr = await nbrOfCntrsSpan?.innerText();
       
        return cntnrsNbr;
        
    }

    async getVolumeUtilization():Promise<any>{
       const tbody = await this.page.$('tbody');
       const volUtilCell = await tbody?.$('tr td:nth-child(2)');
       const volUtilPerSpan = await volUtilCell?.$('div span');
       let volUtilPer =  await volUtilPerSpan?.innerText();
       return volUtilPer;
    }

    async getWeightUtilization():Promise<any>{
        const tbody = await this.page.$('tbody');
        const weightUtilCell = await tbody?.$('tr td:nth-child(3)');
        const weightUtilPerSpan = await weightUtilCell?.$('div span');
        let weightUtilPer =  await weightUtilPerSpan?.innerText();
        return weightUtilPer;
        
    }

    async getTotalPackedItems():Promise<any>{
        const tbody = await this.page.$('tbody');
        const packeItemsCell = await tbody?.$('tr td:nth-child(4)');
        const packedItemsSpan = await packeItemsCell?.$('span');
        let packedItemsNbr =  await packedItemsSpan?.innerText();
        return packedItemsNbr;
        
    }
}