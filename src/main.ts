import {
  once,
  setRelaunchButton,
  showUI,
} from "@create-figma-plugin/utilities";

import { CreatePageHandler } from "./types";

export default function () {
  setRelaunchButton(figma.currentPage, "Design Toolkit", {
    description: "Design Toolkit",
  });

  once<CreatePageHandler>("CREATE_PAGES", function () {
    // This is the list of pages to create in your document. The `title` option is

    const pages = [
      { name: "Cover", node: "PAGE", title: "Cover" },
      { name: "🤔 About", node: "PAGE", title: "About" },
      { name: "💻 Prototype", node: "PAGE", title: "Prototype" },
      {
        name: "✅ Ready for dev",
        node: "PAGE",
        title: "Ready for dev",
        description: "Designs that are now finalised and ready to be built",
      },
      { name: "--------", node: "PAGE" },
      { name: "✏️ Copy review", node: "PAGE", title: "Copy review" },
      { name: "[Date] Design review", node: "PAGE", title: "Design review" },
      {
        name: "[Date] Feature/component",
        node: "PAGE",
        title: "[Date] Feature/component",
      },
      { name: "--------", node: "PAGE" },
      { name: "💡 Work in progress", node: "PAGE", title: "Work in progress" },
      { name: "--------", node: "PAGE" },
      { name: "🎨 Design research", node: "PAGE", title: "Design research" },
      { name: "👩🏽‍💻 User research", node: "PAGE", title: "User research" },
      { name: "Workshop", node: "PAGE", title: "Workshop" },
      { name: "Flows", node: "PAGE", title: "Flows" },
    ];

    // Show a notification

    figma.notify("Building template", { timeout: Infinity });

    // Load any custom fonts required for editing text layers. Figma developer console will advise you if you need to include any missing fonts.

    async function loadFont() {
      figma.loadFontAsync({ family: "Work Sans", style: "Bold" });
      figma.loadFontAsync({ family: "Open Sans", style: "Regular" });
      figma.loadFontAsync({ family: "Open Sans", style: "SemiBold" });
    }

    // This forEach loop goes through the list of pages and creates each one using the 'name' values.

    figma.currentPage.name = pages[0].name;
    pages[0].node = figma.currentPage;

    pages.slice(1).forEach((page) => {
      const newPage = figma.createPage();
      newPage.name = page.name;
      page.node = newPage;
    });

    console.log("%cPages built", "color:green");

    // Setup your components for import into pages

    // Cover component
    let coverComponent: ComponentNode | null = null;

    async function getCoverComponent() {
      const coverComponentKey = "4cddc7f47ff175f1b4aca9e259481da9bf9be610";
      const instance = await figma.importComponentByKeyAsync(coverComponentKey);
      coverComponent = instance;
    }
    console.log("%cCover component", "color:green");

    // Title component
    let pageTitleComponent: ComponentNode | null = null;

    async function getPageTitleComponent() {
      const pageTitleComponentKey = "e5cd49ccd0e259b096bbd4f2ef83e935d742f42e";
      const instance = await figma.importComponentByKeyAsync(
        pageTitleComponentKey
      );
      pageTitleComponent = instance;
    }
    console.log("%cTitle component", "color:green");

    // Example of a component to be imported

    let exampleComponent: ComponentNode | null = null;

    async function getExampleComponent() {
      const exampleComponentKey = "4e01ce5d4315cb23da2fe9097e8d3cc25492a9c2";
      const instance = await figma.importComponentByKeyAsync(
        exampleComponentKey
      );
      exampleComponent = instance;
    }
    console.log("%cExample component", "color:green");

    Promise.all([
      getCoverComponent(),
      getPageTitleComponent(),
      getExampleComponent(),
      loadFont(),
    ]).then(() => {

      // Switch to page called "Cover"
      const coverPage = pages.filter((page) => page.name === "Cover")[0];

      // Insert Cover component instance
      figma.currentPage = coverPage.node;
      const coverInstance = coverComponent.createInstance();

      // Find the text layer called "Title" and replaces it with the value of titleText.
      const titleText = "Title";

      const coverTitle: TextNode = coverInstance.findOne(
        (n) => n.name === "title" && n.type === "TEXT"
      );
      coverTitle.characters = titleText;

      // Find the text layer called "description" and replaces it with the value of descriptionText.
      const descriptionText = "Enter a description for this file.";

      const coverDescription: TextNode = coverInstance.findOne(
        (n) => n.name === "description" && n.type === "TEXT"
      );
      coverDescription.characters = descriptionText;

      // Find the text layer called 'userName' and replaces it with the value of authorName.
      const authorName = figma.currentUser.name;

      const coverAuthor: TextNode = coverInstance.findOne(
        (n) => n.name === "userName" && n.type === "TEXT"
      );
      coverAuthor.characters = authorName;

      // Get the current month and year, if you'd like a date stamp on your cover
      let monthIndex: number = new Date().getMonth();
      let yearIndex: number = new Date().getFullYear();
      const month = monthIndex.toString(); // 1 for Jan, 2 for Feb
      const year = yearIndex.toString(); // 1 for Jan, 2 for Feb
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Find the text layer called 'dateCreated' and replaces it with the month and year.
      const coverDate: TextNode = coverInstance.findOne(
        (n) => n.name === "dateCreated" && n.type === "TEXT"
      );
      coverDate.characters = monthNames[month] + " " + year;

      // Change the background colour of the cover page, perfect for making a seamless cover image in Figma.
      figma.currentPage.backgrounds = [
        {
          type: "SOLID",
          color: {
            r: 1,
            g: 1,
            b: 1,
          },
        },
      ];

      // Set the page to zoom to fit the cover instance
      figma.viewport.scrollAndZoomIntoView([coverInstance]);

      console.log("%cCover inserted", "color:green");     
      
      // Insert About page title
      const aboutPage = pages.filter((page) => page.name === "🤔 About")[0];
      figma.currentPage = aboutPage.node;

      const titleAboutInstance = pageTitleComponent.createInstance();

      const pageAboutTitleText = readyPage.title;

      const pageAboutTitle: TextNode = titleAboutInstance.findOne(
        (n) => n.name === "pageTitle" && n.type === "TEXT"
      );
      pageAboutTitle.characters = pageAboutTitleText;

      figma.viewport.scrollAndZoomIntoView([titleAboutInstance]);

      // Insert Prototype title
      const prototypePage = pages.filter(
        (page) => page.name === "💻 Prototype"
      )[0];
      figma.currentPage = prototypePage.node;
      const prototypeInstance = pageTitleComponent.createInstance();

      const prototypeTitleText = prototypePage.title;

      const prototypeTitle: TextNode = prototypeInstance.findOne(
        (n) => n.name === "pageTitle" && n.type === "TEXT"
      );
      prototypeTitle.characters = prototypeTitleText;

      figma.viewport.scrollAndZoomIntoView([prototypeInstance]);

      // Insert Ready for Dev title
      const readyPage = pages.filter(
        (page) => page.name === "✅ Ready for dev"
      )[0];
      figma.currentPage = readyPage.node;
      const titleRFDInstance = pageTitleComponent.createInstance();

      const pageRFDTitleText = readyPage.title;

      const pageRFDTitle: TextNode = titleRFDInstance.findOne(
        (n) => n.name === "pageTitle" && n.type === "TEXT"
      );
      pageRFDTitle.characters = pageRFDTitleText;

      figma.viewport.scrollAndZoomIntoView([titleInstance]);

      // Insert Copy review title
      const copyReviewPage = pages.filter(
        (page) => page.name === "✏️ Copy review"
      )[0];
      figma.currentPage = copyReviewPage.node;
      const titleCRInstance = pageTitleComponent.createInstance();

      const pageCRTitleText = copyReviewPage.title;

      const pageCRTitle: TextNode = titleCRInstance.findOne(
        (n) => n.name === "pageTitle" && n.type === "TEXT"
      );
      pageCRTitle.characters = pageCRTitleText;

      figma.viewport.scrollAndZoomIntoView([titleCRInstance]);

      // Insert Design review title
      const designReviewPage = pages.filter(
        (page) => page.name === "[Date] Design review"
      )[0];
      figma.currentPage = designReviewPage.node;
      const titleDRInstance = pageTitleComponent.createInstance();

      const pageDRTitleText = designReviewPage.title;

      const pageRRTitle: TextNode = titleDRInstance.findOne(
        (n) => n.name === "pageTitle" && n.type === "TEXT"
      );
      pageRRTitle.characters = pageDRTitleText;

      figma.viewport.scrollAndZoomIntoView([titleDRInstance]);

      // Insert [Date] Feature/component title
      const featureComponentPage = pages.filter(
        (page) => page.name === "[Date] Feature/component"
      )[0];
      figma.currentPage = featureComponentPage.node;
      const titleFeatureComponentInstance = pageTitleComponent.createInstance();

      const fcTitleText = featureComponentPage.title;

      const fcTitle: TextNode = titleFeatureComponentInstance.findOne(
        (n) => n.name === "pageTitle" && n.type === "TEXT"
      );
      fcTitle.characters = fcTitleText;

      figma.viewport.scrollAndZoomIntoView([titleFeatureComponentInstance]);

      // Insert Work in progress title

      const pageWIPName = pages.filter(
        (page) => page.name === "💡 Work in progress"
      )[0];
      figma.currentPage = pageWIPName.node;
      const titleWIPInstance = pageTitleComponent.createInstance();

      const wipTitleText = pageWIPName.title;

      const wipTitle: TextNode = titleWIPInstance.findOne(
        (n) => n.name === "pageTitle" && n.type === "TEXT"
      );
      wipTitle.characters = wipTitleText;

      figma.viewport.scrollAndZoomIntoView([titleWIPInstance]);

      // Insert Design research title

      const pageDRName = pages.filter(
        (page) => page.name === "🎨 Design research"
      )[0];
      figma.currentPage = pageDRName.node;
      const titleDesignResearchInstance = pageTitleComponent.createInstance();

      const designResearchTitleText = pageDRName.title;

      const designResearchTitle: TextNode = titleDesignResearchInstance.findOne(
        (n) => n.name === "pageTitle" && n.type === "TEXT"
      );
      designResearchTitle.characters = designResearchTitleText;

      figma.viewport.scrollAndZoomIntoView([titleDesignResearchInstance]);

      // Insert User research title

      const pageURName = pages.filter(
        (page) => page.name === "👩🏽‍💻 User research"
      )[0];
      figma.currentPage = pageURName.node;
      const titleUserResearchInstance = pageTitleComponent.createInstance();

      const researchTitleText = pageURName.title;

      const userResearchTitle: TextNode = titleUserResearchInstance.findOne(
        (n) => n.name === "pageTitle" && n.type === "TEXT"
      );
      userResearchTitle.characters = researchTitleText;

      figma.viewport.scrollAndZoomIntoView([titleUserResearchInstance]);

      // Insert Workshop title

      const pageWName = pages.filter((page) => page.name === "Workshop")[0];
      figma.currentPage = pageWName.node;
      const titleWorkshopInstance = pageTitleComponent.createInstance();

      const workshopTitleText = pageWName.title;

      const workshopTitle: TextNode = titleWorkshopInstance.findOne(
        (n) => n.name === "pageTitle" && n.type === "TEXT"
      );
      workshopTitle.characters = workshopTitleText;

      figma.viewport.scrollAndZoomIntoView([titleWorkshopInstance]);

      // Insert Journey Flow components

      const pageJFName = pages.filter((page) => page.name === "Flows")[0];
      figma.currentPage = pageJFName.node;

      var newSelection = [];

      const titleFlowInstance = pageTitleComponent.createInstance();
      newSelection.push(titleFlowInstance);
      const exampleComponentInstance = getExampleComponent.createInstance();
      newSelection.push(exampleComponentInstance);

      exampleComponentInstance.y = 350;
      var modifyWidth = 3000;
      var modifyHeight = 2000;
      exampleComponentInstance.resize(modifyWidth, modifyHeight);

      const flowTitleText = pageJFName.title;

      const flowTitle: TextNode = titleFlowInstance.findOne(
        (n) => n.name === "pageTitle" && n.type === "TEXT"
      );
      flowTitle.characters = flowTitleText;

      figma.currentPage.selection = newSelection;
      figma.viewport.scrollAndZoomIntoView(newSelection);
      figma.currentPage.selection = [];

      // Go back to the Cover page
      figma.currentPage = coverPage.node;

      figma.closePlugin("RED Template applied");
    });
  });
  showUI({
    width: 320,
    height: 320,
  });
}
