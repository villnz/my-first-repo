export class CartPage {
    constructor(page){
        this.page = page;
        this.cartItems = page.locator('[data-test="cart-list"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }
    async goToCheckout(){
        await this.checkoutButton.click();
    }
    async continueShopping(){
        await this.continueShoppingButton.click();
    }
    async getCartItemCount(){
        return this.cartItems.count();
    }
}