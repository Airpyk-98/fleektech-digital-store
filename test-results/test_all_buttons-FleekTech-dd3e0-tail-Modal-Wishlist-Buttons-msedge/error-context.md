# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test_all_buttons.spec.ts >> FleekTech High-Stakes Comprehensive Button & Flow Verification >> 1. Test Storefront Categories, Brands, Product Detail Modal & Wishlist Buttons
- Location: scripts\test_all_buttons.spec.ts:4:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('main section').filter({ hasText: 'Featured & Trending' }).locator('div.group.relative').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - button "menu" [ref=e5]:
          - generic [ref=e6]: menu
        - link "FLEEKTECH" [ref=e7] [cursor=pointer]:
          - /url: /
          - img "FLEEKTECH" [ref=e8]
      - generic [ref=e10]:
        - generic [ref=e11]: search
        - textbox "Search for phones, laptops, audio..." [ref=e12]
      - generic [ref=e13]:
        - button "person Account expand_more" [ref=e15]:
          - generic [ref=e16]: person
          - generic [ref=e17]: Account
          - generic [ref=e18]: expand_more
        - button "shopping_cart" [ref=e19]:
          - generic [ref=e20]: shopping_cart
    - generic [ref=e22]:
      - link "home" [active] [ref=e23] [cursor=pointer]:
        - /url: /
        - generic [ref=e24]: home
      - button "smartphone" [ref=e25]:
        - generic [ref=e26]: smartphone
      - button "laptop" [ref=e27]:
        - generic [ref=e28]: laptop
      - button "headphones" [ref=e29]:
        - generic [ref=e30]: headphones
      - button "security" [ref=e31]:
        - generic [ref=e32]: security
    - main [ref=e33]:
      - generic [ref=e34]:
        - generic [ref=e35]:
          - heading "Browse Categories" [level=2] [ref=e36]
          - button "View All Categories" [ref=e37]
        - generic [ref=e38]:
          - generic [ref=e39] [cursor=pointer]:
            - generic [ref=e41]: grid_view
            - generic [ref=e42]: All
          - generic [ref=e43] [cursor=pointer]:
            - generic [ref=e45]: smartphone
            - generic [ref=e46]: Phones
          - generic [ref=e47] [cursor=pointer]:
            - generic [ref=e49]: laptop
            - generic [ref=e50]: Laptops
          - generic [ref=e51] [cursor=pointer]:
            - generic [ref=e53]: headphones
            - generic [ref=e54]: Audio
          - generic [ref=e55] [cursor=pointer]:
            - generic [ref=e57]: sports_esports
            - generic [ref=e58]: Gaming
          - generic [ref=e59] [cursor=pointer]:
            - generic [ref=e61]: watch
            - generic [ref=e62]: Wearables
          - generic [ref=e63] [cursor=pointer]:
            - generic [ref=e65]: camera
            - generic [ref=e66]: Cameras
      - generic [ref=e67]:
        - generic [ref=e68]:
          - generic [ref=e69]:
            - navigation [ref=e70]: Home / Categories / Audio
            - heading "Audio" [level=2] [ref=e71]
          - generic [ref=e72]: 1 Product Found
        - generic [ref=e73]:
          - generic [ref=e74]:
            - generic [ref=e75]: tune
            - generic [ref=e76]: "Filter:"
          - 'button "swap_vert Sort by: Popularity" [ref=e77]':
            - generic [ref=e78]: swap_vert
            - generic [ref=e79]: "Sort by: Popularity"
          - button "All Brands" [ref=e81]
          - button "Apple" [ref=e82]
          - button "Samsung" [ref=e83]
          - button "Google" [ref=e84]
          - button "Xiaomi" [ref=e85]
          - button "Sony" [ref=e86]
          - button "Dell" [ref=e87]
          - button "Nintendo" [ref=e88]
      - generic [ref=e91] [cursor=pointer]:
        - generic [ref=e92]: "-25%"
        - button "favorite" [ref=e93]:
          - generic [ref=e94]: favorite
        - img "Sony WH-1000XM5 Noise Canceling Headphones" [ref=e96]
        - generic [ref=e97]:
          - generic [ref=e98]:
            - text: Sony
            - heading "Sony WH-1000XM5 Noise Canceling Headphones" [level=3] [ref=e99]
            - generic [ref=e100]:
              - generic [ref=e101]:
                - generic [ref=e102]: star
                - generic [ref=e103]: star
                - generic [ref=e104]: star
                - generic [ref=e105]: star
                - generic [ref=e106]: star
              - generic [ref=e107]: (124)
          - generic [ref=e108]:
            - generic [ref=e109]:
              - generic [ref=e110]: ₦285,000
              - generic [ref=e111]: ₦380,000
            - button "shopping_cart" [ref=e112]:
              - generic [ref=e113]: shopping_cart
      - generic [ref=e114]:
        - heading "Top Brands" [level=2] [ref=e116]
        - generic [ref=e117]:
          - img "Apple" [ref=e119] [cursor=pointer]
          - img "Samsung" [ref=e121] [cursor=pointer]
          - img "Dell" [ref=e123] [cursor=pointer]
          - img "HP" [ref=e125] [cursor=pointer]
    - contentinfo [ref=e126]:
      - generic [ref=e127]:
        - generic [ref=e128]:
          - img "FLEEKTECH" [ref=e129]
          - paragraph [ref=e130]: Tech-forward electronics designed for modern performance. Powered by AI processors, aerospace titanium, and studio audio fidelity.
        - generic [ref=e131]:
          - heading "Catalog" [level=4] [ref=e132]
          - list [ref=e133]:
            - listitem [ref=e134]:
              - link "Phones & Accessories" [ref=e135] [cursor=pointer]:
                - /url: /
            - listitem [ref=e136]:
              - link "MacBooks & Laptops" [ref=e137] [cursor=pointer]:
                - /url: /
            - listitem [ref=e138]:
              - link "Studio Audio & ANC" [ref=e139] [cursor=pointer]:
                - /url: /
            - listitem [ref=e140]:
              - link "OLED Gaming Consoles" [ref=e141] [cursor=pointer]:
                - /url: /
        - generic [ref=e142]:
          - heading "Customer Care" [level=4] [ref=e143]
          - list [ref=e144]:
            - listitem [ref=e145]:
              - link "Order Status & Tracking" [ref=e146] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e147]:
              - link "Warranty & Titanium Care" [ref=e148] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e149]:
              - link "Returns & Exchanges" [ref=e150] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e151]:
              - link "Contact Support" [ref=e152] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e153]:
          - heading "About Us" [level=4] [ref=e154]
          - list [ref=e155]:
            - listitem [ref=e156]:
              - link "Our Story & Brand" [ref=e157] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e158]:
              - link "Investor Relations" [ref=e159] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e160]:
              - link "Careers at FleekTech" [ref=e161] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e162]:
              - link "Corporate Responsibility" [ref=e163] [cursor=pointer]:
                - /url: "#"
      - generic [ref=e164]:
        - paragraph [ref=e165]: © 2026 FLEEKTECH DIGITAL STORE. All rights reserved. Built with Stitch UI Guide.
        - generic [ref=e166]:
          - link "Privacy Policy" [ref=e167] [cursor=pointer]:
            - /url: "#"
          - link "Terms of Service" [ref=e168] [cursor=pointer]:
            - /url: "#"
          - link "Security" [ref=e169] [cursor=pointer]:
            - /url: "#"
  - button "Open Next.js Dev Tools" [ref=e175] [cursor=pointer]:
    - img [ref=e176]
  - alert [ref=e179]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('FleekTech High-Stakes Comprehensive Button & Flow Verification', () => {
  4   |   test('1. Test Storefront Categories, Brands, Product Detail Modal & Wishlist Buttons', async ({ page }) => {
  5   |     await page.goto('http://localhost:3000/');
  6   |     await expect(page).toHaveTitle(/FLEEKTECH/i);
  7   | 
  8   |     // Test Top Brand Filter Buttons
  9   |     console.log('Testing Brand filter buttons...');
  10  |     const appleBtn = page.locator('section').filter({ hasText: 'Top Brands' }).locator('div').filter({ hasText: /^Apple$/ }).first();
  11  |     if (await appleBtn.isVisible()) {
  12  |       await appleBtn.click();
  13  |       await page.waitForTimeout(500);
  14  |     }
  15  | 
  16  |     const samsungBtn = page.locator('section').filter({ hasText: 'Top Brands' }).locator('div').filter({ hasText: /^Samsung$/ }).first();
  17  |     if (await samsungBtn.isVisible()) {
  18  |       await samsungBtn.click();
  19  |       await page.waitForTimeout(500);
  20  |     }
  21  | 
  22  |     const allBrandsBtn = page.locator('section').filter({ hasText: 'Top Brands' }).locator('div').filter({ hasText: /^All Brands$/ }).first();
  23  |     if (await allBrandsBtn.isVisible()) {
  24  |       await allBrandsBtn.click();
  25  |       await page.waitForTimeout(500);
  26  |     }
  27  | 
  28  |     // Test Category Navigation Buttons (Desktop Sidebar)
  29  |     console.log('Testing Category Navigation buttons...');
  30  |     const phonesNavBtn = page.locator('button[title="Phones"]').first();
  31  |     if (await phonesNavBtn.isVisible()) {
  32  |       await phonesNavBtn.click();
  33  |       await page.waitForTimeout(500);
  34  |     }
  35  | 
  36  |     const laptopsNavBtn = page.locator('button[title="Laptops"]').first();
  37  |     if (await laptopsNavBtn.isVisible()) {
  38  |       await laptopsNavBtn.click();
  39  |       await page.waitForTimeout(500);
  40  |     }
  41  | 
  42  |     const audioNavBtn = page.locator('button[title="Audio"]').first();
  43  |     if (await audioNavBtn.isVisible()) {
  44  |       await audioNavBtn.click();
  45  |       await page.waitForTimeout(500);
  46  |     }
  47  | 
  48  |     const homeNavBtn = page.locator('a[title="Home"]').first();
  49  |     if (await homeNavBtn.isVisible()) {
  50  |       await homeNavBtn.click();
  51  |       await page.waitForTimeout(500);
  52  |     }
  53  | 
  54  |     // Test Product Card Click & Modal Buttons
  55  |     console.log('Testing Product Card and Modal buttons...');
  56  |     const firstProductCard = page.locator('main section').filter({ hasText: 'Featured & Trending' }).locator('div.group.relative').first();
> 57  |     await firstProductCard.waitFor({ state: 'visible', timeout: 10000 });
      |                            ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  58  |     await firstProductCard.click();
  59  | 
  60  |     // Verify Product Detail Modal opened
  61  |     const addToCartModalBtn = page.locator('button', { hasText: 'Add to Cart' }).first();
  62  |     await addToCartModalBtn.waitFor({ state: 'visible' });
  63  |     await addToCartModalBtn.click();
  64  |     await page.waitForTimeout(500);
  65  | 
  66  |     // Re-open a product card to test Wishlist button in modal
  67  |     await firstProductCard.click();
  68  |     const wishlistModalBtn = page.locator('button[title="Save to Wishlist"]').first();
  69  |     if (await wishlistModalBtn.isVisible()) {
  70  |       await wishlistModalBtn.click();
  71  |       await page.waitForTimeout(500);
  72  |     }
  73  | 
  74  |     // Close Modal button
  75  |     const closeModalBtn = page.locator('div.fixed.inset-0.z-50 button').first();
  76  |     if (await closeModalBtn.isVisible()) {
  77  |       await closeModalBtn.click();
  78  |       await page.waitForTimeout(500);
  79  |     }
  80  |   });
  81  | 
  82  |   test('2. Test Cart Drawer Checkboxes, Quantity Controls & Checkout Summary Flow', async ({ page }) => {
  83  |     await page.goto('http://localhost:3000/');
  84  | 
  85  |     // Add an item to cart first
  86  |     const firstProductCard = page.locator('main section').filter({ hasText: 'Featured & Trending' }).locator('div.group.relative').first();
  87  |     await firstProductCard.waitFor({ state: 'visible', timeout: 10000 });
  88  |     await firstProductCard.click();
  89  |     await page.locator('button', { hasText: 'Add to Cart' }).first().click();
  90  |     await page.waitForTimeout(500);
  91  | 
  92  |     // Click Cart Icon in Navbar
  93  |     console.log('Opening Cart Drawer...');
  94  |     await page.locator('header button[title="View Cart"]').first().click();
  95  | 
  96  |     // Verify Cart Drawer opened
  97  |     await expect(page.locator('h2', { hasText: /Your Cart/i })).toBeVisible();
  98  | 
  99  |     // Test Quantity Increase button (+)
  100 |     console.log('Testing Quantity + and - buttons...');
  101 |     const plusBtn = page.locator('button', { hasText: '+' }).first();
  102 |     await plusBtn.click();
  103 |     await page.waitForTimeout(500);
  104 | 
  105 |     // Test Quantity Decrease button (-)
  106 |     const minusBtn = page.locator('button', { hasText: '-' }).first();
  107 |     await minusBtn.click();
  108 |     await page.waitForTimeout(500);
  109 | 
  110 |     // Test Checkbox Selection
  111 |     console.log('Testing Checkbox selection...');
  112 |     const itemCheckbox = page.locator('input[type="checkbox"]').first();
  113 |     await itemCheckbox.uncheck();
  114 |     await page.waitForTimeout(300);
  115 |     await itemCheckbox.check();
  116 |     await page.waitForTimeout(300);
  117 | 
  118 |     // Test Proceed to Checkout Button
  119 |     console.log('Testing Proceed to Checkout button...');
  120 |     const proceedBtn = page.locator('button', { hasText: /PROCEED TO CHECKOUT/i });
  121 |     await proceedBtn.click();
  122 | 
  123 |     // Verify Checkout Summary step
  124 |     await expect(page.locator('h2', { hasText: /Checkout Summary/i })).toBeVisible();
  125 | 
  126 |     // Test Place Order Button
  127 |     console.log('Testing Place Order button...');
  128 |     const placeOrderBtn = page.locator('button', { hasText: /PLACE ORDER/i });
  129 |     await placeOrderBtn.click();
  130 | 
  131 |     // Verify Order Confirmed screen
  132 |     await expect(page.locator('h2', { hasText: /Order Confirmed/i })).toBeVisible({ timeout: 10000 });
  133 | 
  134 |     // Click Continue Shopping button
  135 |     const continueBtn = page.locator('button', { hasText: /Continue Shopping/i });
  136 |     await continueBtn.click();
  137 |     await page.waitForTimeout(500);
  138 |   });
  139 | 
  140 |   test('3. Test User Authentication, Orders Modal, Saved Items Modal & Logout', async ({ page }) => {
  141 |     await page.goto('http://localhost:3000/');
  142 | 
  143 |     // Click Sign In button in Account Dropdown
  144 |     console.log('Testing User Sign In...');
  145 |     const accountBtn = page.locator('header button').filter({ hasText: /account_circle/ }).first();
  146 |     if (await accountBtn.isVisible()) {
  147 |       await accountBtn.click();
  148 |     } else {
  149 |       await page.locator('header span:text("account_circle")').first().click();
  150 |     }
  151 | 
  152 |     const signInBtn = page.locator('button', { hasText: /Sign In/i }).first();
  153 |     await signInBtn.click();
  154 | 
  155 |     // Fill login modal
  156 |     await page.locator('input[type="email"]').fill('ebiringai@gmail.com');
  157 |     await page.locator('input[type="password"]').fill('Airpyk98');
```