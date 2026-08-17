import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CheckoutStepOnePage } from '../pages/checkout.one.page';
import { CheckoutStepTwoPage } from '../pages/checkout.two.page';
import { CheckoutCompletePage } from '../pages/checkout.complete.page';
import { CartPage } from '../pages/cart.page';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Успешный логин и проверка страницы товаров', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    const pageTitle = await inventoryPage.getPageTitle();
    await expect(pageTitle).toBe('Products');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Добавление самого дорогого товара в корзину и проверка что он в корзине', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await inventoryPage.sortBy('hilo');
    await page.locator('[data-test^="add-to-cart"]').first().click();
    await inventoryPage.openCart();
    const cartItemCount = await cartPage.getCartItemCount();
    await expect(cartItemCount).toBe(1);
});
test ('Оформление заказа', async({page}) =>{
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkOutStepOnePage = new CheckoutStepOnePage(page);
    const checkOutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await inventoryPage.openCart();
    await cartPage.goToCheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await checkOutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await checkOutStepTwoPage.finishCheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await checkoutCompletePage.getCompletionMessage();
});
