# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test_all_buttons.spec.ts >> FleekTech High-Stakes Comprehensive Button & Flow Verification >> 4. Test Admin Portal Login, Product Management, Preview Storefront & Return Banner
- Location: scripts\test_all_buttons.spec.ts:190:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('button[type="submit"]').filter({ hasText: /LOG IN AS EXECUTIVE ADMIN/i })

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
      - link "home" [ref=e23] [cursor=pointer]:
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
        - generic [ref=e36]: admin_panel_settings
        - heading "FleekTech Admin Portal" [level=1] [ref=e37]
        - paragraph [ref=e38]: Restricted management access. Please authenticate with executive credentials.
        - generic [ref=e39]:
          - paragraph [ref=e40]: "Demo Admin Credentials:"
          - paragraph [ref=e41]: "Email: admin@fleektech.com"
          - paragraph [ref=e42]: "Password: NwachukwuJacklyn (or admin123)"
        - generic [ref=e43]:
          - generic [ref=e44]:
            - generic [ref=e45]: Admin Email
            - textbox "admin@fleektech.com" [ref=e46]
          - generic [ref=e47]:
            - generic [ref=e48]: Admin Password
            - textbox "••••••••" [active] [ref=e49]: NwachukwuJacklyn
          - button "lock_open ACCESS ADMIN PORTAL" [ref=e50]:
            - generic [ref=e51]: lock_open
            - text: ACCESS ADMIN PORTAL
    - contentinfo [ref=e52]:
      - generic [ref=e53]:
        - generic [ref=e54]:
          - img "FLEEKTECH" [ref=e55]
          - paragraph [ref=e56]: Tech-forward electronics designed for modern performance. Powered by AI processors, aerospace titanium, and studio audio fidelity.
        - generic [ref=e57]:
          - heading "Catalog" [level=4] [ref=e58]
          - list [ref=e59]:
            - listitem [ref=e60]:
              - link "Phones & Accessories" [ref=e61] [cursor=pointer]:
                - /url: /
            - listitem [ref=e62]:
              - link "MacBooks & Laptops" [ref=e63] [cursor=pointer]:
                - /url: /
            - listitem [ref=e64]:
              - link "Studio Audio & ANC" [ref=e65] [cursor=pointer]:
                - /url: /
            - listitem [ref=e66]:
              - link "OLED Gaming Consoles" [ref=e67] [cursor=pointer]:
                - /url: /
        - generic [ref=e68]:
          - heading "Customer Care" [level=4] [ref=e69]
          - list [ref=e70]:
            - listitem [ref=e71]:
              - link "Order Status & Tracking" [ref=e72] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e73]:
              - link "Warranty & Titanium Care" [ref=e74] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e75]:
              - link "Returns & Exchanges" [ref=e76] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e77]:
              - link "Contact Support" [ref=e78] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e79]:
          - heading "About Us" [level=4] [ref=e80]
          - list [ref=e81]:
            - listitem [ref=e82]:
              - link "Our Story & Brand" [ref=e83] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e84]:
              - link "Investor Relations" [ref=e85] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e86]:
              - link "Careers at FleekTech" [ref=e87] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e88]:
              - link "Corporate Responsibility" [ref=e89] [cursor=pointer]:
                - /url: "#"
      - generic [ref=e90]:
        - paragraph [ref=e91]: © 2026 FLEEKTECH DIGITAL STORE. All rights reserved. Built with Stitch UI Guide.
        - generic [ref=e92]:
          - link "Privacy Policy" [ref=e93] [cursor=pointer]:
            - /url: "#"
          - link "Terms of Service" [ref=e94] [cursor=pointer]:
            - /url: "#"
          - link "Security" [ref=e95] [cursor=pointer]:
            - /url: "#"
  - button "Open Next.js Dev Tools" [ref=e101] [cursor=pointer]:
    - img [ref=e102]
  - alert [ref=e105]
