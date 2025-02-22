import { Page, expect } from "@playwright/test"; 
import { signupData, verificationMessages, errorMessages, pageTitle, pageHeader } from '../data/testData';

export class SignupPage {
    
    readonly page: Page

    constructor (page: Page){
        this.page = page
    
    }
    async navigateToSignupPage(signupPageURL: string){
        await this.page.goto(signupPageURL)
        const consentButton = this.page.getByRole('button', { name: 'Consent' })
        if (await consentButton.isVisible()) {
            await consentButton.click()
        }
    }

    async verifySignupAndLoginPageIsLoaded(){
        await expect(this.page).toHaveTitle(pageTitle.signupAndLoginPageTitle)
        await expect(this.page.getByText(pageHeader.loginFormHeader)).toBeVisible();
        await expect(this.page.getByText(pageHeader.signupFormHeader)).toBeVisible();
    }

    async fillUsernameAndEmail(signupUsername: string, signupEmail: string){
        const newUserSignup=this.page.locator('.signup-form')
        await newUserSignup.getByRole('textbox', {name: 'Name'}).fill(signupUsername)
        await newUserSignup.getByRole('textbox', {name: 'Email'}).fill(signupEmail)
        await this.page.getByRole('button', {name: 'Signup'}).click()
    }

    async verifySignupPageIsLoaded(){
        await expect(this.page.getByText(pageHeader.accountInformationHeader)).toBeVisible();
    }

    async fillInformationAndCreateAccount(){
        const sigupForm = this.page.locator(".login-form")

        await sigupForm.getByRole('radio', {name: 'Mrs.'}).check()
        await sigupForm.getByRole('textbox', {name: 'Password'}).fill(signupData.signupPassword)
        await sigupForm.locator('#days').selectOption({ value: signupData.userBirthDay})
        await sigupForm.locator('#months').selectOption({ value: signupData.userBirthMonth })
        await sigupForm.locator('#years').selectOption({ value: signupData.userBirthYear })
        await sigupForm.getByRole('checkbox', {name: 'newsletter'}).check()
        await sigupForm.locator('#optin').check()


        await sigupForm.getByRole('textbox', {name: 'First name'}).fill(signupData.firstName) 
        await sigupForm.getByRole('textbox', {name: 'Last name'}).fill(signupData.lastName)
        await sigupForm.locator('#company').fill(signupData.company) 
        await sigupForm.locator('#address1').fill(signupData.address) 
        await sigupForm.locator('#address2').fill(signupData.address2) 
        await sigupForm.getByRole('combobox', {name: 'country'}).selectOption(signupData.country) 
        await sigupForm.getByRole('textbox', {name: 'state'}).fill(signupData.state) 
        await sigupForm.getByRole('textbox', {name: 'city'}).fill(signupData.city) 
        await sigupForm.locator('#zipcode').fill(signupData.zipcode)
        await sigupForm.getByRole('textbox', {name: 'Mobile number'}).fill(signupData.mobileNumber)
        
        await sigupForm.getByRole('button', {name: 'Create Account'}).click()
    }
    
    async verifyAccountIsCreated(){
        const accountCreatedConfirmation = this.page.getByText(verificationMessages.accountCreated)
        await expect(accountCreatedConfirmation).toBeVisible()
    }

    async verifyEmailAlreadyRegisteredErrorMessage(){
        const signupErrorMessage = this.page.getByText(errorMessages.emailAlreadyExist)
        await expect(signupErrorMessage).toBeVisible()
    }
}
