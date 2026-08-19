import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CheckoutStepOnePage } from '../pages/checkout.one.page';
import { CheckoutStepTwoPage } from '../pages/checkout.two.page';
import { CheckoutCompletePage } from '../pages/checkout.complete.page';
import { CartPage } from '../pages/cart.page';

test('Полный цикл оформления заказа', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    const pageTitle = await inventoryPage.getPageTitle();
    await expect(pageTitle).toBe('Products');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const cartPage = new CartPage(page);
    await inventoryPage.sortBy('hilo');
    await page.locator('[data-test^="add-to-cart"]').first().click();
    await inventoryPage.openCart();
    const cartItemCount = await cartPage.getCartItemCount();
    await expect(cartItemCount).toBe(1);
    const checkOutStepOnePage = new CheckoutStepOnePage(page);
    const checkOutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await cartPage.goToCheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await checkOutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await checkOutStepTwoPage.finishCheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    const message = await checkoutCompletePage.getCompletionMessage();
    await expect(message).toContain('Thank you for your order!');
});

