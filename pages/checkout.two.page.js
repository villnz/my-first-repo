export class CheckoutStepTwoPage {
    constructor(page){
        this.page = page;
        this.orderInfo = page.locator('[data-test="checkout-summary-container"]');
        this.finalSum = page.locator('[data-test="total-info"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }
    async finishCheckout(){
        await this.finishButton.click();
    }
}