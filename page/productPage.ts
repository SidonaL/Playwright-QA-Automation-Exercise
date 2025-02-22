import { Page, expect } from "@playwright/test";
import { pageTitle, pageHeader } from "../data/testData"; 

export class ProductsPage {
    
    readonly page: Page

    constructor (page: Page){
        this.page = page
    
    }

    async navigateToProductsPage(productsPageURL: string){
        await this.page.goto(productsPageURL)
        const consentButton = this.page.getByRole('button', { name: 'Consent' })
        if (await consentButton.isVisible()) {
            await consentButton.click()
        }
    }
    
    async verifyProductsPageIsLoaded(){
        await expect(this.page).toHaveTitle(pageTitle.productsPageTitle)
        await expect(this.page.getByText(pageHeader.productsPageHeader)).toBeVisible()
    } 

    async viewProductInformation(productName: string){
       const product = this.page.locator(`.product-image-wrapper:has-text("${productName}")`)
       await product.getByRole('link', {name: 'View Product'}).click()
    }

    async verifyProductDetailPageIsLoaded(){
        await expect(this.page).toHaveTitle(pageTitle.productDetailsPageTitle)
        await expect(this.page.locator('.product-information')).toBeVisible();
    }


    async verifyProductInfoIsVisible(){
    const productInformationField = this.page.locator('.product-information')
       await expect(productInformationField.locator('h2')).toBeVisible()
       await expect(productInformationField.locator('p', {hasText: 'Category'})).toBeVisible()
       await expect(productInformationField.locator('span span')).toBeVisible()
       await expect(productInformationField.locator('p', {hasText: 'Availability'})).toBeVisible()
       await expect(productInformationField.locator('p', {hasText: 'Condition'})).toBeVisible()
       await expect(productInformationField.locator('p', {hasText: 'Brand'})).toBeVisible()
    }

    async searchAndVerifyProduct(productName: string){
       await this.page.getByRole('textbox', {name:'Search Product'}).fill(productName)
       await this.page.locator('#submit_search').click()

     
       const firstProductName = await this.page.locator('.productinfo p:text-matches("' + productName + '", "i")').first()

       if (await firstProductName.isVisible()){
        await expect(firstProductName).toBeVisible()
       }else{
        const productCount= await this.page.locator('.product-image-wrapper').count()
        await expect(productCount).toBe(0)

       }
    }

}