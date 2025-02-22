import { test } from '@playwright/test';
import { loginData, urlData } from '../data/testData';
import { LoginPage } from '../page/loginPage';
import { SignupPage } from '../page/signupPage';

let loginPage: LoginPage
let signupPage: SignupPage

test.beforeEach (async ({page}) => {
  loginPage = new LoginPage(page)
  signupPage = new SignupPage(page)
  await loginPage.navigateToLoginPage(urlData.loginPageURL)
  await signupPage.verifySignupAndLoginPageIsLoaded()
  })


test ("Attempt login with valid email and invalid password", async ({page}) => {
  await loginPage.fillEmailAndPasswordInLoginForm(loginData.loginEmail, loginData.invalidLoginPassword)
  await loginPage.verifyLoginErrorMessage()
})

test ("Attempt login with invalid email and invalid password", async ({page}) => {
  await loginPage.fillEmailAndPasswordInLoginForm(loginData.invalidLoginEmail, loginData.invalidLoginPassword)
  await loginPage.verifyLoginErrorMessage()
})

test ("Attempt login with blank password", async ({page}) =>{
  await loginPage.fillEmailAndPasswordInLoginForm(loginData.loginEmail, "")

  await loginPage.verifyEmptyPasswordFieldIsFocused()
})

test ("Login with valid email and valid password", async ({page}) =>{
  await loginPage.fillEmailAndPasswordInLoginForm(loginData.loginEmail, loginData.validLoginPassword)
  await loginPage.verifyUserIsLoggedIn()
})

