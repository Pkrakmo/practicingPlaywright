
import { test, expect, type Page } from '@playwright/test';


const ssns = [{
    ssn: "980923-0437",
    format: "YYMMDD-XXXX",
    validity: "true"
  },{
    ssn: "980923-0431",
    format: "YYMMDD-XXXX",
    validity: "false"
}]



async function ssnFiller(page: Page, ssn:string) {
    await page.getByPlaceholder('YYMMDDXXXX').fill(ssn);
}

async function validityCheck(page: Page, validity: string) {
    switch (validity) {
        case "true":

        await expect(page.locator('#login-form-submit')).toBeEnabled()
            
            break;
    
            case "false":

            await expect(page.locator('#login-form-submit')).toBeDisabled()
            
            break;
    }
}



export {ssnFiller, validityCheck, ssns}