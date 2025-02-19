describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click("journal-entry");
    expect(page.url()).toContain("/#entry1");
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1”
    const firstTitle = await page.$eval("header > h1", (entry) => {
      return entry.innerHTML;
    });
    expect(firstTitle).toBe("Entry 1");
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
     const entryPage = await page.$("entry-page");
     const entry = await (await entryPage.getProperty("entry")).jsonValue();

     expect(entry.title).toBe("You like jazz?");
     expect(entry.date).toBe("4/25/2021");
     expect(entry.content).toBe(
       "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
     expect(entry.image.src).toBe("https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455");
     expect(entry.image.alt).toBe("bee with sunglasses");
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const bodyClass = await page.$eval("body", (body) => {
      return body.className;
    });
    expect(bodyClass).toBe("single-entry");
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click("header > img");
    expect(page.url()).toBe("http://127.0.0.1:5500/#settings");
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const settingsTitle = await page.$eval("header > h1", (header) => {
      return header.innerHTML;
    });
    expect(settingsTitle).toBe("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const classSettings = await page.$eval("body", (body) => {
      return body.className;
    });
    expect(classSettings).toBe("settings");
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toContain("/#entry1");
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test 11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    expect(page.url()).toBe("http://127.0.0.1:5500/");
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test 12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
    const journalEntriesTitle = await page.$eval("header > h1", (heading) => {
      return heading.innerHTML;
    });
    expect(journalEntriesTitle).toBe("Journal Entries");
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test 13: On the home page the <body> element should not have any class attribute', async() => {
    const bodyClassLength = await page.$eval("body", (bodyElement) => {
      return bodyElement.classList.length;
    });
    expect(bodyClassLength).toBe(0);
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test 14: Verify the url is correct when clicking on the second entry', async() => {
    await page.click("journal-entry:nth-of-type(2)");
    expect(page.url()).toContain("/#entry2");
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test 15: Verify the title is current when clicking on the second entry', async() => {
    const secondTitle = await page.$eval("header > h1", (secondEntry) => {
      return secondEntry.innerHTML;
    });
    expect(secondTitle).toBe("Entry 2");
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test 16: Verify the entry page contents is correct when clicking on the second entry', async() => {
    const entryPage = await page.$("entry-page");
    const secondEntry = await (await entryPage.getProperty("entry")).jsonValue();

    expect(secondEntry.title).toBe("Run, Forrest! Run!");
    expect(secondEntry.date).toBe("4/26/2021");
    expect(secondEntry.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
    expect(secondEntry.image.src).toBe("https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg");
    expect(secondEntry.image.alt).toBe("forrest running");
  }, 10000);

  // create your own test 17
  it('Test 17: Verify the url is correct when clicking on the tenth entry', async () => {
    await page.goBack();
    await page.click("journal-entry:nth-of-type(10)");
    expect(page.url()).toContain("/#entry10");
  }, 10000);

  // create your own test 18
  it('Test 18: Verify the title is current when clicking on the tenth entry', async () => {
    const tenthText = await page.$eval("header > h1", (currEntry) => {
      return currEntry.innerHTML;
    });
    expect(tenthText).toBe('Entry 10');
  });

  // create your own test 19
  it('Test 19: Verify the entry page contents are correct when clicking on the tenth entry', async () => {
    const tenthEntryPage = await page.$("entry-page");
    const tenthEntry = await (await tenthEntryPage.getProperty("entry")).jsonValue();

    expect(tenthEntry.title).toBe("No, I am your father");
    expect(tenthEntry.date).toBe("5/4/2021");
    expect(tenthEntry.content).toBe("A long time ago, in a galaxy far, far away... It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the Death Star, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....");
    expect(tenthEntry.image.src).toBe("https://starwarsblog.starwars.com/wp-content/uploads/2021/04/star-wars-may-the-4th-2021-TALL-3973202.jpg");
    expect(tenthEntry.image.alt).toBe("may the fourth be with you");
    expect(tenthEntry.audio).toBe("https://drive.google.com/uc?export=download&id=1luYh909US7ZBFe6uo440Vv_LNnRdnErT")
  }, 10000);

  // create your own test 20
  it('Test 20: Verify the url is correct when clicking on the tenth entry', async () => {
    await page.goBack();
    await page.goForward();
    expect(page.url()).toBe("http://127.0.0.1:5500/#entry10")
  });
  
});
