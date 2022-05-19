import {
  once,
  setRelaunchButton,
  showUI,
} from "@create-figma-plugin/utilities";

import { CreatePageHandler } from "./types";

export default async function () {
  setRelaunchButton(figma.currentPage, "designToolkit", {
    description: "Useful tools and links",
  });

  once<CreatePageHandler>("CREATE_PAGES", function () {
    // This is the list of pages to create in your document. The `title` option is

    const pages = [
      { name: "Cover", node: "PAGE", title: "Cover" },
      {
        name: "🤔 About",
        node: "PAGE",
        title: "About",
        description: "Project overview",
      },
      {
        name: "💻 Prototype",
        node: "PAGE",
        title: "Prototype",
        description: "Interactive prototype",
      },
      {
        name: "✅ Ready for dev",
        node: "PAGE",
        title: "Ready for dev",
        description: "Approved designs, ready for development",
      },
      { name: "--------", node: "PAGE" },
      {
        name: "✏️ Copy review",
        node: "PAGE",
        title: "Copy review",
        description: "Content for review and sign off",
      },
      {
        name: "[Date] Design review",
        node: "PAGE",
        title: "Design review",
        description: "[Date]",
      },
      {
        name: "[Date] Feature/component",
        node: "PAGE",
        title: "Feature/component",
        description: "[Date]",
      },
      { name: "--------", node: "PAGE" },
      {
        name: "💡 Work in progress",
        node: "PAGE",
        title: "Work in progress",
        description:
          "Explorations and work in progress, not ready for development",
      },
      { name: "--------", node: "PAGE" },
      {
        name: "🎨 Design research",
        node: "PAGE",
        title: "Design research",
        description:
          "Collected research artefacts and data from existing resources",
      },
      {
        name: "👩🏽‍💻 User research",
        node: "PAGE",
        title: "User research",
        description: "Generative field research",
      },
      {
        name: "Workshop",
        node: "PAGE",
        title: "Workshop",
        description: "Artefacts for workshop activity",
      },
      {
        name: "Flows",
        node: "PAGE",
        title: "Flows",
        description: "Journey flows and logic",
      },
    ];

    // Show a notification

    figma.notify("Building template", { timeout: Infinity });

    // Load any custom fonts required for editing text layers. Figma developer console will advise you if you need to include any missing fonts.

    async function loadFont() {
      figma.loadFontAsync({ family: "Work Sans", style: "Bold" });
      figma.loadFontAsync({ family: "Open Sans", style: "Regular" });
      figma.loadFontAsync({ family: "Open Sans", style: "SemiBold" });
    }

    function insertTitle(pageName: string) {
      let matchPage = pages.filter((page) => page.name === pageName)[0];
      if (matchPage.title == null) {
        console.error("No title added on: " + matchPage.name);
      } else {
        figma.currentPage = matchPage.node;
        let titleInstance = pageTitleComponent.createInstance();

        let replaceTitle: TextNode = titleInstance.findOne(
          (n) => n.name === "pageTitle" && n.type === "TEXT"
        );
        replaceTitle.characters = matchPage.title;

        let replaceDescription: TextNode = titleInstance.findOne(
          (n) => n.name === "pageDescription" && n.type === "TEXT"
        );
        replaceDescription.characters = matchPage.description;

        figma.viewport.scrollAndZoomIntoView([titleInstance]);
      }
    }

    // Setup your components for import into pages

    // Cover component
    let coverComponent: ComponentNode | null = null;

    async function getCoverComponent() {
      const coverComponentKey = "INSERT_COVER_KEY_HERE"; // Replace this with the Key for your cover component.
      const instance = await figma.importComponentByKeyAsync(coverComponentKey);
      coverComponent = instance;
    }

    // Title component
    let pageTitleComponent: ComponentNode | null = null;

    async function getPageTitleComponent() {
      const pageTitleComponentKey = "INSERT_TITLE_KEY_HERE"; // Replace this with the Key for your title component.
      const instance = await figma.importComponentByKeyAsync(
        pageTitleComponentKey
      );
      pageTitleComponent = instance;
    }

    // Example of a component to be imported

    let exampleComponent: ComponentNode | null = null;

    async function getExampleComponent() {
      const exampleComponentKey = "INSERT_EXAMPLE_KEY_HERE"; // This is an example component, use this block as a reference when for importing additional components
      const instance = await figma.importComponentByKeyAsync(
        exampleComponentKey
      );
      exampleComponent = instance;
    }

    // The following section is contained within a Promise, which means it only runs when the above components and fonts are available.

    Promise.all([
      getCoverComponent(),
      getPageTitleComponent(),
      getExampleComponent(),
      loadFont(),
    ]).then(() => {
      console.log("%cFonts and components loaded", "color:green");

      // This forEach loop goes through the list of pages and creates each one using the 'name' values.

      figma.currentPage.name = pages[0].name;
      pages[0].node = figma.currentPage;

      pages.slice(1).forEach((page) => {
        const newPage = figma.createPage();
        newPage.name = page.name;
        page.node = newPage;
        insertTitle(page.name); // Inserts the heading component from library if there is a "title" value in your pages array.
      });

      console.log("%cPages built", "color:green");

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
      const month: number = monthIndex; // 1 for Jan, 2 for Feb
      const year: number = yearIndex; // 1 for Jan, 2 for Feb
      const monthNames: Array<string> = [
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
      // Colours must be converted to RGB format.

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

      // Insert Example component

      const pageExample = pages.filter((page) => page.name === "🤔 About")[0]; // Choose the page to insert component on
      figma.currentPage = pageExample.node; // Switch to that page

      const exampleInstance = exampleComponent.createInstance(); // Insert the example component

      exampleInstance.y = 500; // Move it down below the heading
      var exampleInstanceWidth = 3000; // Define a new width
      var exampleInstanceHeight = 2000; // Define a new height
      exampleInstance.resize(exampleInstanceWidth, exampleInstanceHeight); // Resize the component

      let newSelection = figma.currentPage.findChildren(
        (n) => n.type === "INSTANCE"
      );

      figma.currentPage.selection = newSelection;
      figma.viewport.scrollAndZoomIntoView(newSelection);
      figma.currentPage.selection = [];

      // Go back to the Cover page
      figma.currentPage = figma.root.children[0];
      figma.closePlugin("Design Toolkit template applied");
    });
  });
  showUI({
    width: 320,
    height: 320,
  });
}
