import { test } from '@playwright/test';
import { CartPage } from '../page/cartPage';
import { ProductsPage} from '../page/productPage';
import { urlData, productData, loginData} from '../data/testData';
import { LoginPage } from '../page/loginPage';
import { SignupPage } from '../page/signupPage';

let cartPage: CartPage
let productsPage: ProductsPage
let loginPage: LoginPage
let signupPage: SignupPage

const productNames = [
    productData.blueTop.name,
    productData.blueTop.name,
    productData.menTshirt.name,
    productData.sleevelessDress.name,
]

test.beforeEach(async ({page}) => {
 cartPage = new CartPage(page)
 productsPage = new ProductsPage(page)
 loginPage = new LoginPage(page)
 signupPage = new SignupPage(page)

await productsPage.navigateToProductsPage(urlData.productsPageURL)
await productsPage.verifyProductsPageIsLoaded()
})

test('Verify single product can be added to the cart', async ({page}) => {
await cartPage.addProductsToCartByName(productData.halfSleevesTop.name)
})

test('Verify multiple products can be added to the cart', async ({page}) => {
    await cartPage.addProductsToCartByName(...productNames)
})

test('Verify cart displays correct products and quantities', async ({page}) => {
    await cartPage.addProductsToCartByName(...productNames)
    await cartPage.verifyCorrectProductIsAddedToCart(...productNames)
    await cartPage.verifyCartItemQuantity(...productNames)
})


test ('Verify product can be removed from the cart', async ({page}) => {
    await cartPage.addProductsToCartByName(...productNames)
    await cartPage.navigateToCart()
    await cartPage.verifyCartPageIsLoaded()
    await cartPage.verifyCorrectProductIsAddedToCart()
    await cartPage.removeProductFromCart()
    await cartPage.verifyCartIsEmpty()
})
    
test ('Complete checkout process and verify order details', async ({page}) => {
   await loginPage.navigateToLoginPage(urlData.loginPageURL)
   await signupPage.verifySignupAndLoginPageIsLoaded()
   await loginPage.fillEmailAndPasswordInLoginForm(loginData.loginEmail, loginData.validLoginPassword)
   await cartPage.addProductsToCartByName(...productNames)
   await cartPage.verifyCorrectProductIsAddedToCart()
   await cartPage.clickProceedToCheckoutButton()
   await cartPage.verifyAdressDetailsAtCheckout()
   await cartPage.verifyTotalPriceInCart()
   await cartPage.clickPlaceOrderButton()
   await cartPage.fillPaymentInformation()
   await cartPage.clickPayAndConfirmOrderButton()
   await cartPage.verifyOrderConfirmation()
})


