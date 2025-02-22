import { Page, expect} from "@playwright/test"; 
import { verificationMessages, errorMessages } from '../data/testData';

export class LoginPage {
    
    readonly page: Page

    constructor (page: Page){
        this.page = page
    
    }

    async navigateToLoginPage(loginPageURL: string){
        await this.page.goto(loginPageURL)
        const consentButton = this.page.getByRole('button', { name: 'Consent' })
    if (await consentButton.isVisible()) {
        await consentButton.click()
    }
    }

    async fillEmailAndPasswordInLoginForm(loginEmail:string, loginPassword:string ){
       const userLoginForm = this.page.locator('.login-form')
       await userLoginForm.getByRole('textbox', {name: 'Email'}).fill(loginEmail)
       await userLoginForm.getByRole('textbox', {name: 'Password'}).fill(loginPassword)
       await this.page.getByRole('button', {name: 'Login'}).click()
    }

    async verifyLoginErrorMessage(){
        const loginErrorMessage = this.page.getByText(errorMessages.invalidLogin)
        await expect(loginErrorMessage).toBeVisible()
    }

    async verifyEmptyPasswordFieldIsFocused(){
        const loginFormPasswordField = this.page.getByRole('textbox', {name: 'Password'})
        await expect(loginFormPasswordField).toBeFocused()
    }

    async verifyUserIsLoggedIn(){
        const loggedInConfirmation = this.page.getByText(verificationMessages.loggedInAs)
        await expect(loggedInConfirmation).toBeVisible()
    }
}
