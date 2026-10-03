// select elements from the DOM
console.log("bom.js is loaded");
const inputElement = document.querySelector("#favchap");
const buttonElement = document.querySelector("button");
const listElement = document.querySelector("#list");

// load saved chapters from localStorage, or start with an empty array
let chaptersArray = getChapterList() || [];

// display every saved chapter when the page loads
chaptersArray.forEach(function (chapter) {
  displayList(chapter);
});

// wait for button clicks
buttonElement.addEventListener("click", function () {
  // Check if the user entered something
  if (inputElement.value.trim() != "") {
    const chapter = inputElement.value.trim();
    displayList(chapter);            // show it on the page
    chaptersArray.push(chapter);     // add it to the array
    setChapterList();                // save the array to localStorage
    inputElement.value = "";         // clear the user input field
  }
  // focus the user back to the input field
  inputElement.focus();
});

// builds one list item with a delete button and adds it to the list
function displayList(item) {
  const li = document.createElement("li");
  li.textContent = item;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", function () {
    listElement.removeChild(li);
    deleteChapter(item);
    inputElement.focus();
  });

  li.appendChild(deleteBtn);
  listElement.appendChild(li);
}

// save the array to localStorage as a JSON string
function setChapterList() {
  localStorage.setItem("myFavBOMList", JSON.stringify(chaptersArray));
}

// read the JSON string from localStorage and turn it back into an array
function getChapterList() {
  return JSON.parse(localStorage.getItem("myFavBOMList"));
}

// remove one chapter from the array and update localStorage
function deleteChapter(chapter) {
  chaptersArray = chaptersArray.filter(function (item) {
    return item !== chapter;
  });
  setChapterList();
}