import { test } from '@playwright/test';
import { signupData, loginData, urlData } from '../data/testData';
import { SignupPage } from '../page/signupPage';

let signupPage: SignupPage

test.beforeEach (async ({page}) =>{
    signupPage = new SignupPage(page)
    await signupPage.navigateToSignupPage(urlData.signupPageURL)
    await signupPage.verifySignupAndLoginPageIsLoaded()
})

test('Register new user', async ({ page }) => {
await signupPage.fillUsernameAndEmail(signupData.signupUsername, signupData.signupEmail)
await signupPage.verifySignupPageIsLoaded()
await signupPage.fillInformationAndCreateAccount()
await signupPage.verifyAccountIsCreated()
  
});

test ('Attempt to register with existing email', async ({page}) => {
await signupPage.fillUsernameAndEmail(loginData.loginUsername, loginData.loginEmail)
await signupPage.verifyEmailAlreadyRegisteredErrorMessage()
})