```

# Test source

```ts
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
  158 |     await page.locator('form button[type="submit"]', { hasText: /LOG IN/i }).click();
  159 | 
  160 |     // Verify logged in as Ebiringai I.
  161 |     await page.waitForTimeout(1000);
  162 | 
  163 |     // Open Account Dropdown again
  164 |     console.log('Testing Orders and Saved Items modals from Account menu...');
  165 |     await page.locator('header span:text("account_circle")').first().click();
  166 | 
  167 |     // Click Orders button
  168 |     const ordersBtn = page.locator('button', { hasText: /Orders/i }).first();
  169 |     await ordersBtn.click();
  170 |     await expect(page.locator('h2', { hasText: /My Orders/i })).toBeVisible();
  171 |     await page.locator('div.fixed.inset-0.z-50 button').first().click();
  172 |     await page.waitForTimeout(500);
  173 | 
  174 |     // Open Account Dropdown again and click Saved Items
  175 |     await page.locator('header span:text("account_circle")').first().click();
  176 |     const savedBtn = page.locator('button', { hasText: /Saved Items/i }).first();
  177 |     await savedBtn.click();
  178 |     await expect(page.locator('h2', { hasText: /Saved Items/i })).toBeVisible();
  179 |     await page.locator('div.fixed.inset-0.z-50 button').first().click();
  180 |     await page.waitForTimeout(500);
  181 | 
  182 |     // Open Account Dropdown and Logout
  183 |     console.log('Testing Logout button...');
  184 |     await page.locator('header span:text("account_circle")').first().click();
  185 |     const logoutBtn = page.locator('button', { hasText: /LOGOUT/i }).first();
  186 |     await logoutBtn.click();
  187 |     await page.waitForTimeout(500);
  188 |   });
  189 | 
  190 |   test('4. Test Admin Portal Login, Product Management, Preview Storefront & Return Banner', async ({ page }) => {
  191 |     await page.goto('http://localhost:3000/admin');
  192 | 
  193 |     // Admin Login
  194 |     console.log('Testing Admin Portal Login...');
  195 |     await page.locator('input[type="email"]').fill('admin@fleektech.com');
  196 |     await page.locator('input[type="password"]').fill('NwachukwuJacklyn');
> 197 |     await page.locator('button[type="submit"]', { hasText: /LOG IN AS EXECUTIVE ADMIN/i }).click();
      |                                                                                            ^ Error: locator.click: Test timeout of 60000ms exceeded.
  198 | 
  199 |     // Verify Admin Dashboard loaded
  200 |     await expect(page.locator('h1', { hasText: /Catalog & Inventory Management/i })).toBeVisible({ timeout: 10000 });
  201 | 
  202 |     // Test Add New Product Button
  203 |     console.log('Testing Add New Product button...');
  204 |     const addProductBtn = page.locator('button', { hasText: /Add New Product/i });
  205 |     await addProductBtn.click();
  206 |     await expect(page.locator('h2', { hasText: /Add New Product/i })).toBeVisible();
  207 |     
  208 |     // Close modal
  209 |     await page.locator('div.fixed.inset-0.z-50 button').first().click();
  210 |     await page.waitForTimeout(500);
  211 | 
  212 |     // Test Preview Storefront Button
  213 |     console.log('Testing Preview Storefront button...');
  214 |     const previewBtn = page.locator('a', { hasText: /Preview Storefront/i });
  215 |     await previewBtn.click();
  216 | 
  217 |     // Verify URL is home page and Admin Return Banner is visible
  218 |     await expect(page).toHaveURL('http://localhost:3000/');
  219 |     const returnBanner = page.locator('div', { hasText: /Admin Mode: Previewing Storefront/i }).first();
  220 |     await expect(returnBanner).toBeVisible();
  221 | 
  222 |     // Test Return to Admin Dashboard Button
  223 |     console.log('Testing Return to Admin Dashboard banner button...');
  224 |     const returnBtn = page.locator('a', { hasText: /Return to Admin Dashboard/i });
  225 |     await returnBtn.click();
  226 | 
  227 |     // Verify returned to Admin Dashboard
  228 |     await expect(page).toHaveURL(/.*\/admin/);
  229 |     await expect(page.locator('h1', { hasText: /Catalog & Inventory Management/i })).toBeVisible();
  230 | 
  231 |     // Test Logout Button on Admin Dashboard
  232 |     console.log('Testing Admin Logout button...');
  233 |     const adminLogoutBtn = page.locator('button', { hasText: /Logout/i });
  234 |     await adminLogoutBtn.click();
  235 |     await expect(page.locator('h1', { hasText: /FleekTech Admin Portal/i })).toBeVisible();
  236 |   });
  237 | });
  238 | 
```