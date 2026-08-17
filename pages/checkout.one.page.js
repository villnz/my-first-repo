export class CheckoutStepOnePage {
    constructor(page){
        this.page = page;
        this.nameInput = page.locator('[data-test="firstName"]');
        this.surnameInput = page.locator('[data-test="lastName"]');
        this.mailIndex = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
    }
    async fillUserInfo(firstName, lastName, postalCode){
        await this.nameInput.fill(firstName);
        await this.surnameInput.fill(lastName);
        await this.mailIndex.fill(postalCode);
        await this.continueButton.click();
    }
}