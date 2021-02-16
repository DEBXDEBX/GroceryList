class Elements {
  constructor() {
    // select the lists
    this.storeList = document.querySelector("#storeList");
    this.itemList = document.querySelector("#itemList");
    // select headings
    this.storeHeading = document.querySelector("#storeHeading");
    this.itemHeading = document.querySelector("#itemHeading");
    // select add show forms + / icon
    this.storeAddIcon = document.querySelector("#storeAddIcon");
    this.itemAddIcon = document.querySelector("#itemAddIcon");
    // select forms
    this.storeForm = document.querySelector("#storeForm");
    this.itemForm = document.querySelector("#itemForm");
    // select btns
    this.storeAddBtn = document.querySelector("#storeAddBtn");
    this.storeCancelBtn = document.querySelector("#storeCancelBtn");
    this.itemAddBtn = document.querySelector("#itemAddBtn");
    this.itemCancelBtn = document.querySelector("#itemCancelBtn");
    // select Inputs
    this.storeTextInput = document.querySelector("#storeTextInput");
    this.itemTextInput = document.querySelector("#itemTextInput");
    // select message display
    this.messageDisplay = document.querySelector("#displayMessage");
    // select message border
    this.messageBorder = document.querySelector("#modalBorder");
  }
}
