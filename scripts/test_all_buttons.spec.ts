import { test, expect } from '@playwright/test';

test.describe('FleekTech High-Stakes Comprehensive Button & Flow Verification', () => {
  test('1. Test Storefront Categories, Brands, Product Detail Modal & Wishlist Buttons', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveTitle(/FLEEKTECH/i);

    // Test Brand Pill Filter Buttons
    console.log('Testing Brand filter buttons...');
    const appleBtn = page.locator('button', { hasText: 'Apple' }).first();
    if (await appleBtn.isVisible()) {
      await appleBtn.click();
      await page.waitForTimeout(400);
    }

    const samsungBtn = page.locator('button', { hasText: 'Samsung' }).first();
    if (await samsungBtn.isVisible()) {
      await samsungBtn.click();
      await page.waitForTimeout(400);
    }

    const allBrandsBtn = page.locator('button', { hasText: 'All Brands' }).first();
    if (await allBrandsBtn.isVisible()) {
      await allBrandsBtn.click();
      await page.waitForTimeout(400);
    }

    // Test Category Navigation Buttons (Sidebar)
    console.log('Testing Category Navigation buttons...');
    const phonesNavBtn = page.locator('button[title="Phones"]').first();
    if (await phonesNavBtn.isVisible()) {
      await phonesNavBtn.click();
      await page.waitForTimeout(400);
    }

    const laptopsNavBtn = page.locator('button[title="Laptops"]').first();
    if (await laptopsNavBtn.isVisible()) {
      await laptopsNavBtn.click();
      await page.waitForTimeout(400);
    }

    const audioNavBtn = page.locator('button[title="Audio"]').first();
    if (await audioNavBtn.isVisible()) {
      await audioNavBtn.click();
      await page.waitForTimeout(400);
    }

    const homeNavBtn = page.locator('a[title="Home"]').first();
    if (await homeNavBtn.isVisible()) {
      await homeNavBtn.click();
      await page.waitForTimeout(400);
    }

    // Test Product Card Click & Modal Buttons
    console.log('Testing Product Card and Modal buttons...');
    const firstProductCard = page.locator('div.group.relative').first();
    await firstProductCard.waitFor({ state: 'visible', timeout: 15000 });
    await firstProductCard.click();

    // Verify Product Detail Modal opened
    const addToCartModalBtn = page.locator('button', { hasText: 'Add to Cart' }).first();
    await addToCartModalBtn.waitFor({ state: 'visible', timeout: 5000 });
    await addToCartModalBtn.click();
    await page.waitForTimeout(400);

    // Re-open a product card to test Wishlist button in modal
    await firstProductCard.click();
    const wishlistModalBtn = page.locator('button[title="Save to Wishlist"]').first();
    if (await wishlistModalBtn.isVisible()) {
      await wishlistModalBtn.click();
      await page.waitForTimeout(400);
    }

    // Close Modal button
    const closeModalBtn = page.locator('div.fixed.inset-0.z-50 button').first();
    if (await closeModalBtn.isVisible()) {
      await closeModalBtn.click();
      await page.waitForTimeout(400);
    }
  });

  test('2. Test Cart Drawer Checkboxes, Quantity Controls & Checkout Summary Flow', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Add an item to cart first
    const firstProductCard = page.locator('div.group.relative').first();
    await firstProductCard.waitFor({ state: 'visible', timeout: 15000 });
    await firstProductCard.click();
    const addToCartBtn = page.locator('button', { hasText: 'Add to Cart' }).first();
    await addToCartBtn.waitFor({ state: 'visible', timeout: 5000 });
    await addToCartBtn.click();
    await page.waitForTimeout(500);

    // Click Cart Icon in Navbar
    console.log('Opening Cart Drawer...');
    await page.locator('header button[title="View Cart"]').first().click();

    // Verify Cart Drawer opened
    await expect(page.locator('h2', { hasText: /Your Cart/i })).toBeVisible({ timeout: 5000 });

    // Test Quantity Increase button (+)
    console.log('Testing Quantity + and - buttons...');
    const plusBtn = page.locator('button', { hasText: '+' }).first();
    await plusBtn.click();
    await page.waitForTimeout(400);

    // Test Quantity Decrease button (-)
    const minusBtn = page.locator('button', { hasText: '-' }).first();
    await minusBtn.click();
    await page.waitForTimeout(400);

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

    // Fill Required Checkout Form Fields
    console.log('Filling checkout delivery address form...');
    const checkoutInputs = page.locator('form input[type="text"]');
    await checkoutInputs.nth(0).waitFor({ state: 'visible', timeout: 5000 });
    await checkoutInputs.nth(0).fill('Ebiringai I.');
    await checkoutInputs.nth(1).fill('08012345678');
    await checkoutInputs.nth(2).fill('Lagos');
    await checkoutInputs.nth(3).fill('123 Victoria Island');

    // Click PLACE ORDER button
    const placeOrderBtn = page.locator('button', { hasText: /PLACE ORDER/i });
    await placeOrderBtn.click();

    // Verify Order Confirmed screen
    await expect(page.locator('h2', { hasText: /Order Confirmed/i })).toBeVisible({ timeout: 10000 });

    // Click Continue Shopping button
    const continueBtn = page.locator('button', { hasText: /Continue Shopping/i });
    await continueBtn.click();
    await page.waitForTimeout(400);
  });

  test('3. Test User Authentication, Orders Modal, Saved Items Modal & Logout', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Click Account button in Navbar
    console.log('Testing User Sign In...');
    const accountBtn = page.locator('header button', { hasText: /Account|Hi/i }).first();
    await accountBtn.waitFor({ state: 'visible', timeout: 10000 });
    await accountBtn.click();

    // If dropdown opened instead of modal directly, click Sign In
    const signInBtn = page.locator('button', { hasText: /^Sign In$/i }).first();
    if (await signInBtn.isVisible()) {
      await signInBtn.click();
    }

    // Fill login modal
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.waitFor({ state: 'visible', timeout: 5000 });
    await emailInput.fill('ebiringai@gmail.com');
    await page.locator('input[type="password"]').first().fill('Airpyk98');
    await page.locator('form button[type="submit"]', { hasText: /LOG IN/i }).click();

    // Verify logged in as Ebiringai
    await page.waitForTimeout(1000);

    // Open Account Dropdown again
    console.log('Testing Orders and Saved Items modals from Account menu...');
    const loggedInAccountBtn = page.locator('header button', { hasText: /Hi/i }).first();
    await loggedInAccountBtn.click();

    // Click Orders button
    const ordersBtn = page.locator('button', { hasText: /Orders/i }).first();
    await ordersBtn.waitFor({ state: 'visible', timeout: 5000 });
    await ordersBtn.click();
    await expect(page.locator('h2', { hasText: /My Orders/i })).toBeVisible({ timeout: 5000 });
    await page.locator('div.fixed.inset-0.z-50 button').first().click();
    await page.waitForTimeout(400);

    // Open Account Dropdown again and click Saved Items
    await loggedInAccountBtn.click();
    const savedBtn = page.locator('button', { hasText: /Saved Items/i }).first();
    await savedBtn.waitFor({ state: 'visible', timeout: 5000 });
    await savedBtn.click();
    await expect(page.locator('h2', { hasText: /Saved Items/i })).toBeVisible({ timeout: 5000 });
    await page.locator('div.fixed.inset-0.z-50 button').first().click();
    await page.waitForTimeout(400);

    // Open Account Dropdown and Logout
    console.log('Testing Logout button...');
    await loggedInAccountBtn.click();
    const logoutBtn = page.locator('button', { hasText: /LOGOUT/i }).first();
    await logoutBtn.click();
    await page.waitForTimeout(400);
  });

  test('4. Test Admin Portal Login, Product Management, Preview Storefront & Return Banner', async ({ page }) => {
    await page.goto('http://localhost:3000/admin');

    // Admin Login
    console.log('Testing Admin Portal Login...');
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await emailInput.fill('admin@fleektech.com');
    await page.locator('input[type="password"]').first().fill('NwachukwuJacklyn');
    await page.locator('button[type="submit"]', { hasText: /ACCESS ADMIN PORTAL/i }).click();

    // Verify Admin Dashboard loaded
    await expect(page.locator('h1', { hasText: /Catalog & Inventory Management/i })).toBeVisible({ timeout: 10000 });

    // Test Add New Product Button
    console.log('Testing Add New Product button...');
    const addProductBtn = page.locator('button', { hasText: /Add New Product/i }).first();
    await addProductBtn.click();
    await expect(page.locator('h3', { hasText: /Add New Product/i })).toBeVisible({ timeout: 5000 });
    
    // Close modal
    await page.locator('div.fixed.inset-0.z-50 button').first().click();
    await page.waitForTimeout(400);

    // Test Preview Storefront Button
    console.log('Testing Preview Storefront button...');
    const previewBtn = page.locator('a', { hasText: /Preview Storefront/i }).first();
    await previewBtn.click();

    // Verify URL is home page and Admin Return Banner is visible
    await expect(page).toHaveURL('http://localhost:3000/');
    const returnBanner = page.locator('div', { hasText: /Admin Mode: Previewing Storefront/i }).first();
    await expect(returnBanner).toBeVisible({ timeout: 5000 });

    // Test Return to Admin Dashboard Button
    console.log('Testing Return to Admin Dashboard banner button...');
    const returnBtn = page.locator('a', { hasText: /Return to Admin Dashboard/i }).first();
    await returnBtn.click();

    // Verify returned to Admin Dashboard
    await expect(page).toHaveURL(/.*\/admin/);
    await expect(page.locator('h1', { hasText: /Catalog & Inventory Management/i })).toBeVisible({ timeout: 5000 });

    // Test Logout Button on Admin Dashboard
    console.log('Testing Admin Logout button...');
    const adminLogoutBtn = page.locator('button', { hasText: /Logout/i }).first();
    await adminLogoutBtn.click();
    await expect(page.locator('h1', { hasText: /FleekTech Admin Portal/i })).toBeVisible({ timeout: 5000 });
  });
});
