import { test, expect } from '@playwright/test';

test.describe('FleekTech High-Stakes Comprehensive Button & Flow Verification', () => {
  test('1. Test Storefront Categories, Brands, Product Detail Modal & Wishlist Buttons', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveTitle(/FLEEKTECH/i);

    // Test Top Brand Filter Buttons
    console.log('Testing Brand filter buttons...');
    const appleBtn = page.locator('section').filter({ hasText: 'Top Brands' }).locator('div').filter({ hasText: /^Apple$/ }).first();
    if (await appleBtn.isVisible()) {
      await appleBtn.click();
      await page.waitForTimeout(500);
    }

    const samsungBtn = page.locator('section').filter({ hasText: 'Top Brands' }).locator('div').filter({ hasText: /^Samsung$/ }).first();
    if (await samsungBtn.isVisible()) {
      await samsungBtn.click();
      await page.waitForTimeout(500);
    }

    const allBrandsBtn = page.locator('section').filter({ hasText: 'Top Brands' }).locator('div').filter({ hasText: /^All Brands$/ }).first();
    if (await allBrandsBtn.isVisible()) {
      await allBrandsBtn.click();
      await page.waitForTimeout(500);
    }

    // Test Category Navigation Buttons (Desktop Sidebar)
    console.log('Testing Category Navigation buttons...');
    const phonesNavBtn = page.locator('button[title="Phones"]').first();
    if (await phonesNavBtn.isVisible()) {
      await phonesNavBtn.click();
      await page.waitForTimeout(500);
    }

    const laptopsNavBtn = page.locator('button[title="Laptops"]').first();
    if (await laptopsNavBtn.isVisible()) {
      await laptopsNavBtn.click();
      await page.waitForTimeout(500);
    }

    const audioNavBtn = page.locator('button[title="Audio"]').first();
    if (await audioNavBtn.isVisible()) {
      await audioNavBtn.click();
      await page.waitForTimeout(500);
    }

    const homeNavBtn = page.locator('a[title="Home"]').first();
    if (await homeNavBtn.isVisible()) {
      await homeNavBtn.click();
      await page.waitForTimeout(500);
    }

    // Test Product Card Click & Modal Buttons
    console.log('Testing Product Card and Modal buttons...');
    const firstProductCard = page.locator('main section').filter({ hasText: 'Featured & Trending' }).locator('div.group.relative').first();
    await firstProductCard.waitFor({ state: 'visible', timeout: 10000 });
    await firstProductCard.click();

    // Verify Product Detail Modal opened
    const addToCartModalBtn = page.locator('button', { hasText: 'Add to Cart' }).first();
    await addToCartModalBtn.waitFor({ state: 'visible' });
    await addToCartModalBtn.click();
    await page.waitForTimeout(500);

    // Re-open a product card to test Wishlist button in modal
    await firstProductCard.click();
    const wishlistModalBtn = page.locator('button[title="Save to Wishlist"]').first();
    if (await wishlistModalBtn.isVisible()) {
      await wishlistModalBtn.click();
      await page.waitForTimeout(500);
    }

    // Close Modal button
    const closeModalBtn = page.locator('div.fixed.inset-0.z-50 button').first();
    if (await closeModalBtn.isVisible()) {
      await closeModalBtn.click();
      await page.waitForTimeout(500);
    }
  });

  test('2. Test Cart Drawer Checkboxes, Quantity Controls & Checkout Summary Flow', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Add an item to cart first
    const firstProductCard = page.locator('main section').filter({ hasText: 'Featured & Trending' }).locator('div.group.relative').first();
    await firstProductCard.waitFor({ state: 'visible', timeout: 10000 });
    await firstProductCard.click();
    await page.locator('button', { hasText: 'Add to Cart' }).first().click();
    await page.waitForTimeout(500);

    // Click Cart Icon in Navbar
    console.log('Opening Cart Drawer...');
    await page.locator('header button[title="View Cart"]').first().click();

    // Verify Cart Drawer opened
    await expect(page.locator('h2', { hasText: /Your Cart/i })).toBeVisible();

    // Test Quantity Increase button (+)
    console.log('Testing Quantity + and - buttons...');
    const plusBtn = page.locator('button', { hasText: '+' }).first();
    await plusBtn.click();
    await page.waitForTimeout(500);

    // Test Quantity Decrease button (-)
    const minusBtn = page.locator('button', { hasText: '-' }).first();
    await minusBtn.click();
    await page.waitForTimeout(500);

    // Test Checkbox Selection
    console.log('Testing Checkbox selection...');
    const itemCheckbox = page.locator('input[type="checkbox"]').first();
    await itemCheckbox.uncheck();
    await page.waitForTimeout(300);
    await itemCheckbox.check();
    await page.waitForTimeout(300);

    // Test Proceed to Checkout Button
    console.log('Testing Proceed to Checkout button...');
    const proceedBtn = page.locator('button', { hasText: /PROCEED TO CHECKOUT/i });
    await proceedBtn.click();

    // Verify Checkout Summary step
    await expect(page.locator('h2', { hasText: /Checkout Summary/i })).toBeVisible();

    // Test Place Order Button
    console.log('Testing Place Order button...');
    const placeOrderBtn = page.locator('button', { hasText: /PLACE ORDER/i });
    await placeOrderBtn.click();

    // Verify Order Confirmed screen
    await expect(page.locator('h2', { hasText: /Order Confirmed/i })).toBeVisible({ timeout: 10000 });

    // Click Continue Shopping button
    const continueBtn = page.locator('button', { hasText: /Continue Shopping/i });
    await continueBtn.click();
    await page.waitForTimeout(500);
  });

  test('3. Test User Authentication, Orders Modal, Saved Items Modal & Logout', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Click Sign In button in Account Dropdown
    console.log('Testing User Sign In...');
    const accountBtn = page.locator('header button').filter({ hasText: /account_circle/ }).first();
    if (await accountBtn.isVisible()) {
      await accountBtn.click();
    } else {
      await page.locator('header span:text("account_circle")').first().click();
    }

    const signInBtn = page.locator('button', { hasText: /Sign In/i }).first();
    await signInBtn.click();

    // Fill login modal
    await page.locator('input[type="email"]').fill('ebiringai@gmail.com');
    await page.locator('input[type="password"]').fill('Airpyk98');
    await page.locator('form button[type="submit"]', { hasText: /LOG IN/i }).click();

    // Verify logged in as Ebiringai I.
    await page.waitForTimeout(1000);

    // Open Account Dropdown again
    console.log('Testing Orders and Saved Items modals from Account menu...');
    await page.locator('header span:text("account_circle")').first().click();

    // Click Orders button
    const ordersBtn = page.locator('button', { hasText: /Orders/i }).first();
    await ordersBtn.click();
    await expect(page.locator('h2', { hasText: /My Orders/i })).toBeVisible();
    await page.locator('div.fixed.inset-0.z-50 button').first().click();
    await page.waitForTimeout(500);

    // Open Account Dropdown again and click Saved Items
    await page.locator('header span:text("account_circle")').first().click();
    const savedBtn = page.locator('button', { hasText: /Saved Items/i }).first();
    await savedBtn.click();
    await expect(page.locator('h2', { hasText: /Saved Items/i })).toBeVisible();
    await page.locator('div.fixed.inset-0.z-50 button').first().click();
    await page.waitForTimeout(500);

    // Open Account Dropdown and Logout
    console.log('Testing Logout button...');
    await page.locator('header span:text("account_circle")').first().click();
    const logoutBtn = page.locator('button', { hasText: /LOGOUT/i }).first();
    await logoutBtn.click();
    await page.waitForTimeout(500);
  });

  test('4. Test Admin Portal Login, Product Management, Preview Storefront & Return Banner', async ({ page }) => {
    await page.goto('http://localhost:3000/admin');

    // Admin Login
    console.log('Testing Admin Portal Login...');
    await page.locator('input[type="email"]').fill('admin@fleektech.com');
    await page.locator('input[type="password"]').fill('NwachukwuJacklyn');
    await page.locator('button[type="submit"]', { hasText: /LOG IN AS EXECUTIVE ADMIN/i }).click();

    // Verify Admin Dashboard loaded
    await expect(page.locator('h1', { hasText: /Catalog & Inventory Management/i })).toBeVisible({ timeout: 10000 });

    // Test Add New Product Button
    console.log('Testing Add New Product button...');
    const addProductBtn = page.locator('button', { hasText: /Add New Product/i });
    await addProductBtn.click();
    await expect(page.locator('h2', { hasText: /Add New Product/i })).toBeVisible();
    
    // Close modal
    await page.locator('div.fixed.inset-0.z-50 button').first().click();
    await page.waitForTimeout(500);

    // Test Preview Storefront Button
    console.log('Testing Preview Storefront button...');
    const previewBtn = page.locator('a', { hasText: /Preview Storefront/i });
    await previewBtn.click();

    // Verify URL is home page and Admin Return Banner is visible
    await expect(page).toHaveURL('http://localhost:3000/');
    const returnBanner = page.locator('div', { hasText: /Admin Mode: Previewing Storefront/i }).first();
    await expect(returnBanner).toBeVisible();

    // Test Return to Admin Dashboard Button
    console.log('Testing Return to Admin Dashboard banner button...');
    const returnBtn = page.locator('a', { hasText: /Return to Admin Dashboard/i });
    await returnBtn.click();

    // Verify returned to Admin Dashboard
    await expect(page).toHaveURL(/.*\/admin/);
    await expect(page.locator('h1', { hasText: /Catalog & Inventory Management/i })).toBeVisible();

    // Test Logout Button on Admin Dashboard
    console.log('Testing Admin Logout button...');
    const adminLogoutBtn = page.locator('button', { hasText: /Logout/i });
    await adminLogoutBtn.click();
    await expect(page.locator('h1', { hasText: /FleekTech Admin Portal/i })).toBeVisible();
  });
});
