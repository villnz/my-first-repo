export class InventoryPage {
    constructor(page){
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.itemList = page.locator('[data-test="inventory-list"]');
        this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]')
    }
    async getPageTitle(){
        return await this.pageTitle.textContent();
    }
    async openCart(){
        await this.cartIcon.click();
    }
    async addItemToCart(itemName){
        const itemId = itemName.toLowerCase().replace(/ /g, '-');
        await this.page.locator(`[data-test="add-to-cart-${itemId}"]`).click();
    }
    async sortBy(option) { 
        await this.sortDropdown.selectOption(option);
        await this.page.waitForTimeout(500);
    }
}