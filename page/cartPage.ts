import { Page, expect } from "@playwright/test"; 
import { pageTitle, verificationMessages, signupData, paymentData} from "../data/testData";

export class CartPage {
    
    readonly page: Page

    constructor (page: Page){
        this.page = page
    
    }
  
    async clickAddToCartButton(productName: string) {
        const product = this.page.locator(`.product-image-wrapper:has-text("${productName}")`)
        const addToCartButtons = product.locator('.add-to-cart')
        const addToCartButton = await addToCartButtons.first()
        await addToCartButton.waitFor({ state: 'visible' })
        await expect(addToCartButton).toBeEnabled()
        await addToCartButton.click()
}



    async verifyProductIsAddedToCart(){
        const popup = await this.page.locator('.modal-content')
        await popup.waitFor({ state: 'visible' })
        await expect(popup.getByText(verificationMessages.productAddedToCart)).toBeVisible()
    }


    async closeModalAndContinueShopping(){
        const modal = await this.page.locator('.modal-content')
        await modal.waitFor({ state: 'visible' })
    
        const continueButton = modal.locator('.modal-footer .close-modal')
        await continueButton.waitFor({ state: 'visible' })
        await continueButton.click();
        await modal.waitFor({ state: 'hidden' })
    }


    async addProductsToCartByName(...productNames: string[]){
        for (const productName of productNames) {
            await this.clickAddToCartButton(productName)
            await this.verifyProductIsAddedToCart()
            await this.closeModalAndContinueShopping()
        }
    }


    async navigateToCart(){
        await this.page.getByRole('link', {name:'Cart'}).click()
    }

    async verifyCartPageIsLoaded(){
        await expect(this.page).toHaveTitle(pageTitle.cartPageTitle)
    }


    async verifyCorrectProductIsAddedToCart(...productNames: string[]){
        await this.navigateToCart()
        await this.verifyCartPageIsLoaded()

        const productNamesInCart = await this.page.locator('.cart_description a').allTextContents()
        for (const productName of productNames) {
            expect(productNamesInCart).toContainEqual(productName)
        }
    }

    async verifyCartItemQuantity(...productNames: string[]){
        const cartItemsQuantity = await this.page.locator('.cart_quantity button.disabled').allTextContents()
        const totalCartItemsQuantity = cartItemsQuantity.map(Number).reduce((sum, qty) => sum + qty, 0)
        expect(totalCartItemsQuantity).toBe(productNames.length)
}

    async removeProductFromCart(){
        const uniqueProductCount = await this.page.locator('.cart_description').count()

        for (let i = 0; i < uniqueProductCount; i++) {
            await this.page.locator('.cart_quantity_delete').first().click();
            await this.page.waitForTimeout(500)
        }
    }
    

    async verifyCartIsEmpty(){
        const confirmationCartIsEmpty = this.page.getByText(verificationMessages.cartIsEmpty)
        await expect(confirmationCartIsEmpty).toBeVisible()
    }


    async clickProceedToCheckoutButton(){
        await this.page.locator('.col-sm-6 .btn').click()
    }

    async clickRegisterLoginButton(){
        const modal = await this.page.locator('.modal-content')
        await modal.waitFor({ state: 'visible' })
    
        const continueButton = modal.locator('.text-center a')
        await continueButton.waitFor({ state: 'visible' })
        await continueButton.click();
    }

    async verifyAdressDetailsAtCheckout(){
        const deliveryAddress = await this.page.locator('#address_delivery').innerText()
        expect(deliveryAddress).toContain(signupData.firstName)
    expect(deliveryAddress).toContain(signupData.lastName)
    expect(deliveryAddress).toContain(signupData.address)
    expect(deliveryAddress).toContain(signupData.city)
    expect(deliveryAddress).toContain(signupData.state)
    expect(deliveryAddress).toContain(signupData.zipcode)
    expect(deliveryAddress).toContain(signupData.country)
    expect(deliveryAddress).toContain(signupData.mobileNumber)
    }

   

    async verifyTotalPriceInCart() {
        const productPrice = await this.page.locator('.cart_price p').allTextContents()
        const productQuantity = await this.page.locator('.cart_quantity button.disabled').allTextContents()
        const displayedTotalPrice = await this.page.locator('tr:has-text("Total Amount") .cart_total_price').textContent()

        let total = 0;
        for (let i = 0; i < productPrice.length; i++) {
            total += parseInt(productPrice[i].replace(/\D/g, ''), 10) * parseInt(productQuantity[i], 10);
        }
        expect(parseInt(displayedTotalPrice!.replace(/\D/g, ''), 10)).toBe(total);
}


    async clickPlaceOrderButton(){
        await this.page.locator('.btn.btn-default.check_out').click()
    }

    async fillPaymentInformation(){
        await this.page.locator('.form-control[name="name_on_card"]').fill(paymentData.cardName)
        await this.page.locator('.form-control[name="card_number"]').fill(paymentData.cardNumber)
        await this.page.locator('.form-control[name="cvc"]').fill(paymentData.cardCVC)
        await this.page.locator('.form-control[name="expiry_month"]').fill(paymentData.cardExpMonth)
        await this.page.locator('.form-control[name="expiry_year"]').fill(paymentData.cardExpYear)  
    }

    async clickPayAndConfirmOrderButton(){
        await this.page.getByRole('button', {name: 'Pay and Confirm Order'}).click()
    }
    async verifyOrderConfirmation(){
       const orderConfirmationMessage = this.page.getByText(verificationMessages.orderConfirmation)
       await expect(orderConfirmationMessage).toBeVisible()
    }
}
