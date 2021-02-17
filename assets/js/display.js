class Display {
  constructor(elements, $) {
    this.elements = elements;
    //JQuery
    this.$ = $;
    this.tabColorIndex = 0;
    this.tabColors = [
      "#2de11d",
      "#4848e8",
      "#e84d4d",
      "Orange",
      "Violet",
      "#820ee8",
      "#8e7fc7",
      "#ff008b",
      "#4dc6e8",
      "#17abf5",
      "#4c69bd",
      "#e251dc",
      "#bbb70e",
    ];
  } // End constructor

  //Method
  displayNone(element) {
    this.$(element).slideUp("slow");
  } // End displayNone(element)

  //Method
  displayBlock(element) {
    this.$(element).slideDown("slow");
  } // End displayBlock(element)

  //Method
  clearStoreDisplay() {
    this.elements.storeList.innerHTML = "";
  } // End clearFileCabDisplay()

  //Method
  clearItemDisplay() {
    this.elements.itemList.innerHTML = "";
  } // End clearPrimaryDisplay()
  //Method
  showStoreForm() {
    this.displayNone(this.elements.itemHeading);
    this.displayNone(this.elements.itemForm);
    this.displayBlock(this.elements.storeForm);
  }
  hideStoreForm() {
    this.displayNone(this.elements.storeForm);
  }
  //Method
  showItemForm() {
    this.displayBlock(this.elements.itemForm);
  }
  paintStores(mappedArray) {
    // this.displayBlock(this.elements.catHeading);
    this.displayBlock(this.elements.storeHeading);
    // this.displayNone(catList);
    this.displayNone(this.elements.storeList);
    // this.displayNone(bookmarkList);
    this.displayNone(this.elements.itemList);
    // this.clearCategoryDisplay();
    this.clearStoreDisplay();
    // this.clearBookmarkDisplay();
    this.clearItemDisplay();
    // this.displayNone(this.elements.catHeading);
    this.displayNone(this.elements.storeHeading);
    // this.displayNone(this.elements.bookmarkHeading);
    this.displayNone(this.elements.itemHeading);
    // this.displayBlock(this.elements.catHeading);
    this.displayBlock(this.elements.storeHeading);
    // make variable for html
    let html = "";

    mappedArray.forEach((element, index) => {
      html += `<li data-index="${index}" class="store">${element}</li>`;
    });
    this.elements.storeList.innerHTML = html;

    this.displayBlock(this.elements.storeList);
    // color tabs
    const tabList = document.getElementsByClassName("store");
    this.colorSetOfTabs(tabList);
  }

  paintItems(itemsArray) {
    this.clearItemDisplay();
    this.displayNone(this.elements.itemHeading);
    this.displayBlock(this.elements.itemHeading);
    this.displayNone(this.elements.itemkList);
    this.displayNone(this.elements.itemForm);
    this.displayNone(this.elements.storeForm);
    //build bookmark div

    // bookmarkArray.forEach((bm, index) => {
    //   // createNewBookMarkDiv(bm.name, bm.address);
    //   this.createNewBookMarkDiv(bm.name, bm.url, index);
    //   //create a new div for each bookmark
    // });
    console.log(itemsArray);
    this.elements.itemList.innerHTML = "<h1>item</h1>";
    this.displayBlock(this.elements.itemList);
  }

  //Method
  createNewBookMarkDiv(name, address, index) {
    // This function creates the div and append's it to the div.
    const newElement = document.createElement("div");
    //add a title with the web address
    newElement.innerHTML = `<div class='myFlexItem'><h4 class="pill"><a href="${address}" >${name}</a></h4><div class='spanDiv'><span data-index="${index}" title='Move Left' class='moveUp'>&lArr;</span><span title='Delete' data-index="${index}" ><i
    title="Delete Bookmark"
    class="delete-item fas fa-trash-alt"
  ></i
></span><span title='Move Right' data-index="${index}" class='moveDown'>&rArr;</span></div>`;

    this.elements.bookmarkList.appendChild(newElement);
  }

  //Method
  colorSetOfTabs(htmlCollection) {
    for (const item of htmlCollection) {
      item.style.backgroundColor = this.tabColors[this.tabColorIndex];
      if (this.tabColorIndex === this.tabColors.length - 1) {
        this.tabColorIndex = 0;
      } else {
        this.tabColorIndex++;
      }
    }
  } // End colorSetOfTabs(htmlCollection)

  // Method
  showAlert(message, className, displayTime = 4000) {
    if (className === "success") {
      // remove error
      this.elements.messageDisplay.classList.remove("error");
      // add success
      this.elements.messageDisplay.classList.add("success");
      // remove red border
      this.elements.messageBorder.classList.remove("redBorder");
      // add green border
      this.elements.messageBorder.classList.add("greenBorder");
    } else {
      // remove success
      this.elements.messageDisplay.classList.remove("success");
      // add error
      this.elements.messageDisplay.classList.add("error");
      // remove green border
      this.elements.messageBorder.classList.remove("greenBorder");
      // add red border
      this.elements.messageBorder.classList.add("redBorder");
    }
    this.elements.messageDisplay.textContent = message;
    $("#myMessageModal").modal("hide");
    $("#myMessageModal").modal("show");
    setTimeout(() => {
      $("#myMessageModal").modal("hide");
    }, displayTime);
  } // End showAlert()
} // End class
