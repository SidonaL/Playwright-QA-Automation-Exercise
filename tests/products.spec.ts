import { test } from '@playwright/test';
import { urlData, productData } from '../data/testData';
import { ProductsPage } from '../page/productPage';

let productsPage: ProductsPage

test.beforeEach (async ({page}) => {
    productsPage = new ProductsPage(page)
    await productsPage.navigateToProductsPage(urlData.productsPageURL)
    await productsPage.verifyProductsPageIsLoaded()
})

test ('Verify product detail sections are displayed correctly', async ({page}) => {
 await  productsPage.viewProductInformation(productData.blueTop.name)
 await productsPage.verifyProductDetailPageIsLoaded()
 await productsPage.verifyProductInfoIsVisible()
})

test ('Verify searchbar functionality works correctly', async ({page}) => {
    await productsPage.searchAndVerifyProduct(productData.fancyGreenTop.name)
})
