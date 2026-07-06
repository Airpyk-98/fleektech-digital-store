# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test_all_buttons.spec.ts >> FleekTech High-Stakes Comprehensive Button & Flow Verification >> 3. Test User Authentication, Orders Modal, Saved Items Modal & Logout
- Location: scripts\test_all_buttons.spec.ts:140:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('header span:text("account_circle")').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
      - generic [ref=e37]:
        - generic [ref=e38]: New Arrival
        - heading "iPhone 15 Pro & MacBook M3" [level=1] [ref=e39]
        - paragraph [ref=e40]: Experience the pinnacle of performance with exclusive launch deals up to 15% off.
        - button "Shop Now" [ref=e42]
      - generic [ref=e43]:
        - heading "Browse Categories" [level=2] [ref=e45]
        - generic [ref=e46]:
          - generic [ref=e47] [cursor=pointer]:
            - generic [ref=e49]: grid_view
            - generic [ref=e50]: All
          - generic [ref=e51] [cursor=pointer]:
            - generic [ref=e53]: smartphone
            - generic [ref=e54]: Phones
          - generic [ref=e55] [cursor=pointer]:
            - generic [ref=e57]: laptop
            - generic [ref=e58]: Laptops
          - generic [ref=e59] [cursor=pointer]:
            - generic [ref=e61]: headphones
            - generic [ref=e62]: Audio
          - generic [ref=e63] [cursor=pointer]:
            - generic [ref=e65]: sports_esports
            - generic [ref=e66]: Gaming
          - generic [ref=e67] [cursor=pointer]:
            - generic [ref=e69]: watch
            - generic [ref=e70]: Wearables
          - generic [ref=e71] [cursor=pointer]:
            - generic [ref=e73]: camera
            - generic [ref=e74]: Cameras
      - generic [ref=e75]:
        - generic [ref=e76]:
          - generic [ref=e77]:
            - generic [ref=e78]: bolt
            - heading "Flash Sales" [level=2] [ref=e79]
            - generic [ref=e80]:
              - generic [ref=e81]: "02"
              - generic [ref=e82]: ":"
              - generic [ref=e83]: "35"
              - generic [ref=e84]: ":"
              - generic [ref=e85]: "12"
          - button "See All Deals →" [ref=e86]
        - generic [ref=e87]:
          - generic [ref=e88] [cursor=pointer]:
            - generic [ref=e89]:
              - img "Sony WH-1000XM5 Noise Canceling Headphones" [ref=e90]
              - generic [ref=e91]: "-25%"
              - button "favorite" [ref=e92]:
                - generic [ref=e93]: favorite
            - generic [ref=e94]:
              - generic [ref=e95]:
                - text: Sony
                - heading "Sony WH-1000XM5 Noise Canceling Headphones" [level=3] [ref=e96]
              - generic [ref=e97]:
                - generic [ref=e98]:
                  - generic [ref=e99]: ₦285,000
                  - generic [ref=e100]: ₦380,000
                - button "add_shopping_cart Add to Cart" [ref=e101]:
                  - generic [ref=e102]: add_shopping_cart
                  - text: Add to Cart
          - generic [ref=e103] [cursor=pointer]:
            - generic [ref=e104]:
              - img "Samsung Galaxy S24 Ultra 5G - 512GB" [ref=e105]
              - generic [ref=e106]: "-10%"
              - button "favorite" [ref=e107]:
                - generic [ref=e108]: favorite
            - generic [ref=e109]:
              - generic [ref=e110]:
                - text: Samsung
                - heading "Samsung Galaxy S24 Ultra 5G - 512GB" [level=3] [ref=e111]
              - generic [ref=e112]:
                - generic [ref=e113]:
                  - generic [ref=e114]: ₦1,450,000
                  - generic [ref=e115]: ₦1,610,000
                - button "add_shopping_cart Add to Cart" [ref=e116]:
                  - generic [ref=e117]: add_shopping_cart
                  - text: Add to Cart
          - generic [ref=e118] [cursor=pointer]:
            - generic [ref=e119]:
              - img "Dell XPS 15 9530 Intel Core i9 - 32GB RAM" [ref=e120]
              - generic [ref=e121]: "-15%"
              - button "favorite" [ref=e122]:
                - generic [ref=e123]: favorite
            - generic [ref=e124]:
              - generic [ref=e125]:
                - text: Dell
                - heading "Dell XPS 15 9530 Intel Core i9 - 32GB RAM" [level=3] [ref=e126]
              - generic [ref=e127]:
                - generic [ref=e128]:
                  - generic [ref=e129]: ₦2,100,000
                  - generic [ref=e130]: ₦2,470,000
                - button "add_shopping_cart Add to Cart" [ref=e131]:
                  - generic [ref=e132]: add_shopping_cart
                  - text: Add to Cart
          - generic [ref=e133] [cursor=pointer]:
            - generic [ref=e134]:
              - img "Nintendo Switch OLED Model with White Joy-Con" [ref=e135]
              - generic [ref=e136]: "-20%"
              - button "favorite" [ref=e137]:
                - generic [ref=e138]: favorite
            - generic [ref=e139]:
              - generic [ref=e140]:
                - text: Nintendo
                - heading "Nintendo Switch OLED Model with White Joy-Con" [level=3] [ref=e141]
              - generic [ref=e142]:
                - generic [ref=e143]:
                  - generic [ref=e144]: ₦420,000
                  - generic [ref=e145]: ₦525,000
                - button "add_shopping_cart Add to Cart" [ref=e146]:
                  - generic [ref=e147]: add_shopping_cart
                  - text: Add to Cart
      - generic [ref=e148]:
        - generic [ref=e149]:
          - generic [ref=e150]:
            - navigation [ref=e151]: Home / Categories / All
            - heading "Full Catalog" [level=2] [ref=e152]
          - generic [ref=e153]: 8 Products Found
        - generic [ref=e154]:
          - generic [ref=e155]:
            - generic [ref=e156]: tune
            - generic [ref=e157]: "Filter:"
          - 'button "swap_vert Sort by: Popularity" [ref=e158]':
            - generic [ref=e159]: swap_vert
            - generic [ref=e160]: "Sort by: Popularity"
          - button "All Brands" [ref=e162]
          - button "Apple" [ref=e163]
          - button "Samsung" [ref=e164]
          - button "Google" [ref=e165]
          - button "Xiaomi" [ref=e166]
          - button "Sony" [ref=e167]
          - button "Dell" [ref=e168]
          - button "Nintendo" [ref=e169]
      - generic [ref=e171]:
        - generic [ref=e172] [cursor=pointer]:
          - generic [ref=e173]: "-25%"
          - button "favorite" [ref=e174]:
            - generic [ref=e175]: favorite
          - img "Sony WH-1000XM5 Noise Canceling Headphones" [ref=e177]
          - generic [ref=e178]:
            - generic [ref=e179]:
              - text: Sony
              - heading "Sony WH-1000XM5 Noise Canceling Headphones" [level=3] [ref=e180]
              - generic [ref=e181]:
                - generic [ref=e182]:
                  - generic [ref=e183]: star
                  - generic [ref=e184]: star
                  - generic [ref=e185]: star
                  - generic [ref=e186]: star
                  - generic [ref=e187]: star
                - generic [ref=e188]: (124)
            - generic [ref=e189]:
              - generic [ref=e190]:
                - generic [ref=e191]: ₦285,000
                - generic [ref=e192]: ₦380,000
              - button "shopping_cart" [ref=e193]:
                - generic [ref=e194]: shopping_cart
        - generic [ref=e195] [cursor=pointer]:
          - generic [ref=e196]: "-15%"
          - button "favorite" [ref=e197]:
            - generic [ref=e198]: favorite
          - img "Dell XPS 15 9530 Intel Core i9 - 32GB RAM" [ref=e200]
          - generic [ref=e201]:
            - generic [ref=e202]:
              - text: Dell
              - heading "Dell XPS 15 9530 Intel Core i9 - 32GB RAM" [level=3] [ref=e203]
              - generic [ref=e204]:
                - generic [ref=e205]:
                  - generic [ref=e206]: star
                  - generic [ref=e207]: star
                  - generic [ref=e208]: star
                  - generic [ref=e209]: star
                  - generic [ref=e210]: star
                - generic [ref=e211]: (56)
            - generic [ref=e212]:
              - generic [ref=e213]:
                - generic [ref=e214]: ₦2,100,000
                - generic [ref=e215]: ₦2,470,000
              - button "shopping_cart" [ref=e216]:
                - generic [ref=e217]: shopping_cart
        - generic [ref=e218] [cursor=pointer]:
          - generic [ref=e219]: Best Seller
          - button "favorite" [ref=e220]:
            - generic [ref=e221]: favorite
          - img "iPhone 15 Pro Max 256GB - Blue Titanium" [ref=e223]
          - generic [ref=e224]:
            - generic [ref=e225]:
              - text: Apple
              - heading "iPhone 15 Pro Max 256GB - Blue Titanium" [level=3] [ref=e226]
              - generic [ref=e227]:
                - generic [ref=e228]:
                  - generic [ref=e229]: star
                  - generic [ref=e230]: star
                  - generic [ref=e231]: star
                  - generic [ref=e232]: star
                  - generic [ref=e233]: star
                - generic [ref=e234]: (48)
            - generic [ref=e235]:
              - generic [ref=e236]:
                - generic [ref=e237]: ₦1,850,000
                - generic [ref=e238]: ₦2,000,000
              - button "shopping_cart" [ref=e239]:
                - generic [ref=e240]: shopping_cart
        - generic [ref=e241] [cursor=pointer]:
          - generic [ref=e242]: "-10%"
          - button "favorite" [ref=e243]:
            - generic [ref=e244]: favorite
          - img "Samsung Galaxy S24 Ultra 5G - 512GB" [ref=e246]
          - generic [ref=e247]:
            - generic [ref=e248]:
              - text: Samsung
              - heading "Samsung Galaxy S24 Ultra 5G - 512GB" [level=3] [ref=e249]
              - generic [ref=e250]:
                - generic [ref=e251]:
                  - generic [ref=e252]: star
                  - generic [ref=e253]: star
                  - generic [ref=e254]: star
                  - generic [ref=e255]: star
                  - generic [ref=e256]: star_half
                - generic [ref=e257]: (89)
            - generic [ref=e258]:
              - generic [ref=e259]:
                - generic [ref=e260]: ₦1,450,000
                - generic [ref=e261]: ₦1,610,000
              - button "shopping_cart" [ref=e262]:
                - generic [ref=e263]: shopping_cart
        - generic [ref=e264] [cursor=pointer]:
          - generic [ref=e265]: "-20%"
          - button "favorite" [ref=e266]:
            - generic [ref=e267]: favorite
          - img "Nintendo Switch OLED Model with White Joy-Con" [ref=e269]
          - generic [ref=e270]:
            - generic [ref=e271]:
              - text: Nintendo
              - heading "Nintendo Switch OLED Model with White Joy-Con" [level=3] [ref=e272]
              - generic [ref=e273]:
                - generic [ref=e274]:
                  - generic [ref=e275]: star
                  - generic [ref=e276]: star
                  - generic [ref=e277]: star
                  - generic [ref=e278]: star
                  - generic [ref=e279]: star_half
                - generic [ref=e280]: (310)
            - generic [ref=e281]:
              - generic [ref=e282]:
                - generic [ref=e283]: ₦420,000
                - generic [ref=e284]: ₦525,000
              - button "shopping_cart" [ref=e285]:
                - generic [ref=e286]: shopping_cart
        - generic [ref=e287] [cursor=pointer]:
          - button "favorite" [ref=e288]:
            - generic [ref=e289]: favorite
          - img "Galaxy S24 Ultra 512GB - Titanium Black" [ref=e291]
          - generic [ref=e292]:
            - generic [ref=e293]:
              - text: Samsung
              - heading "Galaxy S24 Ultra 512GB - Titanium Black" [level=3] [ref=e294]
              - generic [ref=e295]:
                - generic [ref=e296]:
                  - generic [ref=e297]: star
                  - generic [ref=e298]: star
                  - generic [ref=e299]: star
                  - generic [ref=e300]: star
                  - generic [ref=e301]: star_half
                - generic [ref=e302]: (32)
            - generic [ref=e303]:
              - generic [ref=e304]:
                - generic [ref=e305]: ₦1,620,000
                - generic [ref=e306]: ₦1,750,000
              - button "shopping_cart" [ref=e307]:
                - generic [ref=e308]: shopping_cart
        - generic [ref=e309] [cursor=pointer]:
          - button "favorite" [ref=e310]:
            - generic [ref=e311]: favorite
          - img "Xiaomi 14 Ultra 5G 16GB/512GB - White" [ref=e313]
          - generic [ref=e314]:
            - generic [ref=e315]:
              - text: Xiaomi
              - heading "Xiaomi 14 Ultra 5G 16GB/512GB - White" [level=3] [ref=e316]
              - generic [ref=e317]:
                - generic [ref=e318]:
                  - generic [ref=e319]: star
                  - generic [ref=e320]: star
                  - generic [ref=e321]: star
                  - generic [ref=e322]: star
                  - generic [ref=e323]: star_half
                - generic [ref=e324]: (24)
            - generic [ref=e325]:
              - generic [ref=e326]:
                - generic [ref=e327]: ₦1,380,000
                - generic [ref=e328]: ₦1,500,000
              - button "shopping_cart" [ref=e329]:
                - generic [ref=e330]: shopping_cart
        - generic [ref=e331] [cursor=pointer]:
          - generic [ref=e332]: Best Seller
          - button "favorite" [ref=e333]:
            - generic [ref=e334]: favorite
          - img "Pixel 8 Pro 12GB RAM 128GB - Porcelain" [ref=e336]
          - generic [ref=e337]:
            - generic [ref=e338]:
              - text: Google
              - heading "Pixel 8 Pro 12GB RAM 128GB - Porcelain" [level=3] [ref=e339]
              - generic [ref=e340]:
                - generic [ref=e341]:
                  - generic [ref=e342]: star
                  - generic [ref=e343]: star
                  - generic [ref=e344]: star
                  - generic [ref=e345]: star
                  - generic [ref=e346]: star_half
                - generic [ref=e347]: (15)
            - generic [ref=e348]:
              - generic [ref=e349]:
                - generic [ref=e350]: ₦1,150,000
                - generic [ref=e351]: ₦1,300,000
              - button "shopping_cart" [ref=e352]:
                - generic [ref=e353]: shopping_cart
      - generic [ref=e354]:
        - heading "Top Brands" [level=2] [ref=e356]
        - generic [ref=e357]:
          - img "Apple" [ref=e359] [cursor=pointer]
          - img "Samsung" [ref=e361] [cursor=pointer]
          - img "Dell" [ref=e363] [cursor=pointer]
          - img "HP" [ref=e365] [cursor=pointer]
    - contentinfo [ref=e366]:
      - generic [ref=e367]:
        - generic [ref=e368]:
          - img "FLEEKTECH" [ref=e369]
          - paragraph [ref=e370]: Tech-forward electronics designed for modern performance. Powered by AI processors, aerospace titanium, and studio audio fidelity.
        - generic [ref=e371]:
          - heading "Catalog" [level=4] [ref=e372]
          - list [ref=e373]:
            - listitem [ref=e374]:
              - link "Phones & Accessories" [ref=e375] [cursor=pointer]:
                - /url: /
            - listitem [ref=e376]:
              - link "MacBooks & Laptops" [ref=e377] [cursor=pointer]:
                - /url: /
            - listitem [ref=e378]:
              - link "Studio Audio & ANC" [ref=e379] [cursor=pointer]:
                - /url: /
            - listitem [ref=e380]:
              - link "OLED Gaming Consoles" [ref=e381] [cursor=pointer]:
                - /url: /
        - generic [ref=e382]:
          - heading "Customer Care" [level=4] [ref=e383]
          - list [ref=e384]:
            - listitem [ref=e385]:
              - link "Order Status & Tracking" [ref=e386] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e387]:
              - link "Warranty & Titanium Care" [ref=e388] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e389]:
              - link "Returns & Exchanges" [ref=e390] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e391]:
              - link "Contact Support" [ref=e392] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e393]:
          - heading "About Us" [level=4] [ref=e394]
          - list [ref=e395]:
            - listitem [ref=e396]:
              - link "Our Story & Brand" [ref=e397] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e398]:
              - link "Investor Relations" [ref=e399] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e400]:
              - link "Careers at FleekTech" [ref=e401] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e402]:
              - link "Corporate Responsibility" [ref=e403] [cursor=pointer]:
                - /url: "#"
      - generic [ref=e404]:
        - paragraph [ref=e405]: © 2026 FLEEKTECH DIGITAL STORE. All rights reserved. Built with Stitch UI Guide.
        - generic [ref=e406]:
          - link "Privacy Policy" [ref=e407] [cursor=pointer]:
            - /url: "#"
          - link "Terms of Service" [ref=e408] [cursor=pointer]:
            - /url: "#"
          - link "Security" [ref=e409] [cursor=pointer]:
            - /url: "#"
  - button "Open Next.js Dev Tools" [ref=e415] [cursor=pointer]:
    - img [ref=e416]
  - alert [ref=e419]
```

# Test source

```ts
  49  |     if (await homeNavBtn.isVisible()) {
  50  |       await homeNavBtn.click();
  51  |       await page.waitForTimeout(500);
  52  |     }
  53  | 
  54  |     // Test Product Card Click & Modal Buttons
  55  |     console.log('Testing Product Card and Modal buttons...');
  56  |     const firstProductCard = page.locator('main section').filter({ hasText: 'Featured & Trending' }).locator('div.group.relative').first();
  57  |     await firstProductCard.waitFor({ state: 'visible', timeout: 10000 });
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
> 149 |       await page.locator('header span:text("account_circle")').first().click();
      |                                                                        ^ Error: locator.click: Test timeout of 60000ms exceeded.
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
  197 |     await page.locator('button[type="submit"]', { hasText: /LOG IN AS EXECUTIVE ADMIN/i }).click();
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