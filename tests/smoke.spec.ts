import { expect, test } from "@playwright/test";

const generalRoutes = [
  ["/play/", "Play Worm Capitalist Online"],
  ["/walkthrough/", "Worm Capitalist Demo Walkthrough"],
  ["/profit-calculator/", "Worm Capitalist Profit Calculator"],
  ["/upgrade-checklist/", "Worm Capitalist Upgrade Checklist"],
  ["/upgrades/", "Worm Capitalist Upgrades Guide"],
  ["/skill-tree/", "Worm Capitalist Skill Tree Guide"],
  ["/rebirth/", "Worm Capitalist Rebirth Guide"],
  ["/automation/", "Worm Capitalist Automation Guide"],
  ["/controls/", "Worm Capitalist Controls"],
  ["/bugs-fixes/", "Worm Capitalist Bugs and Fixes"],
  ["/steam-demo/", "Worm Capitalist Steam Demo"],
  ["/updates/", "Worm Capitalist Updates and Sources"],
  ["/about/", "About Worm Capitalist Guide"],
  ["/privacy-policy/", "Privacy Policy"],
  ["/terms/", "Terms of Use"],
] as const;

test("home, search, images, and responsive width work", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Worm Capitalist" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open calculator/i })).toBeVisible();

  await page.getByRole("button", { name: "Search the guide" }).click();
  await page.getByPlaceholder("Search upgrades, rebirth, automation...").fill("rebirth");
  await expect(page.getByRole("link", { name: /Worm Capitalist Rebirth Guide/i })).toBeVisible();
  await page.keyboard.press("Escape");

  const images = page.locator("main img");
  await expect(images).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded();
    await expect.poll(async () => images.nth(index).evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `.review/home-${testInfo.project.name}-viewport.png`, fullPage: true });
});

test("calculator updates and checklist saves progress", async ({ page }, testInfo) => {
  await page.goto("/profit-calculator/");
  await expect(page.getByRole("heading", { name: "Profit per minute" })).toBeVisible();
  await page.getByLabel("Worms").evaluate((input: HTMLInputElement) => {
    input.value = "10";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await expect(page.getByText(/Next worm adds about/)).toBeVisible();

  await page.goto("/upgrade-checklist/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await expect(page.getByRole("heading", { name: "0 of 5 checked" })).toBeVisible();
  await page.getByRole("button", { name: "Mark complete: Start the colony" }).click();
  await expect(page.getByRole("heading", { name: "1 of 5 checked" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "1 of 5 checked" })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `.review/checklist-${testInfo.project.name}-viewport.png`, fullPage: true });
});

test("all indexed guide routes render", async ({ page }) => {
  for (const [route, heading] of generalRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
  }
});

test("sitemap, robots, schema, and canonicals are present", async ({ page, request }, testInfo) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const sitemapText = await sitemap.text();
  expect((sitemapText.match(/<url>/g) ?? []).length).toBe(16);
  expect(sitemapText).toContain("/profit-calculator/");

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("https://wormcapitalist.robloxwikihub.com/sitemap.xml");

  await page.goto("/upgrades/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://wormcapitalist.robloxwikihub.com/upgrades/");
  const schemas = page.locator('script[type="application/ld+json"]');
  expect(await schemas.count()).toBeGreaterThanOrEqual(3);
  const schema = (await schemas.allTextContents()).join("\n");
  expect(schema).toContain("HowTo");
  expect(schema).toContain("BreadcrumbList");
  await page.screenshot({ path: `.review/guide-${testInfo.project.name}-viewport.png` });
});

test("official browser game frame is connected", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "The external game frame only needs one browser check.");
  await page.goto("/play/");
  const iframe = page.getByTitle("Play Worm Capitalist");
  await iframe.scrollIntoViewIfNeeded();
  await expect(iframe).toBeVisible();
  await expect(iframe).toHaveAttribute("src", /html-classic\.itch\.zone/);
});
