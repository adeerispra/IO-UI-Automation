export class LoginPage{
    constructor(page){
        this.page = page;
        this.usernameInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]');
        this.proceedtoCheckoutButton = page.locator('[data-test="proceed-2"]');
        this.loggedInMessage = page.locator('.login-form-1 p');
    }

    async login(email, password){
        await this.usernameInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async gotoCheckoutPage(){
        await this.proceedtoCheckoutButton.click();
    }
    
}