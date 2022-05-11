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

    function insertTitle(pageName: string) {
      let matchPage = pages.filter((page) => page.name === pageName)[0];
      if (matchPage.title == null) {
        console.error('No title added on: ' + matchPage.name );
      } else {
        figma.currentPage = matchPage.node;
        let titleInstance = pageTitleComponent.createInstance();

        let replaceText: TextNode = titleInstance.findOne(
          (n) => n.name === "pageTitle" && n.type === "TEXT"
        );
        replaceText.characters = matchPage.title;

        figma.viewport.scrollAndZoomIntoView([titleInstance]);
      }
    }

    // Setup your components for import into pages

    // Cover component
    let coverComponent: ComponentNode | null = null;

    async function getCoverComponent() {
      const coverComponentKey = "4cddc7f47ff175f1b4aca9e259481da9bf9be610";
      const instance = await figma.importComponentByKeyAsync(coverComponentKey);
      coverComponent = instance;
    }

    // Title component
    let pageTitleComponent: ComponentNode | null = null;

    async function getPageTitleComponent() {
      const pageTitleComponentKey = "f957a4153e459744b5566bd34669465a17b5d0cb";
      const instance = await figma.importComponentByKeyAsync(
        pageTitleComponentKey
      );
      pageTitleComponent = instance;
    }

    // Example of a component to be imported

    let exampleComponent: ComponentNode | null = null;

    async function getExampleComponent() {
      const exampleComponentKey = "4e01ce5d4315cb23da2fe9097e8d3cc25492a9c2";
      const instance = await figma.importComponentByKeyAsync(
        exampleComponentKey
      );
      exampleComponent = instance;
    }

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

      const coverAuthor: SceneNode = coverInstance.findOne(
        (n) => n.name === "userName" && n.type === "TEXT"
      );
      coverAuthor.characters = authorName;

      // Get the current month and year, if you'd like a date stamp on your cover
      let monthIndex: number = new Date().getMonth();
      let yearIndex: number = new Date().getFullYear();
      const month: string = monthIndex.toString(); // 1 for Jan, 2 for Feb
      const year: string = yearIndex.toString(); // 1 for Jan, 2 for Feb
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

      // Insert Example component

      const pageExample = pages.filter((page) => page.name === "🤔 About")[0]; // Choose the page to insert component on
      figma.currentPage = pageExample.node; // Switch to that page

      const exampleInstance = getExampleComponent.createInstance(); // Insert the example component

      exampleInstance.y = 350; // Move it down below the heading 
      var exampleInstanceWidth = 3658; // Define a new width
      var exampleInstanceHeight = 2672; // Define a new height
      exampleInstance.resize(exampleInstanceWidth, exampleInstanceHeight); // Resize the component

      // let newSelection = figma.currentPage.findChildren(n => n.type === "NODE")

      // figma.currentPage.selection = newSelection
      // figma.viewport.scrollAndZoomIntoView(newSelection);
      // figma.currentPage.selection = [];

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
