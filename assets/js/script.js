"use strict";
//Global variable's
let arrayOfStores;
let storeIndex = -243;
let itemIndex = -243;
const GROCERY_LIST_STORAGE_KEY = "fileGrocery02162021DEBX";
// create elements object
const el = new Elements();
// Pass elements to display
const display = new Display(el, $);
// create storage
const groceryListStorage = new ArrayStorageLS(GROCERY_LIST_STORAGE_KEY);
//Select audio files
const addItemAudio = document.querySelector("#addItemAudio");
const addStoreAudio = document.querySelector("#addStoreAudio");
const btnAudio = document.querySelector("#btnAudio");
const cancelAudio = document.querySelector("#cancelAudio");
const clickAudio = document.querySelector("#clickAudio");
const deleteAudio = document.querySelector("#deleteAudio");
const tabAudio = document.querySelector("#tabAudio");
const warning1Audio = document.querySelector("#warning1Audio");
const warning2Audio = document.querySelector("#warning2Audio");
//The start of program exicution.
window.onload = function () {
  groceryListStartUp();
};
function groceryListStartUp() {
  arrayOfStores = groceryListStorage.getArrayFromLS();
  if (arrayOfStores.length === 0) {
    const Sams = new Store("Sam's");
    const Walmart = new Store("Walmart");
    const Aldis = new Store("Aldi's");
    arrayOfStores.push(Aldis, Sams, Walmart);
  }

  renderStores();
}
function renderStores() {
  display.paintStores(mapNamesOut(arrayOfStores));
}
function renderItems() {
  display.paintItems(arrayOfStores[storeIndex].arrayOfItems);
}
function saveGorceryList() {
  groceryListStorage.saveArrayToLS(arrayOfStores);
}
// create a new array with only the items name
function mapNamesOut(array) {
  let mapedArray = array.map((item) => {
    return item.name;
  });
  return mapedArray;
} // End mapNamesOut(array)

// Sort an array by it's name
function sortArrayByName(array) {
  array.sort(function (a, b) {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }); //End sort function
} // End sortArrayByName(array)

el.storeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteStore")) {
    // get the index from the html

    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    // storeIndex = index;
    storeIndex = index;
    arrayOfStores.splice(storeIndex, 1);
    deleteAudio.play();
    display.showAlert("A store was deleted", "success", 1500);
    // save
    saveGorceryList();
    if (arrayOfStores.length === 0) {
      groceryListStartUp();
      return;
    }

    renderStores();
    return;
  }

  // event delegation
  if (e.target.classList.contains("store")) {
    const element = document.querySelector(".store.active");
    if (element) {
      element.classList.remove("active");
    }
    // add active class
    e.target.classList.add("active");

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    storeIndex = index;
    tabAudio.play();
    renderItems();
  }
});

el.storeAddIcon.addEventListener("click", (e) => {
  clickAudio.play();
  display.showStoreForm();
  display.displayNone(el.itemList);
  el.storeTextInput.focus();
});

el.storeAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // grab the text
  let storeName = el.storeTextInput.value.trim();
  // check if text is empty
  if (!storeName) {
    warning1Audio.play();
    display.showAlert("Please enter a name for the Store!", "error");
    return;
  }
  // create a store
  let newStore = new Store(storeName);

  // check if the name already exists if it does alert and return and set current main folder to -243
  // make a variable to return
  let isTaken = false;
  arrayOfStores.forEach((element) => {
    if (storeName === element.name) {
      isTaken = true;
    }
  });
  // check for taken name
  if (isTaken) {
    warning2Audio.play();
    display.showAlert("That name is taken", "error");
    storeIndex = -243;
  } else {
    // push newStore into the array
    arrayOfStores.push(newStore);
    addStoreAudio.play();
    // sort array by name
    sortArrayByName(arrayOfStores);
    // save
    saveGorceryList();
    display.showAlert("A new category was added", "success", 1500);
    // hide form
    display.hideStoreForm();
    // reset form
    el.storeForm.reset();
    // send array to display
    renderStores();
  } // End else statement
});

el.storeCancelBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  // reset form
  el.storeForm.reset();
  // hide form
  display.displayNone(el.storeForm);
  // get rid of active class
  let activeTabList = document.getElementsByClassName("store active");
  if (activeTabList) {
    let newArray = Array.from(activeTabList);
    for (let item of newArray) {
      item.classList.remove("active");
    }
  }
});

el.itemList.addEventListener("click", (e) => {
  console.log("clicked item list");
});

el.itemAddIcon.addEventListener("click", (e) => {
  clickAudio.play();
  display.showItemForm();
  el.itemTextInput.focus();
});

el.itemAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let itemText = el.itemTextInput.value.trim();
  if (!itemText) {
    warning1Audio.play();
    display.showAlert("Please enter a name for the item", "error");
    return;
  }

  let newItem = new Item(itemText);
  arrayOfStores[storeIndex].arrayOfItems.push(newItem);
  addItemAudio.play();

  // save
  saveGorceryList();
  el.itemForm.reset();
  display.displayNone(el.itemForm);
  display.showAlert("A new item was added", "success", 1500);
  renderItems();
});

el.itemCancelBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  el.itemForm.reset();
  // hide form
  display.displayNone(el.itemForm);
});
